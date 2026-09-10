// Server-only: reads environment variables to pick an OpenAI-compatible chat
// completions provider. Returns null when no key is configured, in which case
// the API answers from the built-in knowledge base instead.
export function resolveProvider() {
  const model = process.env.CELESTIAL_AI_MODEL;

  if (process.env.OPENAI_API_KEY) {
    return {
      name: 'openai',
      url: process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1/chat/completions',
      key: process.env.OPENAI_API_KEY,
      model: model || 'gpt-4o-mini',
    };
  }
  if (process.env.GROQ_API_KEY) {
    return {
      name: 'groq',
      url: 'https://api.groq.com/openai/v1/chat/completions',
      key: process.env.GROQ_API_KEY,
      model: model || 'llama-3.3-70b-versatile',
    };
  }
  if (process.env.GEMINI_API_KEY) {
    return {
      name: 'gemini',
      url: 'https://generativelanguage.googleapis.com/v1beta/openai/chat/completions',
      key: process.env.GEMINI_API_KEY,
      model: model || 'gemini-2.0-flash',
    };
  }
  if (process.env.OPENROUTER_API_KEY) {
    return {
      name: 'openrouter',
      url: 'https://openrouter.ai/api/v1/chat/completions',
      key: process.env.OPENROUTER_API_KEY,
      model: model || 'openai/gpt-4o-mini',
      extraHeaders: {
        'HTTP-Referer': process.env.NEXT_PUBLIC_APP_URL || 'https://www.celestialwebsolutions.net',
        'X-Title': 'Celestial AI',
      },
    };
  }
  return null;
}

export const hasLiveProvider = () => resolveProvider() !== null;
