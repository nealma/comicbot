"use client";

import { useState, useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import { Sun, Moon, Monitor } from "lucide-react";

const themes = [
  { key: "light", icon: Sun },
  { key: "dark", icon: Moon },
  { key: "system", icon: Monitor },
] as const;

export function ThemeSwitch() {
  const { theme, setTheme } = useTheme();
  const t = useTranslations("theme");
  const [mounted, setMounted] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownOpen]);

  if (!mounted) {
    return (
      <button
        type="button"
        className="p-2 rounded-lg text-gray-400 bg-gray-100 dark:bg-gray-800"
        aria-label="Theme"
        disabled
      >
        <Sun className="w-4 h-4" />
      </button>
    );
  }

  const currentTheme = themes.find((t) => t.key === theme) || themes[2];
  const CurrentIcon = currentTheme.icon;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        aria-label="Toggle theme"
        aria-expanded={dropdownOpen}
      >
        <CurrentIcon className="w-4 h-4" />
      </button>

      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-36 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-lg py-1 z-50">
          {themes.map(({ key, icon: Icon }) => (
            <button
              key={key}
              type="button"
              className={`flex items-center gap-2.5 w-full px-3 py-2 text-sm transition-colors ${
                theme === key
                  ? "text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-950/50"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
              }`}
              onClick={() => {
                setTheme(key);
                setDropdownOpen(false);
              }}
            >
              <Icon className="w-4 h-4" />
              <span>{t(key)}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
