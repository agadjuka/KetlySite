'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { usePathname } from 'next/navigation';
import { dictionaries, type Dictionary, type Language } from '@/lib/dictionary';
import { getHealthUrl, getCarRentalHealthUrl, getVelvetSpaHealthUrls } from '@/lib/apiUrl';
import { useGlobal } from './GlobalContext';

interface LanguageContextValue {
  language: Language;
  setLanguage: (language: Language) => void;
  t: Dictionary;
  isLanguageReady: boolean;
  isLanguageConfirmed: boolean;
  isWelcomeInfoShown: boolean;
  setWelcomeInfoShown: (shown: boolean) => void;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { language: globalLanguage, setLanguage: setGlobalLanguage } = useGlobal();
  const [language, setLanguageState] = useState<Language>('ru');
  const [isLanguageReady, setIsLanguageReady] = useState(false);
  const [isLanguageConfirmed, setIsLanguageConfirmed] = useState(false);
  const [isWelcomeInfoShown, setIsWelcomeInfoShown] = useState(false);
  const chatInitDone = useRef(false);

  // Синхронизируем локальное состояние с GlobalContext
  useEffect(() => {
    if (globalLanguage !== language) {
      setLanguageState(globalLanguage);
    }
  }, [globalLanguage, language]);

  // Вне страницы чата: не показываем выбор языка, используем язык из GlobalContext
  useEffect(() => {
    if (pathname === '/chat') return;

    const saved = typeof window !== 'undefined' ? window.localStorage.getItem('language') : null;
    const lang = saved === 'ru' || saved === 'en' ? saved : globalLanguage;
    setLanguageState(lang);
    if (saved === 'ru' || saved === 'en') {
      setGlobalLanguage(saved);
      setIsLanguageConfirmed(true);
    } else {
      setIsLanguageConfirmed(true);
    }
    const welcomeShown = typeof window !== 'undefined' && window.localStorage.getItem('welcomeInfoShown') === 'true';
    setIsWelcomeInfoShown(welcomeShown);
    setIsLanguageReady(true);
  }, [pathname, setGlobalLanguage, globalLanguage]);

  // Инициализация только на странице чата: health-запросы и определение языка
  useEffect(() => {
    if (pathname !== '/chat') {
      chatInitDone.current = false;
      return;
    }
    if (chatInitDone.current) return;
    chatInitDone.current = true;

    const sendHealthRequest = (url: string, label: string) => {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);

        fetch(url, {
          method: 'GET',
          signal: controller.signal,
        })
          .then(response => {
            clearTimeout(timeoutId);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return response.json();
          })
          .then(data => console.log(`Health check (${label}):`, data))
          .catch(error => {
            clearTimeout(timeoutId);
            if (error.name !== 'AbortError') {
              console.warn(`Health check (${label}) недоступен:`, error.message);
            }
          });
      } catch (error) {
        console.warn(`Health check (${label}) пропущен:`, error instanceof Error ? error.message : 'Неизвестная ошибка');
      }
    };

    try {
      sendHealthRequest(getHealthUrl(), 'main');
    } catch (e) {
      console.warn('Health check (main) пропущен:', e instanceof Error ? e.message : 'Неизвестная ошибка');
    }

    const carRentalHealthUrl = getCarRentalHealthUrl();
    if (carRentalHealthUrl) sendHealthRequest(carRentalHealthUrl, 'car-rental');

    const velvetSpaHealthUrls = getVelvetSpaHealthUrls();
    velvetSpaHealthUrls.forEach((url, index) => {
      sendHealthRequest(url, index === 0 ? 'velvet-spa-ru' : 'velvet-spa-en');
    });

    const saved = window.localStorage.getItem('language');
    let welcomeInfoShown = window.localStorage.getItem('welcomeInfoShown') === 'true';

    if ((saved === 'ru' || saved === 'en') && !welcomeInfoShown) {
      welcomeInfoShown = true;
      window.localStorage.setItem('welcomeInfoShown', 'true');
    }

    if (saved === 'ru' || saved === 'en') {
      setLanguageState(saved);
      setGlobalLanguage(saved);
      setIsLanguageConfirmed(true);
    }
    setIsWelcomeInfoShown(welcomeInfoShown);
    setIsLanguageReady(true);
  }, [pathname, setGlobalLanguage]);

  const setLanguage = useCallback((nextLanguage: Language) => {
    setLanguageState(nextLanguage);
    setGlobalLanguage(nextLanguage); // Синхронизируем с GlobalContext
    setIsLanguageConfirmed(true);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('language', nextLanguage);
    }
  }, [setGlobalLanguage]);

  const setWelcomeInfoShown = useCallback((shown: boolean) => {
    setIsWelcomeInfoShown(shown);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('welcomeInfoShown', shown ? 'true' : 'false');
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
      isWelcomeInfoShown,
      setWelcomeInfoShown,
    }),
    [language, setLanguage, isLanguageReady, isLanguageConfirmed, isWelcomeInfoShown, setWelcomeInfoShown],
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


