'use client';

import { RefObject } from 'react';

interface ScrollArrowsProps {
  containerRef: RefObject<HTMLElement>;
  showTop: boolean;
  showBottom: boolean;
}

export function ScrollArrows({ containerRef, showTop, showBottom }: ScrollArrowsProps) {
  const scroll = (direction: 'up' | 'down') => {
    const container = containerRef.current;
    if (!container) return;

    const scrollAmount = 120;
    const targetScroll = direction === 'down' 
      ? container.scrollTop + scrollAmount
      : container.scrollTop - scrollAmount;

    container.scrollTo({
      top: targetScroll,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {/* Стрелка вверх */}
      {showTop && (
        <div className="absolute top-[40px] left-0 right-0 z-10 pointer-events-none">
          {/* Градиент сверху */}
          <div className="h-10 bg-gradient-to-b from-black/80 via-black/50 to-transparent" />
          {/* Стрелка - размещена выше скроллируемого контейнера, под заголовком */}
          <button
            onClick={() => scroll('up')}
            className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-auto
              w-14 h-5 flex items-center justify-center
              bg-zinc-900/70 hover:bg-zinc-800/90 active:bg-zinc-700/95
              backdrop-blur-md border border-white/10 hover:border-white/20
              rounded
              transition-all duration-300 ease-out
              hover:scale-105 active:scale-100
              hover:shadow-lg hover:shadow-black/30
              group"
            aria-label="Прокрутить вверх"
          >
            <svg
              className="w-3 h-3 text-zinc-400 group-hover:text-white transition-colors duration-300"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <path d="M18 15l-6-6-6 6" />
            </svg>
          </button>
        </div>
      )}

      {/* Стрелка вниз */}
      {showBottom && (
        <div className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none overflow-hidden rounded-b-2xl">
          {/* Градиент снизу - накладывается на скроллируемый контент */}
          <div className="h-12 bg-gradient-to-t from-black/90 via-black/60 to-transparent pointer-events-none" />
          {/* Стрелка - плоская, размещена в самом низу панели, ниже всех кнопок */}
          <button
            onClick={() => scroll('down')}
            className="absolute bottom-2 left-1/2 -translate-x-1/2 pointer-events-auto
              w-14 h-5 flex items-center justify-center
              bg-zinc-900/80 hover:bg-zinc-800/95 active:bg-zinc-700/100
              backdrop-blur-md border border-white/10 hover:border-white/20
              rounded
              transition-all duration-300 ease-out
              hover:scale-105 active:scale-100
              hover:shadow-lg hover:shadow-black/30
              group"
            aria-label="Прокрутить вниз"
          >
            <svg
              className="w-3 h-3 text-zinc-400 group-hover:text-white transition-colors duration-300"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
        </div>
      )}
    </>
  );
}

