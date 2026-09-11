/**
 * Dual-delivery email helper for Celestial form submissions.
 *
 * Always notifies the company inbox (Formspree + optional Resend).
 * Always sends a confirmation email to the submitter (Formspree autoresponse
 * and/or Resend when RESEND_API_KEY is configured).
 */

const COMPANY_INBOX = process.env.COMPANY_INBOX_EMAIL || 'info@celestialwebsolutions.net';
const FORMSPREE_ENDPOINT =
  process.env.FORMSPREE_ENDPOINT || 'https://formspree.io/f/mdklokaq';
const RESEND_API_KEY = process.env.RESEND_API_KEY || '';
const RESEND_FROM =
  process.env.RESEND_FROM_EMAIL || 'Celestial Web Solutions <onboarding@resend.dev>';

function escapeHtml(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function rowsHtml(fields) {
  return Object.entries(fields)
    .filter(([, v]) => v != null && String(v).trim() !== '')
    .map(
      ([label, value]) =>
        `<tr>
          <td style="padding:8px 12px;border-bottom:1px solid #e7e5e4;color:#78716c;font-size:13px;width:34%;vertical-align:top;">${escapeHtml(label)}</td>
          <td style="padding:8px 12px;border-bottom:1px solid #e7e5e4;color:#1c1917;font-size:13px;">${escapeHtml(value)}</td>
        </tr>`
    )
    .join('');
}

function brandedEmail({ title, intro, fields, footerNote }) {
  return `<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#f5f5f4;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f4;padding:24px 12px;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e7e5e4;">
          <tr>
            <td style="background:#ea580c;padding:18px 24px;">
              <div style="color:#ffffff;font-size:18px;font-weight:700;">Celestial Web Solutions</div>
              <div style="color:#ffedd5;font-size:12px;margin-top:4px;">${escapeHtml(title)}</div>
            </td>
          </tr>
          <tr>
            <td style="padding:24px;">
              <p style="margin:0 0 16px;color:#1c1917;font-size:14px;line-height:1.55;">${escapeHtml(intro)}</p>
              <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e7e5e4;border-radius:8px;overflow:hidden;">
                ${rowsHtml(fields)}
              </table>
              <p style="margin:18px 0 0;color:#78716c;font-size:12px;line-height:1.5;">${escapeHtml(footerNote)}</p>
            </td>
          </tr>
          <tr>
            <td style="background:#fff7ed;padding:14px 24px;border-top:1px solid #e7e5e4;">
              <div style="color:#9a3412;font-size:12px;">
                info@celestialwebsolutions.net · +233 24 567 1832 · WhatsApp +233 53 050 5031
              </div>
              <div style="color:#a8a29e;font-size:11px;margin-top:4px;">www.celestialwebsolutions.net</div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function plainFromFields(fields) {
  return Object.entries(fields)
    .filter(([, v]) => v != null && String(v).trim() !== '')
    .map(([k, v]) => `${k}: ${v}`)
    .join('\n');
}

async function sendViaResend({ to, subject, html, replyTo, text }) {
  if (!RESEND_API_KEY) return { skipped: true, reason: 'no_resend_key' };

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: RESEND_FROM,
      to: Array.isArray(to) ? to : [to],
      subject,
      html,
      text,
      reply_to: replyTo || undefined,
    }),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => '');
    throw new Error(`Resend failed (${response.status}): ${detail.slice(0, 300)}`);
  }

  return { ok: true, provider: 'resend' };
}

async function sendViaFormspree(payload) {
  const response = await fetch(FORMSPREE_ENDPOINT, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const detail = await response.json().catch(() => ({}));
    throw new Error(`Formspree failed: ${JSON.stringify(detail).slice(0, 300)}`);
  }

  return { ok: true, provider: 'formspree' };
}

/**
 * Contact form emails: notify company + confirm to visitor.
 */
async function sendContactEmails({ name, email, phone, subject, timeframe, message }) {
  const fields = {
    Name: name,
    Email: email,
    Phone: phone || 'Not provided',
    Subject: subject,
    Timeframe: timeframe || 'To be confirmed',
    Message: message,
  };

  const companySubject = `Contact Form — ${subject} from ${name}`;
  const userSubject = 'We received your message — Celestial Web Solutions';

  const companyHtml = brandedEmail({
    title: 'New contact form message',
    intro: 'A visitor submitted the contact form on celestialwebsolutions.net.',
    fields,
    footerNote: 'Reply directly to the visitor using their email address above.',
  });

  const userHtml = brandedEmail({
    title: 'Message received',
    intro: `Hi ${name}, thanks for contacting Celestial Web Solutions. We have received your message and will get back to you within 24 hours.`,
    fields: {
      Subject: subject,
      Timeframe: timeframe || 'To be confirmed',
      Message: message,
    },
    footerNote:
      'If you did not send this message, you can ignore this email. For urgent help, WhatsApp +233 53 050 5031.',
  });

  const autoresponseText = [
    `Hi ${name},`,
    '',
    'Thanks for contacting Celestial Web Solutions. We received your message and will reply within 24 hours.',
    '',
    `Subject: ${subject}`,
    `Timeframe: ${timeframe || 'To be confirmed'}`,
    '',
    '— Celestial Web Solutions',
    'info@celestialwebsolutions.net | +233 24 567 1832',
    'www.celestialwebsolutions.net',
  ].join('\n');

  // 1) Company notification (Formspree primary)
  await sendViaFormspree({
    _subject: companySubject,
    _replyto: email,
    _cc: COMPANY_INBOX,
    email,
    name,
    phone: phone || 'Not provided',
    subject,
    timeframe: timeframe || 'To be confirmed',
    message,
    _source: 'Contact Page',
    _autoresponse: autoresponseText,
  });

  // 2) Explicit dual delivery via Resend when configured
  const results = [];
  try {
    results.push(
      await sendViaResend({
        to: COMPANY_INBOX,
        subject: companySubject,
        html: companyHtml,
        replyTo: email,
        text: plainFromFields(fields),
      })
    );
  } catch (err) {
    console.error('Company Resend notify failed:', err.message);
  }

  try {
    results.push(
      await sendViaResend({
        to: email,
        subject: userSubject,
        html: userHtml,
        replyTo: COMPANY_INBOX,
        text: autoresponseText,
      })
    );
  } catch (err) {
    console.error('User Resend confirmation failed:', err.message);
  }

  return { ok: true, results };
}

/**
 * Request a Service emails: notify company + confirm to visitor.
 */
async function sendServiceRequestEmails({
  firstName,
  lastName,
  email,
  phone,
  company,
  businessCategory,
  service,
  budget,
  timeframe,
  message,
}) {
  const fullName = `${firstName} ${lastName}`.trim();
  const fields = {
    Name: fullName,
    Email: email,
    Phone: phone || 'Not provided',
    Company: company,
    'Business category': businessCategory || 'Not specified',
    Service: service,
    Budget: budget || 'Not specified',
    Timeframe: timeframe || 'To be confirmed',
    Message: message || 'No additional message',
  };

  const companySubject = `Request a Service — ${fullName} (${company}) · ${service}`;
  const userSubject = 'We received your service request — Celestial Web Solutions';

  const companyHtml = brandedEmail({
    title: 'New service request',
    intro: 'Someone submitted a Request a Service form on celestialwebsolutions.net.',
    fields,
    footerNote: 'Reply to the client using their email. After review, share the project agreement if appropriate.',
  });

  const userHtml = brandedEmail({
    title: 'Service request received',
    intro: `Hi ${firstName}, thanks for requesting a service from Celestial Web Solutions. We have received your details and will follow up within 24 hours. You can also download your project agreement from the success screen on our site.`,
    fields: {
      Service: service,
      Company: company,
      Budget: budget || 'Not specified',
      Timeframe: timeframe || 'To be confirmed',
      Message: message || 'No additional message',
    },
    footerNote:
      'Payment for most projects is required in full before work begins. WhatsApp +233 53 050 5031 for urgent questions.',
  });

  const autoresponseText = [
    `Hi ${firstName},`,
    '',
    'Thanks for your service request with Celestial Web Solutions. We received your details and will follow up within 24 hours.',
    '',
    `Service: ${service}`,
    `Company: ${company}`,
    `Budget: ${budget || 'Not specified'}`,
    `Timeframe: ${timeframe || 'To be confirmed'}`,
    '',
    'You can download your Celestial project agreement PDF from the success screen after submitting the Request a Service form.',
    '',
    '— Celestial Web Solutions',
    'info@celestialwebsolutions.net | +233 24 567 1832',
    'www.celestialwebsolutions.net',
  ].join('\n');

  await sendViaFormspree({
    _subject: companySubject,
    _replyto: email,
    _cc: COMPANY_INBOX,
    email,
    name: fullName,
    phone: phone || 'Not provided',
    company,
    businessCategory: businessCategory || 'Not specified',
    service,
    budget: budget || 'Not specified',
    timeframe: timeframe || 'To be confirmed',
    message: message || 'No additional message',
    _source: 'Request a Service',
    _autoresponse: autoresponseText,
  });

  const results = [];
  try {
    results.push(
      await sendViaResend({
        to: COMPANY_INBOX,
        subject: companySubject,
        html: companyHtml,
        replyTo: email,
        text: plainFromFields(fields),
      })
    );
  } catch (err) {
    console.error('Company Resend notify failed:', err.message);
  }

  try {
    results.push(
      await sendViaResend({
        to: email,
        subject: userSubject,
        html: userHtml,
        replyTo: COMPANY_INBOX,
        text: autoresponseText,
      })
    );
  } catch (err) {
    console.error('User Resend confirmation failed:', err.message);
  }

  return { ok: true, results };
}

module.exports = {
  COMPANY_INBOX,
  sendContactEmails,
  sendServiceRequestEmails,
};
