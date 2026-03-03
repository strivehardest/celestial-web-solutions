export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { firstName, lastName, email, phone, company, service, budget, message, turnstileToken } = req.body;

  // Validate required fields
  if (!firstName || !lastName || !email || !phone || !company || !service) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Verify Cloudflare Turnstile token
  const TURNSTILE_SECRET_KEY = process.env.TURNSTILE_SECRET_KEY;

  if (!TURNSTILE_SECRET_KEY) {
    console.error('TURNSTILE_SECRET_KEY is not set in environment variables');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  try {
    const turnstileResponse = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        secret: TURNSTILE_SECRET_KEY,
        response: turnstileToken,
      }),
    });

    const turnstileResult = await turnstileResponse.json();
    if (!turnstileResult.success) {
      return res.status(403).json({ error: 'CAPTCHA verification failed. Please try again.' });
    }
  } catch (error) {
    console.error('Turnstile verification error:', error);
    return res.status(500).json({ error: 'CAPTCHA verification failed' });
  }

  try {
    // Send via Formspree (same endpoint pattern as contact form)
    // This sends to info@celestialwebsolutions.net
    const formspreeResponse = await fetch('https://formspree.io/f/mdklokaq', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        _subject: `Talk to an Expert — ${firstName} ${lastName} from ${company}`,
        _replyto: email,
        name: `${firstName} ${lastName}`,
        email,
        phone: phone || 'Not provided',
        company,
        service,
        budget: budget || 'Not specified',
        message: message || 'No additional message',
        _source: 'Talk to an Expert Modal',
      }),
    });

    if (formspreeResponse.ok) {
      return res.status(200).json({ success: true, message: 'Message sent successfully' });
    } else {
      const errorData = await formspreeResponse.json().catch(() => ({}));
      console.error('Formspree error:', errorData);
      return res.status(500).json({ error: 'Failed to send message' });
    }
  } catch (error) {
    console.error('Talk to expert form error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
