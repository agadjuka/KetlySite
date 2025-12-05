'use client';

import { useEffect, useRef, useState } from 'react';
import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';
import { useLanguage } from '@/context/LanguageContext';
import { TOUR_STEPS } from '@/lib/tourContent';

export function TourManager() {
  const { language } = useLanguage();
  const driverRef = useRef<ReturnType<typeof driver> | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Определяем, мобильная ли версия
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
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
      ? localStorage.getItem('tour_seen_car_rental') 
      : null;

    if (tourSeen) {
      return; // Тур уже был показан
    }

    // Определяем тип устройства
    const isMobile = window.innerWidth < 768;

    // Получаем тексты в зависимости от языка
    const texts = TOUR_STEPS[language];

    // Определяем элемент виджетов в зависимости от размера экрана
    // На мобилке используем функцию для динамического выбора элемента
    const getWidgetsElement = () => {
      if (isMobile) {
        // Проверяем, открыт ли виджет (ищем открытое содержимое)
        const openContent = document.querySelector('#tour-widgets-mobile-open');
        if (openContent) {
          // Если виджет открыт, возвращаем контейнер, который включает все
          return '#tour-widgets-mobile';
        }
        return '#tour-widgets-mobile';
      }
      return '#tour-widgets-desktop';
    };
    
    const widgetsElement = getWidgetsElement();

    // Функция для сохранения флага о просмотре тура
    const saveTourSeen = () => {
      if (typeof window !== 'undefined') {
        localStorage.setItem('tour_seen_car_rental', 'true');
      }
    };

    // Инициализируем Driver.js
    const driverObj = driver({
      showProgress: true,
      allowClose: true,
      overlayOpacity: 0.85,
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
        // Шаг 2: Виджеты
        {
          element: () => {
            if (isMobile) {
              // Убеждаемся, что виджет открыт
              const openContent = document.querySelector('#tour-widgets-mobile-open');
              
              // Открываем виджет, если он закрыт
              if (!openContent) {
                window.dispatchEvent(new Event('tour-open-mobile-widgets'));
              }
              
              // Возвращаем контейнер виджета, который теперь включает и кнопку, и открытое содержимое
              const element = document.querySelector('#tour-widgets-mobile');
              if (!element) {
                throw new Error('Tour widget element not found');
              }
              return element;
            }
            const element = document.querySelector('#tour-widgets-desktop');
            if (!element) {
              throw new Error('Tour widget element not found');
            }
            return element;
          },
          popover: {
            title: texts.widgets.title,
            description: isMobile 
              ? texts.widgets.descriptionMobile 
              : texts.widgets.descriptionDesktop,
            side: isMobile ? 'bottom' : 'left',
            align: 'start',
          },
          onHighlightStarted: () => {
            // Если мы на мобилке, открываем шторку перед подсветкой
            if (isMobile) {
              window.dispatchEvent(new Event('tour-open-mobile-widgets'));
              // Задержка для анимации открытия шторки и пересчета позиции
              setTimeout(() => {
                if (driverRef.current) {
                  // Обновляем позицию подсветки после открытия виджета
                  driverRef.current.refresh();
                }
              }, 500);
            }
          },
        },
        // Шаг 3: Кнопка выхода
        {
          element: () => {
            // Кнопки теперь всегда на отдельном слое, просто ищем нужную
            const mobileBtn = document.getElementById('tour-exit-button-mobile');
            const desktopBtn = document.getElementById('tour-exit-button-desktop');
            
            // Проверяем ширину экрана для выбора правильной кнопки
            if (window.innerWidth < 1024) {
              if (mobileBtn) return mobileBtn;
            } else {
              if (desktopBtn) return desktopBtn;
            }
            
            // Фолбэк: если не нашли по ширине, пробуем любую доступную
            if (mobileBtn) return mobileBtn;
            if (desktopBtn) return desktopBtn;
            
            throw new Error('Exit button not found');
          },
          popover: {
            title: texts.exit.title,
            description: texts.exit.description,
            side: 'bottom',
            align: 'end',
          },
        },
      ],
      onDestroyStarted: () => {
        // Сохраняем флаг при начале закрытия (крестик или ESC)
        saveTourSeen();
      },
      onDestroyed: () => {
        // Сохраняем флаг после полного закрытия
        saveTourSeen();
      },
    });

    driverRef.current = driverObj;

    // MutationObserver для отслеживания появления кнопок
    let observer: MutationObserver | null = null;

    // Функция для добавления обработчиков на кнопки
    const attachButtonHandlers = () => {
      // Обработчик для кнопки "Done"
      const doneButton = document.querySelector('.driver-popover-footer button:last-child');
      if (doneButton && !(doneButton as any)._tourHandlerAttached) {
        (doneButton as any)._tourHandlerAttached = true;
        doneButton.addEventListener('click', () => {
          saveTourSeen();
        }, { once: true });
      }

      // Обработчик для крестика
      const closeButton = document.querySelector('.driver-popover-close-btn');
      if (closeButton && !(closeButton as any)._tourHandlerAttached) {
        (closeButton as any)._tourHandlerAttached = true;
        closeButton.addEventListener('click', () => {
          saveTourSeen();
        }, { once: true });
      }
    };

    // Небольшая задержка перед запуском тура, чтобы все элементы успели отрендериться
    const timer = setTimeout(() => {
      driverObj.drive();
      
      // Добавляем обработчики после запуска тура
      setTimeout(() => {
        attachButtonHandlers();
        
        // Слушаем изменения в DOM для динамически добавляемых кнопок
        const popover = document.querySelector('.driver-popover');
        if (popover) {
          observer = new MutationObserver(() => {
            attachButtonHandlers();
          });
          observer.observe(popover, { childList: true, subtree: true });
        }
      }, 100);
    }, 500);

    // Очистка при размонтировании
    return () => {
      clearTimeout(timer);
      if (observer) {
        observer.disconnect();
      }
      if (driverRef.current) {
        driverRef.current.destroy();
      }
    };
  }, [language, isMobile]);

  // Кнопка дебага для сброса тура (только в development)
  const handleResetTour = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('tour_seen_car_rental');
      window.location.reload();
    }
  };

  return (
    <>
      {/* Кнопка дебага - показываем только в development */}
      {process.env.NODE_ENV === 'development' && (
        <button
          onClick={handleResetTour}
          className="fixed bottom-20 right-4 z-50 px-3 py-1.5 text-xs font-medium text-white bg-red-500/60 hover:bg-red-500/80 backdrop-blur-sm rounded-lg transition-colors"
          aria-label="Reset Tour"
        >
          Reset Tour
        </button>
      )}
    </>
  );
}

