'use client';

import { useEffect } from 'react';

const SELECTOR = '[data-scroll-trigger]';
const CLASS_VISIBLE = 'is-visible';
const THRESHOLD = 0.15;

/**
 * Подписывает элементы с data-scroll-trigger на Intersection Observer.
 * При попадании в viewport добавляет класс is-visible для запуска scroll-reveal анимаций.
 */
export function useScrollTriggerReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(CLASS_VISIBLE);
          }
        });
      },
      { root: null, rootMargin: '0px', threshold: THRESHOLD }
    );

    const elements = document.querySelectorAll(SELECTOR);
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
}
