'use client';

import { useEffect, useRef, useState } from 'react';
import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';
import { useLanguage } from '@/context/LanguageContext';
import { TOUR_STEPS } from '@/lib/tourContent';

interface MainTourManagerProps {
  onComplete: () => void;
}

export function MainTourManager({ onComplete }: MainTourManagerProps) {
  const { language } = useLanguage();
  const driverRef = useRef<ReturnType<typeof driver> | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Определяем, мобильная ли версия
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  useEffect(() => {
    // Проверяем, был ли тур уже показан
    const tourSeen = typeof window !== 'undefined' 
      ? localStorage.getItem('tour_seen_main_page') 
      : null;

    if (tourSeen) {
      // Тур уже был показан - сразу вызываем onComplete
      onComplete();
      return;
    }

    // Получаем тексты в зависимости от языка
    const texts = TOUR_STEPS[language].mainPage;
    const buttonTexts = TOUR_STEPS[language].buttons;

    // Функция для сохранения флага о просмотре тура
    const saveTourSeen = () => {
      if (typeof window !== 'undefined') {
        const tourKey = 'tour_seen_main_page';
        localStorage.setItem(tourKey, 'true');
        // Диспатчим событие о завершении тура
        window.dispatchEvent(new Event(`tour-completed-${tourKey}`));
        // Вызываем коллбек
        onComplete();
      }
    };

    // Инициализируем Driver.js
    const driverObj = driver({
      showProgress: true,
      allowClose: true,
      overlayOpacity: 0.85,
      nextBtnText: buttonTexts.next,
      prevBtnText: buttonTexts.prev,
      doneBtnText: buttonTexts.done,
      steps: [
        // Шаг 1: Приветствие (без привязки к элементу, по центру)
        {
          popover: {
            title: texts.welcome.title,
            description: texts.welcome.description,
            side: 'bottom',
            align: 'center',
          },
        },
        // Шаг 2: Поле ввода
        {
          element: () => {
            // Выбираем конкретный ID в зависимости от ширины экрана
            const isMobileWidth = window.innerWidth < 1024;
            const selector = isMobileWidth ? '#tour-chat-input-mobile' : '#tour-chat-input-desktop';
            const element = document.querySelector(selector);
            if (!element) {
              throw new Error(`Tour chat input element not found: ${selector}`);
            }
            return element;
          },
          popover: {
            title: texts.input.title,
            description: texts.input.description,
            side: 'top',
            align: 'start',
          },
        },
        // Шаг 3: Быстрые действия
        {
          element: () => {
            // Динамическая проверка ширины экрана
            const isMobileWidth = window.innerWidth < 1024;
            if (isMobileWidth) {
              const element = document.querySelector('#tour-mobile-quick-actions');
              if (!element) {
                throw new Error('Tour mobile quick actions element not found');
              }
              return element;
            }
            const element = document.querySelector('#tour-desktop-quick-actions');
            if (!element) {
              throw new Error('Tour desktop quick actions element not found');
            }
            return element;
          },
          popover: {
            title: texts.quickActions.title,
            description: (() => {
              const isMobileWidth = window.innerWidth < 1024;
              if (isMobileWidth) {
                return language === 'ru' 
                  ? "Нажмите на эту кнопку, чтобы открыть меню быстрых команд." 
                  : "Tap this button to open the quick commands menu.";
              }
              return texts.quickActions.description;
            })(),
            side: (() => {
              const isMobileWidth = window.innerWidth < 1024;
              return isMobileWidth ? 'top' : 'left';
            })(),
            align: 'start',
          },
        },
        // Шаг 4: Примеры (Showcase)
        {
          element: () => {
            // Динамическая проверка ширины экрана
            const isMobileWidth = window.innerWidth < 1024;
            if (isMobileWidth) {
              const element = document.querySelector('#tour-showcase-mobile');
              if (!element) {
                throw new Error('Tour showcase mobile element not found');
              }
              return element;
            }
            const element = document.querySelector('#tour-showcase-desktop');
            if (!element) {
              throw new Error('Tour showcase desktop element not found');
            }
            return element;
          },
          popover: {
            title: texts.showcase.title,
            description: texts.showcase.description,
            side: (() => {
              const isMobileWidth = window.innerWidth < 1024;
              return isMobileWidth ? 'top' : 'right';
            })(),
            align: 'end',
          },
        },
        // Шаг 5: Контакты
        {
          element: () => {
            // Динамическая проверка ширины экрана
            const isMobileWidth = window.innerWidth < 1024;
            const selector = isMobileWidth ? '#tour-contact-mobile' : '#tour-contact-desktop';
            const element = document.querySelector(selector);
            if (!element) {
              throw new Error(`Tour contact element not found: ${selector}`);
            }
            return element;
          },
          popover: {
            title: texts.contact.title,
            description: texts.contact.description,
            side: (() => {
              const isMobileWidth = window.innerWidth < 1024;
              return isMobileWidth ? 'top' : 'right';
            })(),
            align: 'end',
          },
        },
      ],
      onDestroyed: () => {
        saveTourSeen();
      },
    });

    driverRef.current = driverObj;

    // Небольшая задержка, чтобы UI прогрузился
    const timer = setTimeout(() => {
      driverObj.drive();
    }, 500);

    // Очистка при размонтировании
    return () => {
      clearTimeout(timer);
      if (driverRef.current) {
        driverRef.current.destroy();
      }
    };
  }, [language, isMobile, onComplete]);

  // Кнопка дебага для полного сброса (только в development)
  const handleHardReset = () => {
    if (typeof window !== 'undefined') {
      localStorage.clear(); // Чистим всё (язык, туры, сессии)
      window.location.reload();
    }
  };

  return (
    <>
      {/* Кнопка дебага - показываем только в development */}
      {process.env.NODE_ENV === 'development' && (
        <button
          onClick={handleHardReset}
          className="fixed bottom-4 left-4 z-50 px-3 py-1.5 text-xs font-medium text-white bg-red-500/60 hover:bg-red-500/80 backdrop-blur-sm rounded-lg transition-colors"
          aria-label="Hard Reset"
        >
          HARD RESET
        </button>
      )}
    </>
  );
}

