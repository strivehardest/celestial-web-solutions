import { buildSystemPrompt, LANGUAGE_NAMES } from '../../lib/celestialAI/knowledge';
import { answerLocally } from '../../lib/celestialAI/localAnswer';
import { resolveProvider } from '../../lib/celestialAI/provider';

const MAX_MESSAGE_CHARS = 1500;
const MAX_HISTORY = 12;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const RATE_LIMIT_MAX = 60;

// Best-effort per-instance limiter; serverless instances don't share memory,
// so this only softens abuse rather than enforcing a hard global quota.
const hits = new Map();

function rateLimited(ip) {
  const now = Date.now();
  const entry = hits.get(ip) || { count: 0, start: now };
  if (now - entry.start > RATE_LIMIT_WINDOW_MS) {
    entry.count = 0;
    entry.start = now;
  }
  entry.count += 1;
  hits.set(ip, entry);
  if (hits.size > 5000) {
    for (const [key, value] of hits) {
      if (now - value.start > RATE_LIMIT_WINDOW_MS) hits.delete(key);
    }
  }
  return entry.count > RATE_LIMIT_MAX;
}

function sanitizeMessages(input) {
  if (!Array.isArray(input)) return [];
  return input
    .filter((m) => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
    .map((m) => ({ role: m.role, content: m.content.trim().slice(0, MAX_MESSAGE_CHARS) }))
    .filter((m) => m.content.length > 0)
    .slice(-MAX_HISTORY);
}

async function askProvider(provider, messages, language) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 25000);
  try {
    const response = await fetch(provider.url, {
      method: 'POST',
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${provider.key}`,
        ...(provider.extraHeaders || {}),
      },
      body: JSON.stringify({
        model: provider.model,
        temperature: 0.4,
        max_tokens: 700,
        messages: [{ role: 'system', content: buildSystemPrompt(language) }, ...messages],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => '');
      throw new Error(`${provider.name} responded ${response.status}: ${errorText.slice(0, 300)}`);
    }

    const data = await response.json();
    const content = data?.choices?.[0]?.message?.content;
    if (!content || typeof content !== 'string') {
      throw new Error(`${provider.name} returned an empty completion`);
    }
    return content.trim();
  } finally {
    clearTimeout(timer);
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const ip =
    (req.headers['x-forwarded-for'] || '').toString().split(',')[0].trim() ||
    req.socket?.remoteAddress ||
    'unknown';

  if (rateLimited(ip)) {
    return res.status(429).json({
      error: 'You have sent a lot of questions in a short time. Please wait a little while or message us on WhatsApp at +233 53 050 5031.',
    });
  }

  const language = LANGUAGE_NAMES[req.body?.language] ? req.body.language : 'en';
  const messages = sanitizeMessages(req.body?.messages);
  const lastUser = [...messages].reverse().find((m) => m.role === 'user');

  if (!lastUser) {
    return res.status(400).json({ error: 'Please include a question.' });
  }

  const provider = resolveProvider();

  if (provider) {
    try {
      const reply = await askProvider(provider, messages, language);
      return res.status(200).json({ reply, source: 'ai', model: provider.model });
    } catch (error) {
      console.error('[celestial-ai] provider error, falling back to knowledge base:', error.message);
    }
  }

  const reply = answerLocally(lastUser.content, { language });
  return res.status(200).json({ reply, source: 'knowledge' });
}
