'use client';

import React, { createContext, useContext, useSyncExternalStore } from 'react';
import { Language, Translations, translations } from '../data/translations';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  t: Translations;
}

const STORAGE_KEY = 'exam_seba_lang';

function subscribe(callback: () => void) {
  if (typeof window === 'undefined') return () => {};
  window.addEventListener('storage', callback);
  window.addEventListener('exam_seba_lang_change', callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener('exam_seba_lang_change', callback);
  };
}

function getSnapshot(): Language {
  if (typeof window === 'undefined') return 'bn';
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'bn' || saved === 'en') return saved;
  } catch {
    // ignore
  }
  return 'bn';
}

function getServerSnapshot(): Language {
  return 'bn';
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'bn',
  setLang: () => {},
  toggleLang: () => {},
  t: translations.bn,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const lang = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setLang = (newLang: Language) => {
    try {
      localStorage.setItem(STORAGE_KEY, newLang);
      window.dispatchEvent(new Event('exam_seba_lang_change'));
    } catch {
      // ignore
    }
  };

  const toggleLang = () => {
    setLang(lang === 'bn' ? 'en' : 'bn');
  };

  const t = translations[lang];

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
