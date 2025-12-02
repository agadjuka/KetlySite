'use client';

import { useEffect, useState } from 'react';

/**
 * Хук для отслеживания реальной высоты viewport на мобильных устройствах
 * при открытии/закрытии клавиатуры
 */
export function useViewportHeight() {
  const [viewportHeight, setViewportHeight] = useState(0);

  useEffect(() => {
    // Устанавливаем начальную высоту
    const updateHeight = () => {
      // Используем window.innerHeight вместо 100vh для точного измерения
      setViewportHeight(window.innerHeight);
    };

    // Устанавливаем начальную высоту
    updateHeight();

    // Слушаем изменения размера окна (включая открытие/закрытие клавиатуры)
    window.addEventListener('resize', updateHeight);
    window.addEventListener('orientationchange', updateHeight);

    // Для iOS Safari - слушаем изменения видимой области
    const visualViewport = window.visualViewport;
    if (visualViewport) {
      visualViewport.addEventListener('resize', updateHeight);
    }

    return () => {
      window.removeEventListener('resize', updateHeight);
      window.removeEventListener('orientationchange', updateHeight);
      if (visualViewport) {
        visualViewport.removeEventListener('resize', updateHeight);
      }
    };
  }, []);

  return viewportHeight;
}








