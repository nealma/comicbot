"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { NextIntlClientProvider } from "next-intl";
import zhMessages from "../../messages/zh.json";
import enMessages from "../../messages/en.json";

type Locale = "zh" | "en";

interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

const LocaleContext = createContext<LocaleContextType>({
  locale: "zh",
  setLocale: () => {},
});

export function useLocale() {
  return useContext(LocaleContext);
}

const messagesMap = {
  zh: zhMessages,
  en: enMessages,
};

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("zh");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("locale") as Locale;
    if (saved && (saved === "zh" || saved === "en")) {
      setLocaleState(saved);
    }
    setMounted(true);
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem("locale", newLocale);
  };

  if (!mounted) {
    return null;
  }

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      <NextIntlClientProvider
        locale={locale}
        messages={messagesMap[locale]}
      >
        {children}
      </NextIntlClientProvider>
    </LocaleContext.Provider>
  );
}
