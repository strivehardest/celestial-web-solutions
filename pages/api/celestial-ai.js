import { buildSystemPrompt, LANGUAGE_NAMES } from '../../lib/celestialAI/knowledge';
import { answerLocally } from '../../lib/celestialAI/localAnswer';
import { resolveProviders } from '../../lib/celestialAI/provider';

const MAX_MESSAGE_CHARS = 1500;
const MAX_HISTORY = 12;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const RATE_LIMIT_MAX = 60;
const ATTEMPT_TIMEOUT_MS = 12000;
const TOTAL_BUDGET_MS = 26000;

// Vercel Pages API routes default to 10s; allow time for one retry.
export const config = { maxDuration: 30 };

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

function withLanguageReminder(messages, language) {
  if (!language || language === 'en' || !messages.length) return messages;
  const langName = LANGUAGE_NAMES[language] || language;
  const reminder = `\n\n[Important: reply to this message entirely in ${langName}. Do not answer in English.]`;
  return messages.map((m, index) =>
    index === messages.length - 1 && m.role === 'user'
      ? { ...m, content: `${m.content}${reminder}` }
      : m
  );
}

async function askOpenAICompatible(provider, model, messages, language, signal) {
  const response = await fetch(provider.url, {
    method: 'POST',
    signal,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${provider.key}`,
      ...(provider.extraHeaders || {}),
    },
    body: JSON.stringify({
      model,
      temperature: 0.4,
        max_tokens: 1200,
      messages: [{ role: 'system', content: buildSystemPrompt(language) }, ...messages],
    }),
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => '');
    const error = new Error(`${provider.name}/${model} responded ${response.status}: ${errorText.slice(0, 300)}`);
    error.status = response.status;
    throw error;
  }

  const data = await response.json();
  const content = data?.choices?.[0]?.message?.content;
  if (!content || typeof content !== 'string') {
    throw new Error(`${provider.name}/${model} returned an empty completion`);
  }
  return content.trim();
}

// Native Gemini generateContent. Required for AQ. auth keys from Google AI Studio;
// the OpenAI-compatible Bearer route rejects those keys.
async function askGeminiNative(provider, model, messages, language, signal) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`;
  const contents = messages.map((m) => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }],
  }));

  const response = await fetch(url, {
    method: 'POST',
    signal,
    headers: {
      'Content-Type': 'application/json',
      'x-goog-api-key': provider.key,
    },
    body: JSON.stringify({
      system_instruction: { parts: [{ text: buildSystemPrompt(language) }] },
      contents,
      generationConfig: {
        temperature: 0.4,
        maxOutputTokens: 1200,
      },
    }),
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => '');
    const error = new Error(`${provider.name}/${model} responded ${response.status}: ${errorText.slice(0, 300)}`);
    error.status = response.status;
    throw error;
  }

  const data = await response.json();
  const content = data?.candidates?.[0]?.content?.parts?.map((p) => p.text).filter(Boolean).join('') || '';
  if (!content.trim()) {
    throw new Error(`${provider.name}/${model} returned an empty completion`);
  }
  return content.trim();
}

async function askModel(provider, model, messages, language) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ATTEMPT_TIMEOUT_MS);
  try {
    if (provider.transport === 'gemini') {
      return await askGeminiNative(provider, model, messages, language, controller.signal);
    }
    return await askOpenAICompatible(provider, model, messages, language, controller.signal);
  } finally {
    clearTimeout(timer);
  }
}

// Walk every configured provider and its candidate models until one answers.
// A rejected key means every model on that provider will fail, so skip the rest of it.
async function askProviders(providers, messages, language) {
  const startedAt = Date.now();
  const prepared = withLanguageReminder(messages, language);
  for (const provider of providers) {
    for (const model of provider.models) {
      if (Date.now() - startedAt > TOTAL_BUDGET_MS) return null;
      try {
        const reply = await askModel(provider, model, prepared, language);
        return { reply, provider: provider.name, model };
      } catch (error) {
        console.error('[celestial-ai] attempt failed:', error.message);
        const badKey =
          error.status === 401 ||
          error.status === 403 ||
          /api[_ ]?key|invalid authentication|ACCESS_TOKEN_TYPE_UNSUPPORTED|unauthenticated/i.test(
            error.message
          );
        if (badKey) break;
      }
    }
  }
  return null;
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

  const providers = resolveProviders();

  if (providers.length) {
    const result = await askProviders(providers, messages, language);
    if (result) {
      return res.status(200).json({ reply: result.reply, source: 'ai', model: `${result.provider}/${result.model}` });
    }
    console.error('[celestial-ai] all providers failed, answering from knowledge base');
  }

  const reply = answerLocally(lastUser.content, { language });
  return res.status(200).json({ reply, source: 'knowledge' });
}
