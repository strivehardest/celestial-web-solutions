export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, phone, subject, message, turnstileToken } = req.body;

  // Validate required fields
  if (!name || !email || !subject || !message) {
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
    // Forward to Formspree
    const formspreeResponse = await fetch('https://formspree.io/f/mdklokaq', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        _subject: `Contact Form — ${subject} from ${name}`,
        _replyto: email,
        name,
        email,
        phone: phone || 'Not provided',
        subject,
        message,
        _source: 'Contact Page',
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
    console.error('Contact form error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
