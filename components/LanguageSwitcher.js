import { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '../lib/i18n/LanguageContext';

function Flag({ code, alt, size = 18 }) {
  return (
    <img
      src={`https://flagcdn.com/w40/${code}.png`}
      srcSet={`https://flagcdn.com/w80/${code}.png 2x`}
      width={size}
      height={Math.round(size * 0.75)}
      alt={alt}
      className="rounded-[2px] object-cover flex-shrink-0"
      loading="eager"
      decoding="async"
    />
  );
}

export default function LanguageSwitcher({
  dropUp = true,
  variant = 'default', // 'default' | 'header' | 'footer'
}) {
  const { locale, setLocale, locales } = useLanguage();
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);

  const current = locales.find((item) => item.code === locale) || locales[0];

  useEffect(() => {
    const onPointerDown = (event) => {
      if (rootRef.current && !rootRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('touchstart', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('touchstart', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  const isHeader = variant === 'header';
  const isFooter = variant === 'footer';

  const triggerClass = isHeader
    ? 'inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-2 text-sm font-medium text-gray-900 transition-colors hover:border-black/25 hover:bg-gray-50 dark:border-white/15 dark:bg-gray-900 dark:text-white dark:hover:border-white/30 dark:hover:bg-gray-800'
    : isFooter
      ? 'inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-3.5 py-2 text-sm font-medium text-gray-900 transition-colors hover:bg-gray-100 dark:border-white/20 dark:bg-white/5 dark:text-white dark:hover:bg-white/10'
      : 'w-full inline-flex items-center gap-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 px-3.5 py-2.5 text-left shadow-sm hover:border-orange-400 dark:hover:border-orange-500 transition-colors';

  const menuClass = isHeader || isFooter
    ? `absolute ${isHeader ? 'right-0' : 'left-0'} min-w-[220px] max-h-[280px] overflow-y-auto rounded-2xl border border-black/10 bg-white shadow-2xl z-[100] dark:border-white/10 dark:bg-gray-900 ${
        dropUp ? 'bottom-full mb-2' : 'top-full mt-2'
      }`
    : `absolute left-0 right-0 min-w-[220px] max-h-[280px] overflow-y-auto rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-2xl z-[100] ${
        dropUp ? 'bottom-full mb-2' : 'top-full mt-2'
      }`;

  return (
    <div
      ref={rootRef}
      className={`relative notranslate skiptranslate ${isHeader || isFooter ? 'w-auto' : 'w-full max-w-xs'}`}
      translate="no"
    >
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Language: ${current.label}`}
        className={triggerClass}
        style={{ fontFamily: 'Albert Sans, sans-serif' }}
      >
        <Flag code={current.flagCode} alt={current.label} size={isHeader || isFooter ? 18 : 22} />
        {isHeader || isFooter ? (
          <>
            <span className="font-semibold tracking-wide">{current.short}</span>
            <ChevronDown
              size={14}
              className={`opacity-60 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
            />
          </>
        ) : (
          <>
            <span className="flex-1 min-w-0">
              <span className="block text-[11px] uppercase tracking-wider text-gray-400 dark:text-gray-500 font-medium">
                Language
              </span>
              <span className="block text-sm font-semibold text-gray-900 dark:text-white truncate">
                {current.label}
              </span>
            </span>
            <span className="text-xs font-bold text-orange-600 dark:text-orange-400">{current.short}</span>
            <ChevronDown
              size={16}
              className={`text-gray-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
            />
          </>
        )}
      </button>

      {open && (
        <div role="listbox" aria-label="Language" className={menuClass}>
          <div className="py-1.5">
            {locales.map((item) => {
              const active = item.code === locale;
              return (
                <button
                  key={item.code}
                  type="button"
                  role="option"
                  aria-selected={active}
                  onClick={() => {
                    setOpen(false);
                    setLocale(item.code);
                  }}
                  className={`
                    w-full flex items-center gap-3 px-3.5 py-2.5 text-left text-sm transition-colors
                    ${active
                      ? 'bg-orange-50 text-orange-700 font-semibold'
                      : 'text-gray-700 hover:bg-gray-50'}
                  `}
                  style={{ fontFamily: 'Albert Sans, sans-serif' }}
                >
                  <Flag code={item.flagCode} alt={item.label} size={20} />
                  <span className="flex-1">{item.label}</span>
                  <span className="text-[11px] font-bold tracking-wider opacity-70">{item.short}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
