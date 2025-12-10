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
  // Используем language из GlobalContext как единый источник истины
  // Но сохраняем локальное состояние для SSR-совместимости
  const { language: globalLanguage, setLanguage: setGlobalLanguage } = useGlobal();
  const [language, setLanguageState] = useState<Language>('ru');
  const [isLanguageReady, setIsLanguageReady] = useState(false);
  const [isLanguageConfirmed, setIsLanguageConfirmed] = useState(false);
  const [isWelcomeInfoShown, setIsWelcomeInfoShown] = useState(false);

  // Синхронизируем локальное состояние с GlobalContext
  useEffect(() => {
    if (globalLanguage !== language) {
      setLanguageState(globalLanguage);
    }
  }, [globalLanguage, language]);

  useEffect(() => {
    // Первый GET-запрос при загрузке страницы (опциональный, не блокирует работу приложения)
    // Отправляем запросы параллельно на оба адреса
    const sendHealthRequest = (url: string, label: string) => {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // Таймаут 5 секунд

        fetch(url, {
          method: 'GET',
          signal: controller.signal,
        })
          .then(response => {
            clearTimeout(timeoutId);
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
          })
          .then(data => {
            console.log(`Health check (${label}):`, data);
          })
          .catch(error => {
            clearTimeout(timeoutId);
            // Игнорируем ошибки health check - это не критично для работы приложения
            if (error.name !== 'AbortError') {
              console.warn(`Health check (${label}) недоступен:`, error.message);
            }
          });
      } catch (error) {
        // Если переменная окружения не установлена или другая ошибка - просто игнорируем
        console.warn(`Health check (${label}) пропущен:`, error instanceof Error ? error.message : 'Неизвестная ошибка');
      }
    };

    // Отправляем запрос на основной адрес
    try {
      const healthUrl = getHealthUrl();
      sendHealthRequest(healthUrl, 'main');
    } catch (error) {
      console.warn('Health check (main) пропущен:', error instanceof Error ? error.message : 'Неизвестная ошибка');
    }

    // Отправляем запрос на адрес car-rental, если он доступен
    const carRentalHealthUrl = getCarRentalHealthUrl();
    if (carRentalHealthUrl) {
      sendHealthRequest(carRentalHealthUrl, 'car-rental');
    }

    // Отправляем запросы на адреса velvet-spa (RU и EN), если они доступны
    const velvetSpaHealthUrls = getVelvetSpaHealthUrls();
    velvetSpaHealthUrls.forEach((url, index) => {
      const label = index === 0 ? 'velvet-spa-ru' : 'velvet-spa-en';
      sendHealthRequest(url, label);
    });

    // Читаем сохраненный язык из localStorage только после монтирования
    // Это предотвращает hydration mismatch, так как на сервере всегда будет 'ru'
    const saved = window.localStorage.getItem('language');
    let welcomeInfoShown = window.localStorage.getItem('welcomeInfoShown') === 'true';
    
    // Если язык уже был выбран ранее, но welcomeInfoShown не установлено,
    // значит пользователь заходил до добавления welcomeInfo - автоматически считаем,
    // что welcomeInfo было показано, чтобы сообщения отправлялись сразу
    if ((saved === 'ru' || saved === 'en') && !welcomeInfoShown) {
      welcomeInfoShown = true;
      window.localStorage.setItem('welcomeInfoShown', 'true');
    }
    
    if (saved === 'ru' || saved === 'en') {
      setLanguageState(saved);
      setGlobalLanguage(saved); // Синхронизируем с GlobalContext
      setIsLanguageConfirmed(true);
    }
    setIsWelcomeInfoShown(welcomeInfoShown);
    setIsLanguageReady(true);
  }, []);

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


