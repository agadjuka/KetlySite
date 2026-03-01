'use client';

import { useState, useEffect, useRef } from 'react';

/**
 * Правая зона Simulation Sandbox: превью нейросетевого рендера.
 * Состояние «ожидание ввода» — по макету VYON (code.html).
 * Отображает только UI зоны вывода; данные приходят снаружи (Dependency Inversion).
 */

const RENDERING_PHRASES = [
  'Measuring every pixel of your style…',
  'Dressing your digital twin…',
  'Tailoring the fit just for you…',
  'Simulating fabric movement…',
  'Aligning colors, curves, and confidence…',
  'Polishing the final look…',
  'Your new outfit is stepping into reality…',
] as const;

const PHRASE_DURATION_MS = 3500;

export type SimulationOutputStatus = 'awaiting' | 'rendering' | 'ready';

export interface VyonSimulationOutputZoneProps {
  /** Текущий статус: ожидание, рендер, результат готов */
  status?: SimulationOutputStatus;
  /** URL готового изображения (при status === 'ready') */
  resultImageUrl?: string | null;
  /** Класс контейнера */
  className?: string;
}

export function VyonSimulationOutputZone({
  status = 'awaiting',
  resultImageUrl = null,
  className = '',
}: VyonSimulationOutputZoneProps) {
  const showAwaiting = status === 'awaiting' || status === 'rendering';
  const [phraseIndex, setPhraseIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (status !== 'rendering') return;
    intervalRef.current = setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % RENDERING_PHRASES.length);
    }, PHRASE_DURATION_MS);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [status]);

  return (
    <div
      className={`relative bg-neutral-900/70 lg:bg-neutral-900/90 overflow-hidden border-t lg:border-t-0 lg:border-l border-white/5 flex items-center justify-center min-h-[320px] lg:min-h-0 w-full h-full min-w-0 ${className}`}
      aria-live="polite"
      aria-label="Зона вывода нейросетевого рендера"
    >
      {/* Центральный контент */}
      <div className="relative z-20 text-center flex flex-col items-center gap-4 max-w-md mx-auto px-6">
        {showAwaiting && (
          <>
            <p className="text-sm font-mono uppercase tracking-widest text-accent-gold">
              {status === 'rendering' ? 'Preparing your look…' : 'AWAITING INPUT'}
            </p>
            <div className="h-8 flex items-center justify-center w-full max-w-[420px]">
              {status === 'rendering' ? (
                <p className="text-xs font-mono text-neutral-500 leading-relaxed text-center whitespace-nowrap">
                  {RENDERING_PHRASES[phraseIndex]}
                </p>
              ) : (
                <p className="text-xs font-mono text-neutral-500 leading-relaxed text-center whitespace-nowrap">
                  Upload your portrait and select a garment to initiate the Try-On.
                </p>
              )}
            </div>
            <div className="mt-4 flex gap-1">
              <span className="w-1 h-1 bg-accent-gold rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
              <span className="w-1 h-1 bg-accent-gold rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
              <span className="w-1 h-1 bg-accent-gold rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
            </div>
          </>
        )}
        {status === 'ready' && resultImageUrl && (
          <div className="relative w-full aspect-square max-w-[280px] rounded-full overflow-hidden border-2 border-accent-gold shadow-[0_0_40px_rgba(191,161,95,0.25)]">
            <img
              src={resultImageUrl}
              alt="Сгенерированный образ"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-accent-gold/20 via-transparent to-transparent opacity-50 pointer-events-none" />
          </div>
        )}
      </div>
    </div>
  );
}
