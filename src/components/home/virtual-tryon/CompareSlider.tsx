'use client';

import { useRef, useCallback } from 'react';
import type { useCompareSlider } from './useCompareSlider';

interface CompareSliderProps {
  originalImage: string;
  resultImage: string;
  percent: number;
  setFromEvent: ReturnType<typeof useCompareSlider>['setFromEvent'];
  labelOriginal?: string;
  labelResult?: string;
  className?: string;
}

export function CompareSlider({
  originalImage,
  resultImage,
  percent,
  setFromEvent,
  labelOriginal = 'ORIGINAL_IDENTITY',
  labelResult = 'NEURAL_RENDER',
  className = '',
}: CompareSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback(
    (clientX: number) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) setFromEvent(clientX, rect);
    },
    [setFromEvent]
  );

  const onMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      handleMove(e.clientX);
      const onMouseMove = (e: MouseEvent) => handleMove(e.clientX);
      const onMouseUp = () => {
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);
      };
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
    },
    [handleMove]
  );

  const onTouchStart = useCallback(
    (e: React.TouchEvent) => {
      const touch = e.touches[0];
      if (touch) handleMove(touch.clientX);
      const onTouchMove = (e: TouchEvent) => {
        const t = e.touches[0];
        if (t) handleMove(t.clientX);
      };
      const onTouchEnd = () => {
        window.removeEventListener('touchmove', onTouchMove);
        window.removeEventListener('touchend', onTouchEnd);
      };
      window.addEventListener('touchmove', onTouchMove, { passive: true });
      window.addEventListener('touchend', onTouchEnd);
    },
    [handleMove]
  );

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full bg-neutral-900 rounded-lg overflow-hidden border border-white/5 ${className}`}
    >
      <div
        className="absolute inset-0 z-10 bg-cover bg-center"
        style={{ backgroundImage: `url('${originalImage}')` }}
      >
        <div className="absolute top-4 left-4 z-20">
          <span className="bg-black/60 backdrop-blur-md px-3 py-1 rounded text-[9px] font-mono tracking-widest text-white border border-white/10 uppercase">
            [ {labelOriginal} ]
          </span>
        </div>
      </div>
      <div
        className="absolute inset-0 z-20 bg-cover bg-center"
        style={{
          backgroundImage: `url('${resultImage}')`,
          clipPath: `inset(0 0 0 ${percent}%)`,
        }}
      >
        <div className="absolute top-4 right-4 z-20">
          <span className="bg-amber-500/80 backdrop-blur-md px-3 py-1 rounded text-[9px] font-mono tracking-widest text-black border border-amber-400/50 uppercase">
            [ {labelResult} ]
          </span>
        </div>
      </div>
      <div
        className="absolute top-0 bottom-0 z-30 w-0.5 bg-amber-500 cursor-ew-resize shadow-[0_0_15px_rgba(217,119,6,0.8)]"
        style={{ left: `${percent}%` }}
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
        role="slider"
        aria-valuenow={Math.round(percent)}
        aria-valuemin={0}
        aria-valuemax={100}
        tabIndex={0}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-9 bg-[#050505] border-2 border-amber-500 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(217,119,6,0.4)]">
          <span className="material-symbols-outlined text-amber-500 text-lg font-light">
            unfold_more_double
          </span>
        </div>
      </div>
    </div>
  );
}
