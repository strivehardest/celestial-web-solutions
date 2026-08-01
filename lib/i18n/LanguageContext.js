import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import {
  DEFAULT_LOCALE,
  LOCALES,
  applyGoogleTranslateLocale,
  ensurePageTranslated,
  readGoogleTranslateLocale,
} from './googleTranslate';

const LanguageContext = createContext({
  locale: DEFAULT_LOCALE,
  setLocale: () => {},
  locales: LOCALES,
  ready: false,
});

export function LanguageProvider({ children }) {
  const [locale, setLocaleState] = useState(DEFAULT_LOCALE);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const initial = readGoogleTranslateLocale();
    setLocaleState(initial);
    document.documentElement.lang = initial;
    // Always try to sync the widget (including reset to English)
    ensurePageTranslated(initial);
    setReady(true);
  }, []);

  const setLocale = useCallback((next) => {
    if (!LOCALES.some((item) => item.code === next)) return;
    if (next === locale) return;

    setLocaleState(next);
    document.documentElement.lang = next;
    applyGoogleTranslateLocale(next);
  }, [locale]);

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      locales: LOCALES,
      ready,
      t: (key) => key,
    }),
    [locale, setLocale, ready]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}

export default LanguageContext;
