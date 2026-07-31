import { useEffect, useState } from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import { applySavedTheme, setThemePreference, startThemeGuard } from '../lib/theme';

export default function ThemeToggle({ isMobile }) {
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

  return (
    <div
      className={`notranslate skiptranslate flex items-center rounded-full border shadow-lg backdrop-blur-sm
                 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600
                 p-1 ${isMobile ? 'w-full justify-center' : ''}`}
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
            className={`relative p-2 rounded-full transition-colors duration-200
              ${isSelected
                ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'}
              ${isMobile ? 'flex-1' : ''}`}
            aria-label={`${themeOption.label} theme`}
            title={`${themeOption.label} theme`}
          >
            <Icon size={16} />
          </button>
        );
      })}
    </div>
  );
}
