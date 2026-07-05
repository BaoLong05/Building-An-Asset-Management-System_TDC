import { createContext, useContext, useState } from "react";
import vi from "../locales/vi.json";
import en from "../locales/en.json";

const translations = { vi, en };

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem("appLang") || "vi";
  });

  const changeLanguage = (lng) => {
    setLang(lng);
    localStorage.setItem("appLang", lng);
  };

  const t = (key) => {
    const keys = key.split(".");
    let value = translations[lang];
    for (const k of keys) {
      value = value?.[k];
    }
    return value ?? key;
  };

  return (
    <LanguageContext.Provider value={{ lang, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
