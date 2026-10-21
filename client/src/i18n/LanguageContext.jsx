import { createContext, useContext, useEffect, useState } from 'react';
import en from '../content/en.js';
import ar from '../content/ar.js';

const content = { en, ar };
const STORAGE_KEY = 'dawodia-lang';
const LanguageContext = createContext(null);

function initialLang() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved in content) return saved;
  } catch {
    // Storage unavailable; fall through.
  }
  return 'en';
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(initialLang);
  const t = content[lang];

  useEffect(() => {
    document.documentElement.lang = t.lang;
    document.documentElement.dir = t.dir;
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // Ignore: language choice just won't persist.
    }
  }, [lang, t]);

  return <LanguageContext.Provider value={{ lang, t, setLang }}>{children}</LanguageContext.Provider>;
}

export const useLanguage = () => useContext(LanguageContext);
