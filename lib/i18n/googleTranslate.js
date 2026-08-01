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

function cookieDomains() {
  if (typeof window === 'undefined') return [''];
  const host = window.location.hostname;
  const domains = ['']; // host-only
  if (host && host !== 'localhost' && !/^\d+\.\d+\.\d+\.\d+$/.test(host)) {
    domains.push(`.${host}`);
    const parts = host.split('.');
    if (parts.length > 2) {
      domains.push(`.${parts.slice(-2).join('.')}`);
    }
  }
  return domains;
}

function writeCookie(name, value, { expire } = {}) {
  const expiry = expire ? `expires=${expire}` : 'max-age=31536000';
  cookieDomains().forEach((domain) => {
    const domainPart = domain ? `; domain=${domain}` : '';
    document.cookie = `${name}=${value}; path=/; ${expiry}${domainPart}; SameSite=Lax`;
  });
}

function clearCookie(name) {
  writeCookie(name, '', { expire: 'Thu, 01 Jan 1970 00:00:00 GMT' });
}

export function readGoogleTranslateLocale() {
  if (typeof document === 'undefined') return DEFAULT_LOCALE;

  const cookies = document.cookie.split(';').map((part) => part.trim());
  for (const cookie of cookies) {
    if (!cookie.startsWith('googtrans=')) continue;
    const value = decodeURIComponent(cookie.slice('googtrans='.length));
    const match = value.match(/\/en\/([a-z]{2,3})$/i);
    if (match && LOCALES.some((item) => item.code === match[1].toLowerCase())) {
      return match[1].toLowerCase();
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
  clearCookie('googtrans'); // second pass after domain variants

  if (lang && lang !== DEFAULT_LOCALE) {
    writeCookie('googtrans', `/en/${lang}`);
  }

  persistLocalePreference(lang || DEFAULT_LOCALE);
}

function fireComboChange(select) {
  // Google Translate listens to native change; bubble + legacy Event both help
  try {
    select.dispatchEvent(new Event('change', { bubbles: true }));
  } catch {
    const evt = document.createEvent('HTMLEvents');
    evt.initEvent('change', true, true);
    select.dispatchEvent(evt);
  }
  if (typeof select.onchange === 'function') {
    select.onchange();
  }
}

export function getTranslateCombo() {
  return (
    document.querySelector('#google_translate_element select.goog-te-combo') ||
    document.querySelector('.goog-te-combo')
  );
}

export function triggerGoogleTranslateCombo(lang) {
  const select = getTranslateCombo();
  if (!select) return false;

  const target = !lang || lang === DEFAULT_LOCALE ? '' : lang;
  const options = Array.from(select.options || []).map((opt) => opt.value);

  // English is usually "" (original), not "en"
  const resolved =
    target === '' || target === 'en'
      ? options.includes('')
        ? ''
        : options.includes('en')
          ? 'en'
          : target
      : options.includes(target)
        ? target
        : null;

  if (resolved === null) {
    // Language not present in the widget dropdown
    return false;
  }

  // Reset first so re-selecting the same (or switching) always re-triggers GT
  if (select.value !== '') {
    select.value = options.includes('') ? '' : select.options[0]?.value || '';
    fireComboChange(select);
  }

  select.value = resolved;
  fireComboChange(select);
  return select.value === resolved;
}

export function applyGoogleTranslateLocale(lang) {
  setGoogleTranslateCookie(lang);

  // Prefer live combo change (no full reload) when the widget is ready
  if (triggerGoogleTranslateCombo(lang)) {
    document.documentElement.lang = lang || DEFAULT_LOCALE;
    return;
  }

  // Fallback: cookie + reload so GT picks it up on init
  window.location.reload();
}

export function ensurePageTranslated(lang = readGoogleTranslateLocale()) {
  if (typeof document === 'undefined') return;

  document.documentElement.lang = lang || DEFAULT_LOCALE;
  setGoogleTranslateCookie(lang);

  if (!lang || lang === DEFAULT_LOCALE) {
    triggerGoogleTranslateCombo(DEFAULT_LOCALE);
    return;
  }

  let attempts = 0;
  const maxAttempts = 40;

  const tryApply = () => {
    attempts += 1;
    if (triggerGoogleTranslateCombo(lang)) return;
    if (attempts < maxAttempts) {
      window.setTimeout(tryApply, 250);
    }
  };

  tryApply();
}
