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

const warnedKeys = new Set();

function warnMissing(language, key) {
  if (process.env.NODE_ENV === "production") return;
  const dedupeKey = `${language}:${key}`;
  if (warnedKeys.has(dedupeKey)) return;
  warnedKeys.add(dedupeKey);
  console.warn(`[i18n] missing "${language}" translation for "${key}"`);
}

export function useTranslation() {
  const language = useContext(LanguageContext);

  const t = useMemo(() => {
    const messages = locales[language] || locales.en;

    return (key, params) => {
      const parts = key.split(".");
      let value = messages;
      for (const part of parts) {
        if (value == null || typeof value !== "object") {
          value = undefined;
          break;
        }
        value = value[part];
      }

      if (typeof value !== "string") {
        warnMissing(language, key);
        return key;
      }

      if (!params) return value;
      return value.replace(/\{(\w+)\}/g, (match, name) =>
        params[name] == null ? match : String(params[name]),
      );
    };
  }, [language]);

  return { t, language };
}
