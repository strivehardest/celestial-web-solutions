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

async function sendViaResend({ to, subject, html, replyTo, text, attachments }) {
  if (!RESEND_API_KEY) return { skipped: true, reason: 'no_resend_key' };

  const payload = {
    from: RESEND_FROM,
    to: Array.isArray(to) ? to : [to],
    subject,
    html,
    text,
    reply_to: replyTo || undefined,
  };

  if (attachments && attachments.length) {
    payload.attachments = attachments.map((file) => ({
      filename: file.filename,
      content: Buffer.isBuffer(file.content)
        ? file.content.toString('base64')
        : file.content,
    }));
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
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
  jobTitle,
  businessCategory,
  websiteUrl,
  city,
  service,
  projectGoals,
  targetAudience,
  keyFeatures,
  hasExistingBrand,
  contentReady,
  budget,
  timeframe,
  preferredContact,
  howDidYouHear,
  message,
  agreementId: providedAgreementId,
  createdAt: providedCreatedAt,
}) {
  const fullName = `${firstName} ${lastName}`.trim();
  // One agreement id for email PDF + success-screen download (same CWS code).
  const { createAgreementId } = require('./agreementHelpers');
  const agreementId = providedAgreementId || createAgreementId(fullName);
  const createdAt = providedCreatedAt || new Date().toISOString();
  const fields = {
    Name: fullName,
    Email: email,
    Phone: phone || 'Not provided',
    Company: company,
    Role: jobTitle || 'Not specified',
    'Business category': businessCategory || 'Not specified',
    Website: websiteUrl || 'None provided',
    City: city || 'Not specified',
    Service: service,
    'Agreement ID': agreementId,
    'Project goals': projectGoals || 'Not specified',
    'Target audience': targetAudience || 'Not specified',
    'Key features': keyFeatures || 'Not specified',
    Branding: hasExistingBrand || 'Not specified',
    Content: contentReady || 'Not specified',
    Budget: budget || 'Not specified',
    Timeframe: timeframe || 'To be confirmed',
    'Preferred contact': preferredContact || 'Email',
    'How they found us': howDidYouHear || 'Not specified',
    Message: message || 'No additional message',
  };

  const companySubject = `Request a Service — ${fullName} (${company}) · ${service}`;
  const userSubject = 'We received your service request — Celestial Web Solutions';

  const companyHtml = brandedEmail({
    title: 'New service request',
    intro: 'Someone submitted a Request a Service form on celestialwebsolutions.net. The project agreement PDF is attached to this email.',
    fields,
    footerNote: 'Reply to the client using their preferred contact method. The attached PDF matches the agreement available on the success screen.',
  });

  const userHtml = brandedEmail({
    title: 'Service request received',
    intro: `Hi ${firstName}, thanks for requesting a service from Celestial Web Solutions. We have received your project brief and will follow up within 24 hours. Your project agreement PDF is attached for your records.`,
    fields: {
      'Agreement ID': agreementId,
      Service: service,
      Company: company,
      Budget: budget || 'Not specified',
      Timeframe: timeframe || 'To be confirmed',
      'Project goals': projectGoals || 'Not specified',
      'Key features': keyFeatures || 'Not specified',
    },
    footerNote:
      'Payment for most projects is required in full before work begins. WhatsApp +233 53 050 5031 for urgent questions.',
  });

  const autoresponseText = [
    `Hi ${firstName},`,
    '',
    'Thanks for your service request with Celestial Web Solutions. We received your project brief and will follow up within 24 hours.',
    '',
    `Agreement ID: ${agreementId}`,
    `Service: ${service}`,
    `Company: ${company}`,
    `Budget: ${budget || 'Not specified'}`,
    `Timeframe: ${timeframe || 'To be confirmed'}`,
    `Preferred contact: ${preferredContact || 'Email'}`,
    '',
    'Your Celestial project agreement PDF is attached to this email (and available on the success screen). The download uses the same Agreement ID.',
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
    jobTitle: jobTitle || 'Not specified',
    businessCategory: businessCategory || 'Not specified',
    websiteUrl: websiteUrl || 'None provided',
    city: city || 'Not specified',
    service,
    projectGoals: projectGoals || 'Not specified',
    targetAudience: targetAudience || 'Not specified',
    keyFeatures: keyFeatures || 'Not specified',
    hasExistingBrand: hasExistingBrand || 'Not specified',
    contentReady: contentReady || 'Not specified',
    budget: budget || 'Not specified',
    timeframe: timeframe || 'To be confirmed',
    preferredContact: preferredContact || 'Email',
    howDidYouHear: howDidYouHear || 'Not specified',
    message: message || 'No additional message',
    _source: 'Request a Service',
    _autoresponse: autoresponseText,
  });

  // Generate the project agreement PDF once with a stable CWS id (same as success-screen download).
  let pdfAttachment = null;
  try {
    const { generateClientAgreementPdf } = require('./generateClientAgreementPdf');
    const pdfResult = await generateClientAgreementPdf({
      firstName,
      lastName,
      email,
      phone,
      company,
      businessCategory,
      service,
      budget,
      timeframe,
      projectGoals,
      keyFeatures,
      message: [projectGoals, keyFeatures, message].filter(Boolean).join('\n\n'),
      agreementId,
      createdAt,
      source: 'request-a-service-email',
    });
    pdfAttachment = {
      filename: pdfResult.filename || 'Celestial-Project-Agreement.pdf',
      content: pdfResult.buffer,
    };
  } catch (err) {
    console.error('Agreement PDF attachment generation failed:', err.message);
  }

  const attachments = pdfAttachment ? [pdfAttachment] : undefined;

  const results = [];
  try {
    results.push(
      await sendViaResend({
        to: COMPANY_INBOX,
        subject: companySubject,
        html: companyHtml,
        replyTo: email,
        text: plainFromFields(fields),
        attachments,
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
        attachments,
      })
    );
  } catch (err) {
    console.error('User Resend confirmation failed:', err.message);
  }

  return {
    ok: true,
    results,
    pdfAttached: Boolean(pdfAttachment),
    agreementId,
    createdAt,
  };
}

module.exports = {
  COMPANY_INBOX,
  sendContactEmails,
  sendServiceRequestEmails,
};
