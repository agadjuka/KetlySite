'use client';

import { useEffect, useState } from 'react';

export const useVisualViewport = () => {
  // По умолчанию 100dvh для SSR и десктопа
  const [height, setHeight] = useState<string>('100dvh');

  useEffect(() => {
    // Проверка, что мы в браузере и это мобилка (или есть visualViewport)
    if (typeof window === 'undefined' || !window.visualViewport) return;

    const handleResize = () => {
      // Жестко берем высоту в пикселях.
      // Это единственное, что Safari слушает мгновенно при открытии клавиатуры.
      setHeight(`${window.visualViewport!.height}px`);
      
      // Хак: скроллим страницу в начало (0,0), чтобы убрать "вылет" хедера
      window.scrollTo(0, 0);
    };

    // Слушаем изменение размеров (открытие клавиатуры)
    window.visualViewport.addEventListener('resize', handleResize);
    window.visualViewport.addEventListener('scroll', handleResize); // Иногда нужно на скролл

    // Инициализация
    handleResize();

    return () => {
      window.visualViewport?.removeEventListener('resize', handleResize);
      window.visualViewport?.removeEventListener('scroll', handleResize);
    };
  }, []);

  return height;
};
