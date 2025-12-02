'use client';

import { useState, useEffect, useRef, RefObject } from 'react';

interface ScrollIndicatorsState {
  showTop: boolean;
  showBottom: boolean;
}

export function useScrollIndicators(
  scrollContainerRef: RefObject<HTMLElement>
): ScrollIndicatorsState {
  const [indicators, setIndicators] = useState<ScrollIndicatorsState>({
    showTop: false,
    showBottom: false,
  });

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const updateIndicators = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const isScrollable = scrollHeight > clientHeight;
      const isAtTop = scrollTop <= 5;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 5;

      setIndicators({
        showTop: isScrollable && !isAtTop,
        showBottom: isScrollable && !isAtBottom,
      });
    };

    updateIndicators();

    container.addEventListener('scroll', updateIndicators, { passive: true });
    window.addEventListener('resize', updateIndicators, { passive: true });

    // Используем ResizeObserver для отслеживания изменений размера контента
    const resizeObserver = new ResizeObserver(updateIndicators);
    resizeObserver.observe(container);

    return () => {
      container.removeEventListener('scroll', updateIndicators);
      window.removeEventListener('resize', updateIndicators);
      resizeObserver.disconnect();
    };
  }, [scrollContainerRef]);

  return indicators;
}

