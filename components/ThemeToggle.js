import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Monitor } from "lucide-react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState("light");
  const [mounted, setMounted] = useState(false);

  const themes = [
    { value: "light", icon: Sun, label: "Light" },
    { value: "dark", icon: Moon, label: "Dark" },
    { value: "system", icon: Monitor, label: "System" },
  ];

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme") || "system";
    setTheme(savedTheme);
    applyTheme(savedTheme);

    // Listen for system theme changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      if (theme === "system") {
        applyTheme("system");
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme]);

  const applyTheme = (newTheme) => {
    const root = document.documentElement;
    
    if (newTheme === "dark") {
      root.classList.add("dark");
    } else if (newTheme === "light") {
      root.classList.remove("dark");
    } else if (newTheme === "system") {
      const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      if (systemPrefersDark) {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    }
  };

  const selectTheme = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    applyTheme(newTheme);
  };

  // Prevent hydration mismatch
  if (!mounted) return null;

  return (
    <div className="flex items-center rounded-full border shadow-lg backdrop-blur-sm
                    bg-white/80 dark:bg-dark-800/80 border-gray-200/50 dark:border-dark-600/50
                    p-1 transition-all duration-300">
      {themes.map((themeOption) => {
        const Icon = themeOption.icon;
        const isSelected = theme === themeOption.value;
        
        return (
          <button
            key={themeOption.value}
            onClick={() => selectTheme(themeOption.value)}
            className={`relative p-2 rounded-full transition-all duration-300
                       ${isSelected 
                         ? 'text-white shadow-md' 
                         : 'text-gray-500 dark:text-dark-400 hover:text-gray-700 dark:hover:text-dark-200'
                       }`}
            aria-label={`${themeOption.label} theme`}
            title={`${themeOption.label} theme`}
          >
            {/* Background for selected state */}
            {isSelected && (
              <motion.div
                layoutId="theme-bg"
                className="absolute inset-0 rounded-full bg-accent-light dark:bg-accent-dark"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            
            {/* Icon */}
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