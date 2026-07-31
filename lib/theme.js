export function getPreferredTheme() {
  if (typeof window === 'undefined') return 'system';
  return localStorage.getItem('theme') || 'system';
}

export function shouldUseDark(theme = getPreferredTheme()) {
  if (typeof window === 'undefined') return false;
  if (theme === 'dark') return true;
  if (theme === 'light') return false;
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

export function applySavedTheme() {
  if (typeof document === 'undefined') return getPreferredTheme();

  const savedTheme = getPreferredTheme();
  const preferDark = shouldUseDark(savedTheme);
  const root = document.documentElement;

  // Prefer class + data-theme; avoid fighting Google Translate on body inline styles
  root.classList.toggle('dark', preferDark);
  root.setAttribute('data-theme', preferDark ? 'dark' : 'light');

  return savedTheme;
}

export function setThemePreference(theme) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('theme', theme);
  applySavedTheme();
}

/** Keeps html.dark in sync if Google Translate strips the class. */
export function startThemeGuard() {
  if (typeof document === 'undefined') return () => {};

  let locked = false;

  const sync = () => {
    if (locked) return;
    locked = true;
    try {
      const preferDark = shouldUseDark();
      const hasDark = document.documentElement.classList.contains('dark');
      if (preferDark !== hasDark) {
        document.documentElement.classList.toggle('dark', preferDark);
        document.documentElement.setAttribute('data-theme', preferDark ? 'dark' : 'light');
      }
    } finally {
      // Allow GT mutations to settle before syncing again
      window.setTimeout(() => {
        locked = false;
      }, 50);
    }
  };

  const observer = new MutationObserver(sync);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class', 'data-theme'],
  });

  const interval = window.setInterval(sync, 2000);
  sync();

  return () => {
    observer.disconnect();
    window.clearInterval(interval);
  };
}
