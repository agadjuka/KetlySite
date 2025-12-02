'use client';

import { useEffect, useState, RefObject } from 'react';

/**
 * Хук для адаптивной компоновки блока быстрых сообщений на десктопе.
 * Если блок обрезается (есть скролл), возвращает true для расширения левой колонки.
 */
export function useAdaptiveQuickActionsLayout(
  quickActionsRef: RefObject<HTMLElement>
): boolean {
  const [needsExpansion, setNeedsExpansion] = useState(false);

  useEffect(() => {
    const checkOverflow = () => {
      if (!quickActionsRef.current) {
        setNeedsExpansion(false);
        return;
      }

      const element = quickActionsRef.current;
      // Проверяем, есть ли скролл в контейнере с кнопками
      const scrollContainer = element.querySelector('[data-quick-actions-scroll]') as HTMLElement;
      
      if (!scrollContainer) {
        setNeedsExpansion(false);
        return;
      }

      // Если есть скролл (с небольшим порогом для учета погрешностей), значит контент обрезается
      const hasScroll = scrollContainer.scrollHeight > scrollContainer.clientHeight + 2;
      setNeedsExpansion(hasScroll);
    };

    // Проверяем при монтировании
    checkOverflow();

    // Используем ResizeObserver для отслеживания изменений размера
    const resizeObserver = new ResizeObserver(() => {
      // Небольшая задержка для корректного расчета после изменения размера
      setTimeout(checkOverflow, 50);
    });

    if (quickActionsRef.current) {
      const scrollContainer = quickActionsRef.current.querySelector('[data-quick-actions-scroll]') as HTMLElement;
      if (scrollContainer) {
        resizeObserver.observe(scrollContainer);
        // Также наблюдаем за самим контейнером панели для отслеживания изменений высоты
        resizeObserver.observe(quickActionsRef.current);
      }
    }

    // Также отслеживаем изменения размера окна
    window.addEventListener('resize', checkOverflow);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', checkOverflow);
    };
  }, [quickActionsRef]);

  return needsExpansion;
}

