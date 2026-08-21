import { useEffect, useState } from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import { applySavedTheme, setThemePreference, startThemeGuard } from '../lib/theme';

export default function ThemeToggle({ isMobile, variant = 'default' }) {
  const [theme, setTheme] = useState('system');
  const [mounted, setMounted] = useState(false);

  const themes = [
    { value: 'light', icon: Sun, label: 'Light' },
    { value: 'system', icon: Monitor, label: 'System' },
    { value: 'dark', icon: Moon, label: 'Dark' },
  ];

  useEffect(() => {
    setMounted(true);
    setTheme(applySavedTheme() || 'system');
    const stopGuard = startThemeGuard();

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const onSystemChange = () => {
      if (localStorage.getItem('theme') === 'system') {
        applySavedTheme();
        setTheme('system');
      }
    };
    mediaQuery.addEventListener('change', onSystemChange);

    return () => {
      stopGuard();
      mediaQuery.removeEventListener('change', onSystemChange);
    };
  }, []);

  const selectTheme = (newTheme) => {
    setTheme(newTheme);
    setThemePreference(newTheme);
  };

  if (!mounted) return null;

  const isFooter = variant === 'footer';
  const isHeader = variant === 'header';

  return (
    <div
      className={`notranslate skiptranslate flex items-center rounded-full border p-1
                 ${isFooter
                   ? 'border-white/15 bg-white/5 shadow-none'
                   : isHeader
                     ? 'border-black/10 bg-white shadow-none'
                     : 'border-gray-200 bg-white shadow-lg backdrop-blur-sm dark:border-gray-600 dark:bg-gray-800'}
                 ${isMobile ? 'w-full justify-center' : ''}`}
      translate="no"
    >
      {themes.map((themeOption) => {
        const Icon = themeOption.icon;
        const isSelected = theme === themeOption.value;

        return (
          <button
            key={themeOption.value}
            type="button"
            onClick={() => selectTheme(themeOption.value)}
            className={`relative rounded-full p-2 transition-colors duration-200
              ${isSelected
                ? 'bg-orange-500 text-white shadow-sm'
                : isFooter
                  ? 'text-white/50 hover:text-white'
                  : isHeader
                    ? 'text-gray-500 hover:text-gray-900'
                    : 'text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200'}
              ${isMobile ? 'flex-1' : ''}`}
            aria-label={`${themeOption.label} theme`}
            title={`${themeOption.label} theme`}
          >
            <Icon size={isFooter || isHeader ? 15 : 16} />
          </button>
        );
      })}
    </div>
  );
}
