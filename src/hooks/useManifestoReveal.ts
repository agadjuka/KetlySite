'use client';

import { useEffect } from 'react';

const SELECTOR = '.manifesto-reveal';
const CLASS_IN_VIEW = 'in-view';
const THRESHOLD = 0.2;

export function useManifestoReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(CLASS_IN_VIEW);
          }
        });
      },
      { threshold: THRESHOLD }
    );

    const elements = document.querySelectorAll(SELECTOR);
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
}
