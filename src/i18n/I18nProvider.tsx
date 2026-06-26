"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { translations, type Locale } from "./translations";

type I18nContextValue = {
  locale: Locale;
  toggleLocale: () => void;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
};

export const I18nContext = createContext<I18nContextValue | undefined>(undefined);

const STORAGE_KEY = "andrean-rachmat-locale";

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("id");

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Locale | null;
    if (stored === "id" || stored === "en") {
      setLocaleState(stored);
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem(STORAGE_KEY, newLocale);
  };

  const toggleLocale = () => {
    setLocale(locale === "id" ? "en" : "id");
  };

  const t = (key: string): string => {
    const dict = translations[locale] as Record<string, string>;
    return dict[key] ?? key;
  };

  return (
    <I18nContext.Provider value={{ locale, toggleLocale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}
