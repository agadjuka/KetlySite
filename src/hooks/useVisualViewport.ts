'use client';

import { useEffect, useState } from 'react';

export function useVisualViewport() {
  // 1. Инициализируем сразу 100%, чтобы не было скачка с 0
  const [viewportHeight, setViewportHeight] = useState<number | string>('100%');

  useEffect(() => {
    // Проверка на клиент
    if (typeof window === 'undefined' || !window.visualViewport) return;

    const updateHeight = () => {
      // 2. Берем высоту именно визуального вьюпорта (он учитывает клавиатуру)
      // Округляем, чтобы избежать дробных пикселей, которые мылят текст
      const height = Math.round(window.visualViewport!.height);
      setViewportHeight(height);
      
      // 3. Хак для iOS: скроллим "подложку" в 0, чтобы контент не уезжал
      window.scrollTo(0, 0);
    };

    window.visualViewport.addEventListener('resize', updateHeight);
    window.visualViewport.addEventListener('scroll', updateHeight); // Важно для iOS

    // Вызываем один раз сразу
    updateHeight();

    return () => {
      window.visualViewport?.removeEventListener('resize', updateHeight);
      window.visualViewport?.removeEventListener('scroll', updateHeight);
    };
  }, []);

  return viewportHeight;
}
