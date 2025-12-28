import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Monitor } from "lucide-react";

export default function ThemeToggle({ darkMode, toggleDarkMode, isMobile }) {
  const [theme, setTheme] = useState("system");
  const [mounted, setMounted] = useState(false);

  const themes = [
    { value: "light", icon: Sun, label: "Light" },
    { value: "system", icon: Monitor, label: "System" },
    { value: "dark", icon: Moon, label: "Dark" },
  ];

  useEffect(() => {
    setMounted(true);
    
    // Check localStorage for saved theme preference
    let savedTheme = localStorage.getItem("theme");
    
    // If no theme is saved, default to "system"
    if (!savedTheme) {
      savedTheme = "system";
      localStorage.setItem("theme", "system");
    }
    
    setTheme(savedTheme);
    applyTheme(savedTheme);

    // Listen for system theme changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemThemeChange = () => {
      const currentTheme = localStorage.getItem("theme");
      if (currentTheme === "system") {
        applyTheme("system");
      }
    };

    mediaQuery.addEventListener("change", handleSystemThemeChange);
    return () => mediaQuery.removeEventListener("change", handleSystemThemeChange);
  }, []);

  const applyTheme = (newTheme) => {
    const root = document.documentElement;
    
    if (newTheme === "system") {
      const systemPreference = window.matchMedia("(prefers-color-scheme: dark)").matches;
      if (systemPreference) {
        root.classList.add("dark");
        document.body.style.backgroundColor = '#111827';
      } else {
        root.classList.remove("dark");
        document.body.style.backgroundColor = '#ffffff';
      }
    } else if (newTheme === "dark") {
      root.classList.add("dark");
      document.body.style.backgroundColor = '#111827';
    } else {
      root.classList.remove("dark");
      document.body.style.backgroundColor = '#ffffff';
    }
  };

  const selectTheme = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    applyTheme(newTheme);
  };

  if (!mounted) return null;

  return (
    <div
      className={`flex items-center rounded-full border shadow-lg backdrop-blur-sm
                 bg-white/80 dark:bg-gray-800/80 border-gray-200/50 dark:border-gray-600/50
                 p-1 transition-all duration-300 ${isMobile ? 'w-full justify-center' : ''}`}
    >
      {themes.map((themeOption) => {
        const Icon = themeOption.icon;
        const isSelected = theme === themeOption.value;

        return (
          <button
            key={themeOption.value}
            onClick={() => selectTheme(themeOption.value)}
            className={`relative p-2 rounded-full transition-all duration-300
                       ${
                         isSelected
                           ? "text-white shadow-md"
                           : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                       } ${isMobile ? 'flex-1' : ''}`}
            aria-label={`${themeOption.label} theme`}
            title={`${themeOption.label} theme`}
          >
            {isSelected && (
              <motion.div
                layoutId="theme-bg"
                className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-500 to-orange-600"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}

            <motion.div
              className="relative z-10"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${themeOption.value}-${isSelected}`}
                  initial={{ rotate: -90, opacity: 0, scale: 0.8 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 90, opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                >
                  <Icon size={16} />
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </button>
        );
      })}
    </div>
  );
}