'use client';

/**
 * Анимированные круги, расходящиеся из центра героя (ripple effect).
 * Используется только на главной в Hero-секции.
 */
export function HeroRippleCircles() {
  const delays = [0, 1, 2, 3];

  return (
    <div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none z-0"
      aria-hidden
    >
      {delays.map((delay) => (
        <div
          key={delay}
          className="hero-ripple-circle w-[200px] h-[200px] animate-ripple-out"
          style={{ animationDelay: `${delay}s` }}
        />
      ))}
    </div>
  );
}
