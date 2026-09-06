"use client";

import { createContext, useContext, useMemo } from "react";
import en from "@/locales/en.json";
import id from "@/locales/id.json";

const locales = { en, id };

const LanguageContext = createContext("en");

export function LanguageProvider({ language = "en", children }) {
  return (
    <LanguageContext.Provider value={language}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  const language = useContext(LanguageContext);

  const t = useMemo(() => {
    const messages = locales[language] || locales.en;

    return (key) => {
      const parts = key.split(".");
      let value = messages;
      for (const part of parts) {
        if (value == null || typeof value !== "object") return key;
        value = value[part];
      }
      return typeof value === "string" ? value : key;
    };
  }, [language]);

  return { t, language };
}
