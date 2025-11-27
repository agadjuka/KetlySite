'use client';

import { useEffect, useRef } from 'react';

export function useMobileViewportFix() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Работаем только на клиенте и если есть visualViewport
    if (typeof window === 'undefined' || !window.visualViewport) return;

    const handleResize = () => {
      const viewport = window.visualViewport!;
      const container = containerRef.current;
      
      if (container) {
        // 1. Жестко задаем высоту контейнера равной видимой части экрана
        container.style.height = `${viewport.height}px`;
        
        // 2. Жестко скроллим страницу в начало, чтобы убрать сдвиг браузера
        // Используем requestAnimationFrame, чтобы перебить нативный скролл
        requestAnimationFrame(() => {
          window.scrollTo(0, 0);
          document.body.scrollTop = 0;
        });
      }
    };

    window.visualViewport.addEventListener('resize', handleResize);
    window.visualViewport.addEventListener('scroll', handleResize);

    // Инициализация
    handleResize();

    return () => {
      window.visualViewport?.removeEventListener('resize', handleResize);
      window.visualViewport?.removeEventListener('scroll', handleResize);
    };
  }, []);

  return containerRef;
}

