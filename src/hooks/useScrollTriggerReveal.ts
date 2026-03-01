'use client';

import { useEffect } from 'react';

const SELECTOR = '[data-scroll-trigger]';
const CLASS_VISIBLE = 'is-visible';

const DESKTOP = { threshold: 0.15, rootMargin: '0px' } as const;
const MOBILE  = { threshold: 0.08, rootMargin: '0px 0px -8% 0px', delayMs: 80 } as const;

function isMobile() {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 768;
}

/**
 * Подписывает элементы с data-scroll-trigger на Intersection Observer.
 * При попадании в viewport добавляет класс is-visible для scroll-reveal анимаций.
 * На мобильном — requestAnimationFrame + небольшая задержка, чтобы анимация не стартовала
 * в момент инерционного скролла и проходила плавно.
 */
export function useScrollTriggerReveal() {
  useEffect(() => {
    const mobile = isMobile();
    const cfg = mobile ? MOBILE : DESKTOP;
    const pending = new Map<Element, number>();

    const reveal = (el: Element) => {
      if (el.classList.contains(CLASS_VISIBLE)) return;
      el.classList.add(CLASS_VISIBLE);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          if (el.classList.contains(CLASS_VISIBLE)) return;

          if (mobile) {
            const raf = requestAnimationFrame(() => {
              const t = window.setTimeout(() => {
                reveal(el);
                pending.delete(el);
              }, MOBILE.delayMs);
              pending.set(el, t);
            });
            pending.set(el, raf);
          } else {
            reveal(el);
          }
        });
      },
      { root: null, rootMargin: cfg.rootMargin, threshold: cfg.threshold }
    );

    document.querySelectorAll(SELECTOR).forEach((el) => observer.observe(el));

    return () => {
      pending.forEach((id) => {
        clearTimeout(id);
        cancelAnimationFrame(id);
      });
      observer.disconnect();
    };
  }, []);
}
