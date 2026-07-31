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
      className="rounded-[3px] object-cover shadow-sm flex-shrink-0"
      loading="eager"
      decoding="async"
    />
  );
}

export default function LanguageSwitcher({ dropUp = true }) {
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

  return (
    <div ref={rootRef} className="relative notranslate skiptranslate w-full max-w-xs" translate="no">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Language: ${current.label}`}
        className="w-full inline-flex items-center gap-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 px-3.5 py-2.5 text-left shadow-sm hover:border-orange-400 dark:hover:border-orange-500 transition-colors"
        style={{ fontFamily: 'Albert Sans, sans-serif' }}
      >
        <Flag code={current.flagCode} alt={current.label} size={22} />
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
      </button>

      {open && (
        <div
          role="listbox"
          aria-label="Language"
          className={`absolute left-0 right-0 min-w-[220px] max-h-[280px] overflow-y-auto rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-2xl z-[100] ${
            dropUp ? 'bottom-full mb-2' : 'top-full mt-2'
          }`}
        >
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
                      ? 'bg-orange-50 dark:bg-orange-900/25 text-orange-600 dark:text-orange-400 font-semibold'
                      : 'text-gray-700 dark:text-gray-200 hover:bg-orange-50/70 dark:hover:bg-orange-900/20'}
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
