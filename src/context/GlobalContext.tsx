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
import { v4 as uuidv4 } from 'uuid';
import type { Language } from '@/lib/dictionary';

interface GlobalContextValue {
  sessionId: string | null;
  language: Language;
  setLanguage: (language: Language) => void;
}

const GlobalContext = createContext<GlobalContextValue | undefined>(undefined);

export function GlobalProvider({ children }: { children: ReactNode }) {
  // sessionId: генерируется один раз при монтировании, НЕ сохраняется в localStorage
  const [sessionId, setSessionId] = useState<string | null>(null);
  
  // language: читается из localStorage, сохраняется туда же
  const [language, setLanguageState] = useState<Language>('ru');

  useEffect(() => {
    // Восстанавливаем язык из localStorage
    if (typeof window !== 'undefined') {
      const saved = window.localStorage.getItem('language');
      if (saved === 'ru' || saved === 'en') {
        setLanguageState(saved);
      }
    }

    // Генерируем sessionId один раз при монтировании
    // НЕ сохраняем в localStorage - сессия живет только в памяти
    if (!sessionId) {
      setSessionId(uuidv4());
    }
  }, [sessionId]);

  const setLanguage = useCallback((nextLanguage: Language) => {
    setLanguageState(nextLanguage);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('language', nextLanguage);
    }
  }, []);

  const value = useMemo<GlobalContextValue>(
    () => ({
      sessionId,
      language,
      setLanguage,
    }),
    [sessionId, language, setLanguage],
  );

  return <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>;
}

export function useGlobal() {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('useGlobal must be used within a GlobalProvider');
  }
  return context;
}






