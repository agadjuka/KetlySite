'use client';

import { useEffect, useRef, useState } from 'react';
import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';
import { useLanguage } from '@/context/LanguageContext';
import { TOUR_STEPS } from '@/lib/tourContent';
import { carRentalConfig } from '../config';

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
    // Проверяем, был ли тур уже показан для любого агента
    // Используем общий ключ для всех агентов, чтобы тур показывался только один раз
    const tourSeen = typeof window !== 'undefined' 
      ? localStorage.getItem('tour_seen_agent') 
      : null;

    if (tourSeen) {
      return; // Тур уже был показан
    }

    // Определяем тип устройства
    const isMobile = window.innerWidth < 768;

    // Получаем тексты тура из конфига агента
    const texts = carRentalConfig.tour[language];

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
        // Используем общий ключ для всех агентов
        const tourKey = 'tour_seen_agent';
        localStorage.setItem(tourKey, 'true');
        // Диспатчим событие о завершении тура для текущего агента
        window.dispatchEvent(new Event(`tour-completed-${carRentalConfig.tourStorageKey}`));
      }
    };

    // Инициализируем Driver.js
    const driverObj = driver({
      showProgress: true,
      allowClose: true,
      overlayOpacity: 0.85,
      nextBtnText: texts.buttons.next,
      prevBtnText: texts.buttons.prev,
      doneBtnText: texts.buttons.done,
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
  }, [language, isMobile]);

  return null;
}

