import { sendContactEmails } from '../../lib/sendFormEmails';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, phone, subject, timeframe, message, turnstileToken } = req.body || {};

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

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
    await sendContactEmails({
      name,
      email,
      phone,
      subject,
      timeframe,
      message,
    });

    return res.status(200).json({
      success: true,
      message: 'Message sent successfully. A confirmation email has been sent to you.',
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return res.status(500).json({ error: 'Failed to send message' });
  }
}
