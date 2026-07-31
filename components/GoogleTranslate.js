import { useEffect } from 'react';
import Script from 'next/script';
import { useRouter } from 'next/router';
import {
  ensurePageTranslated,
  readGoogleTranslateLocale,
} from '../lib/i18n/googleTranslate';
import { applySavedTheme } from '../lib/theme';

function hideGoogleBanner() {
  document.querySelectorAll(
    'iframe.goog-te-banner-frame, .goog-te-banner-frame'
  ).forEach((el) => {
    el.style.setProperty('display', 'none', 'important');
    el.style.setProperty('visibility', 'hidden', 'important');
    el.style.setProperty('height', '0', 'important');
  });

  if (document.body.style.top && document.body.style.top !== '0px') {
    document.body.style.setProperty('top', '0', 'important');
  }
}

export default function GoogleTranslate() {
  const router = useRouter();

  useEffect(() => {
    const lang = readGoogleTranslateLocale();
    if (lang !== 'en') {
      ensurePageTranslated(lang);
    }

    hideGoogleBanner();
    applySavedTheme();

    const observer = new MutationObserver((mutations) => {
      const addedBanner = mutations.some((mutation) =>
        Array.from(mutation.addedNodes).some(
          (node) =>
            node.nodeType === 1 &&
            (node.classList?.contains('goog-te-banner-frame') ||
              (node.tagName === 'IFRAME' &&
                String(node.className || '').includes('goog-te-banner')))
        )
      );
      if (addedBanner) hideGoogleBanner();
    });

    observer.observe(document.body, { childList: true });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onRouteDone = () => {
      applySavedTheme();
      const lang = readGoogleTranslateLocale();
      if (lang === 'en') return;
      window.setTimeout(() => {
        ensurePageTranslated(lang);
        applySavedTheme();
      }, 500);
    };

    router.events.on('routeChangeComplete', onRouteDone);
    return () => {
      router.events.off('routeChangeComplete', onRouteDone);
    };
  }, [router.events]);

  return (
    <>
      <div id="google_translate_element" className="cws-gt-widget" aria-hidden="true" />
      <Script id="google-translate-init" strategy="afterInteractive">
        {`
          window.googleTranslateElementInit = function () {
            if (!window.google || !window.google.translate) return;
            new window.google.translate.TranslateElement({
              pageLanguage: 'en',
              includedLanguages: 'en,fr,es,ee,ak,gaa',
              autoDisplay: false,
              multilanguagePage: true,
              layout: window.google.translate.TranslateElement.InlineLayout.HORIZONTAL
            }, 'google_translate_element');

            try {
              var match = document.cookie.match(/(?:^|;\\s*)googtrans=\\/en\\/([a-z]{2,3})/i);
              var lang = match ? match[1] : (localStorage.getItem('cws-locale') || 'en');
              if (lang && lang !== 'en') {
                var tries = 0;
                var timer = setInterval(function () {
                  var select = document.querySelector('.goog-te-combo');
                  tries += 1;
                  if (select) {
                    select.value = lang;
                    select.dispatchEvent(new Event('change'));
                    clearInterval(timer);
                    setTimeout(function () {
                      try {
                        var theme = localStorage.getItem('theme') || 'system';
                        var dark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
                        document.documentElement.classList.toggle('dark', dark);
                        document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
                      } catch (e) {}
                    }, 600);
                  } else if (tries > 40) {
                    clearInterval(timer);
                  }
                }, 200);
              }
            } catch (e) {}
          };
        `}
      </Script>
      <Script
        src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        strategy="afterInteractive"
      />
    </>
  );
}
