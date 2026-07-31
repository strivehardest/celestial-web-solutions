export const LOCALES = [
  { code: 'en', label: 'English', short: 'EN', flagCode: 'gb' },
  { code: 'fr', label: 'Français', short: 'FR', flagCode: 'fr' },
  { code: 'es', label: 'Español', short: 'ES', flagCode: 'es' },
  { code: 'ee', label: 'Ewe', short: 'EWE', flagCode: 'gh' },
  { code: 'ak', label: 'Twi', short: 'TWI', flagCode: 'gh' },
  { code: 'gaa', label: 'Ga', short: 'GA', flagCode: 'gh' },
];

export const DEFAULT_LOCALE = 'en';
export const STORAGE_KEY = 'cws-locale';

function hostnameParts() {
  if (typeof window === 'undefined') return { host: '', isLocal: true };
  const host = window.location.hostname;
  const isLocal = host === 'localhost' || host === '127.0.0.1' || /^\d+\.\d+\.\d+\.\d+$/.test(host);
  return { host, isLocal };
}

function writeCookie(name, value, { expire } = {}) {
  const { host, isLocal } = hostnameParts();
  const base = `${name}=${value}; path=/`;
  const expiry = expire ? `; expires=${expire}` : '; max-age=31536000';
  document.cookie = `${base}${expiry}`;
  if (!isLocal && host) {
    document.cookie = `${base}${expiry}; domain=.${host}`;
  }
}

function clearCookie(name) {
  writeCookie(name, '', { expire: 'Thu, 01 Jan 1970 00:00:00 UTC' });
}

export function readGoogleTranslateLocale() {
  if (typeof document === 'undefined') return DEFAULT_LOCALE;

  const cookies = document.cookie.split(';').map((part) => part.trim());
  for (const cookie of cookies) {
    if (!cookie.startsWith('googtrans=')) continue;
    const value = cookie.slice('googtrans='.length);
    const match = value.match(/^\/en\/([a-z]{2,3})$/i);
    if (match && LOCALES.some((item) => item.code === match[1])) {
      return match[1];
    }
    if (value === '/en/en' || value === '' || value === 'null') {
      return DEFAULT_LOCALE;
    }
  }

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored && LOCALES.some((item) => item.code === stored)) return stored;
  } catch {
    // ignore
  }

  return DEFAULT_LOCALE;
}

export function persistLocalePreference(lang) {
  try {
    window.localStorage.setItem(STORAGE_KEY, lang || DEFAULT_LOCALE);
  } catch {
    // ignore
  }
}

export function setGoogleTranslateCookie(lang) {
  if (typeof document === 'undefined') return;

  clearCookie('googtrans');

  if (lang && lang !== 'en') {
    writeCookie('googtrans', `/en/${lang}`);
  }

  persistLocalePreference(lang || DEFAULT_LOCALE);
}

export function applyGoogleTranslateLocale(lang) {
  setGoogleTranslateCookie(lang);
  window.location.reload();
}

export function getTranslateCombo() {
  return document.querySelector('.goog-te-combo');
}

export function triggerGoogleTranslateCombo(lang) {
  const select = getTranslateCombo();
  if (!select) return false;

  const value = lang === 'en' ? 'en' : lang;

  // Force re-evaluation so newly mounted Next.js content is translated
  if (select.value === value) {
    select.value = 'en';
    select.dispatchEvent(new Event('change'));
  }

  select.value = value;
  select.dispatchEvent(new Event('change'));
  return true;
}

export function ensurePageTranslated(lang = readGoogleTranslateLocale()) {
  if (typeof document === 'undefined') return;
  if (!lang || lang === 'en') return;

  document.documentElement.lang = lang;
  setGoogleTranslateCookie(lang);

  let attempts = 0;
  const maxAttempts = 20;

  const tryApply = () => {
    attempts += 1;
    if (triggerGoogleTranslateCombo(lang)) return;
    if (attempts < maxAttempts) {
      window.setTimeout(tryApply, 250);
    }
  };

  tryApply();
}
