import { useEffect } from 'react';
import Script from 'next/script';
import { useRouter } from 'next/router';
import {
  ensurePageTranslated,
  readGoogleTranslateLocale,
} from '../lib/i18n/googleTranslate';
import { applySavedTheme } from '../lib/theme';

// Google Translate swaps text nodes for <font> wrappers behind React's back, so a
// later React update can try to remove/insert a node that no longer belongs to its
// recorded parent and throw NotFoundError. Make those two operations tolerant.
if (typeof window !== 'undefined' && !window.__cwsTranslateDomPatched) {
  window.__cwsTranslateDomPatched = true;

  const originalRemoveChild = Node.prototype.removeChild;
  Node.prototype.removeChild = function (child) {
    if (child && child.parentNode !== this) {
      if (child.parentNode) child.parentNode.removeChild(child);
      return child;
    }
    return originalRemoveChild.apply(this, arguments);
  };

  const originalInsertBefore = Node.prototype.insertBefore;
  Node.prototype.insertBefore = function (newNode, referenceNode) {
    if (referenceNode && referenceNode.parentNode !== this) {
      return this.appendChild(newNode);
    }
    return originalInsertBefore.apply(this, arguments);
  };
}

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
    ensurePageTranslated(lang);

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

    observer.observe(document.documentElement, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onRouteDone = () => {
      applySavedTheme();
      const lang = readGoogleTranslateLocale();
      window.setTimeout(() => {
        ensurePageTranslated(lang);
        applySavedTheme();
        hideGoogleBanner();
      }, 400);
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
              layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE
            }, 'google_translate_element');

            try {
              var match = document.cookie.match(/(?:^|;\\s*)googtrans=\\/en\\/([a-z]{2,3})/i);
              var lang = match ? match[1] : (localStorage.getItem('cws-locale') || 'en');
              var tries = 0;
              var timer = setInterval(function () {
                var select = document.querySelector('#google_translate_element select.goog-te-combo')
                  || document.querySelector('.goog-te-combo');
                tries += 1;
                if (!select) {
                  if (tries > 50) clearInterval(timer);
                  return;
                }
                clearInterval(timer);
                var target = (!lang || lang === 'en') ? '' : lang;
                var values = Array.prototype.map.call(select.options || [], function (o) { return o.value; });
                if (target && values.indexOf(target) === -1) return;
                if (!target && values.indexOf('') === -1 && values.indexOf('en') !== -1) target = 'en';
                select.value = target;
                try {
                  select.dispatchEvent(new Event('change', { bubbles: true }));
                } catch (e) {
                  var evt = document.createEvent('HTMLEvents');
                  evt.initEvent('change', true, true);
                  select.dispatchEvent(evt);
                }
                setTimeout(function () {
                  try {
                    var theme = localStorage.getItem('theme') || 'system';
                    var dark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
                    document.documentElement.classList.toggle('dark', dark);
                    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
                  } catch (err) {}
                }, 600);
              }, 200);
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
