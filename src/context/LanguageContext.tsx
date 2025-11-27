'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { dictionaries, type Dictionary, type Language } from '@/lib/dictionary';

interface LanguageContextValue {
  language: Language;
  setLanguage: (language: Language) => void;
  t: Dictionary;
  isLanguageReady: boolean;
  isLanguageConfirmed: boolean;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Всегда начинаем с 'ru' для предотвращения hydration mismatch
  // На сервере и при первой гидратации всегда будет 'ru'
  const [language, setLanguageState] = useState<Language>('ru');
  const [isLanguageReady, setIsLanguageReady] = useState(false);
  const [isLanguageConfirmed, setIsLanguageConfirmed] = useState(false);

  useEffect(() => {
    // Первый GET-запрос при загрузке страницы
    fetch('https://ketly-965641886904.asia-southeast1.run.app/health')
      .then(response => response.json())
      .then(data => {
        console.log('Health check:', data);
      })
      .catch(error => {
        console.error('Health check error:', error);
      });

    // Читаем сохраненный язык из localStorage только после монтирования
    // Это предотвращает hydration mismatch, так как на сервере всегда будет 'ru'
    const saved = window.localStorage.getItem('language');
    if (saved === 'ru' || saved === 'en') {
      setLanguageState(saved);
      setIsLanguageConfirmed(true);
    }
    setIsLanguageReady(true);
  }, []);

  const setLanguage = useCallback((nextLanguage: Language) => {
    setLanguageState(nextLanguage);
    setIsLanguageConfirmed(true);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('language', nextLanguage);
    }
  }, []);

  useEffect(() => {
    if (typeof document === 'undefined') {
      return;
    }

    document.documentElement.lang = language;

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', dictionaries[language].meta.description);
    }
  }, [language]);

  const value = useMemo<LanguageContextValue>(
    () => ({
      language,
      setLanguage,
      t: dictionaries[language],
      isLanguageReady,
      isLanguageConfirmed,
    }),
    [language, setLanguage, isLanguageReady, isLanguageConfirmed],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}


