'use client';

import { useScrollTriggerReveal } from '@/hooks/useScrollTriggerReveal';

/**
 * Монтирует Intersection Observer для data-scroll-trigger.
 * Добавляет is-visible при появлении в viewport для scroll-reveal анимаций.
 */
export function ScrollRevealObserver() {
  useScrollTriggerReveal();
  return null;
}
