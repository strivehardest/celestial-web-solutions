// Server-only: builds the ordered list of OpenAI-compatible chat completion
// providers that have a key configured. The API tries them in order (and each
// provider's models in order) and finally falls back to the built-in
// knowledge base, so a rate limit or a retired model never breaks the page.
//
// Model ids verified September 2026:
// - Groq retired llama-3.x on 2026-08-16; openai/gpt-oss-* are the replacements.
// - Google shut down gemini-2.0-flash on 2026-06-01; gemini-2.5-flash retires
//   2026-10-20; gemini-3.5-flash / gemini-3.1-flash-lite are current.
const PROVIDERS = [
  {
    name: 'groq',
    envKey: 'GROQ_API_KEY',
    envModel: 'GROQ_MODEL',
    url: 'https://api.groq.com/openai/v1/chat/completions',
    models: ['openai/gpt-oss-120b', 'openai/gpt-oss-20b', 'qwen/qwen3.6-27b'],
  },
  {
    name: 'gemini',
    envKey: 'GEMINI_API_KEY',
    envModel: 'GEMINI_MODEL',
    url: 'https://generativelanguage.googleapis.com/v1beta/openai/chat/completions',
    models: ['gemini-3.5-flash', 'gemini-3.1-flash-lite', 'gemini-3.5-flash-lite', 'gemini-2.5-flash'],
  },
  {
    name: 'openai',
    envKey: 'OPENAI_API_KEY',
    envModel: 'OPENAI_MODEL',
    url: process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1/chat/completions',
    models: ['gpt-4o-mini'],
  },
  {
    name: 'openrouter',
    envKey: 'OPENROUTER_API_KEY',
    envModel: 'OPENROUTER_MODEL',
    url: 'https://openrouter.ai/api/v1/chat/completions',
    models: ['openai/gpt-4o-mini'],
    extraHeaders: {
      'HTTP-Referer': process.env.NEXT_PUBLIC_APP_URL || 'https://www.celestialwebsolutions.net',
      'X-Title': 'Celestial AI',
    },
  },
];

export function resolveProviders() {
  return PROVIDERS.filter((p) => process.env[p.envKey]).map((p) => {
    const override = process.env[p.envModel] || process.env.CELESTIAL_AI_MODEL;
    const models = override ? [override, ...p.models.filter((m) => m !== override)] : p.models;
    return {
      name: p.name,
      url: p.url,
      key: process.env[p.envKey],
      models,
      extraHeaders: p.extraHeaders,
    };
  });
}

export const hasLiveProvider = () => resolveProviders().length > 0;
