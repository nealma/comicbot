"use client";

import { useLocale } from "@/i18n/locale-provider";
import { Languages } from "lucide-react";

export function LanguageSwitch() {
  const { locale, setLocale } = useLocale();

  const toggleLocale = () => {
    setLocale(locale === "zh" ? "en" : "zh");
  };

  return (
    <button
      type="button"
      className="flex items-center gap-1.5 px-2.5 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
      onClick={toggleLocale}
      aria-label={`Switch language to ${locale === "zh" ? "English" : "Chinese"}`}
    >
      <Languages className="w-4 h-4" />
      <span className="text-xs">
        {locale === "zh" ? "En" : "中"}
      </span>
    </button>
  );
}
