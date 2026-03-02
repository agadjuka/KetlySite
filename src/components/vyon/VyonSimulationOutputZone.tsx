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

const PHRASE_DURATION_MS = 6000;
const PHRASE_ANIMATION_MS = 450;

export type SimulationOutputStatus = 'awaiting' | 'rendering' | 'ready';

export interface VyonSimulationOutputZoneProps {
  /** Текущий статус: ожидание, рендер, результат готов */
  status?: SimulationOutputStatus;
  /** URL готового изображения (при status === 'ready') */
  resultImageUrl?: string | null;
  /** Сообщение об ошибке (показывается при статусе рендера, если запрос упал) */
  errorMessage?: string | null;
  /** Класс контейнера */
  className?: string;
}

export function VyonSimulationOutputZone({
  status = 'awaiting',
  resultImageUrl = null,
  errorMessage = null,
  className = '',
}: VyonSimulationOutputZoneProps) {
  const showAwaiting = status === 'awaiting' || (status === 'rendering' && !errorMessage);
  const showError = status === 'rendering' && errorMessage;
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (status !== 'rendering') return;
    intervalRef.current = setInterval(() => {
      setIsTransitioning(true);
      timeoutRef.current = setTimeout(() => {
        setPhraseIndex((prev) => (prev + 1) % RENDERING_PHRASES.length);
        setIsTransitioning(false);
        timeoutRef.current = null;
      }, PHRASE_ANIMATION_MS);
    }, PHRASE_DURATION_MS);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [status]);

  return (
    <div
      className={`relative bg-neutral-900/70 lg:bg-neutral-900/90 overflow-hidden border-t lg:border-t-0 lg:border-l border-white/5 flex items-center justify-center min-h-[320px] lg:min-h-0 w-full h-full min-w-0 ${className}`}
      aria-live="polite"
      aria-label="Зона вывода нейросетевого рендера"
    >
      {/* Центральный контент — на всю ширину правой панели, без обрезки */}
      <div className="relative z-20 text-center flex flex-col items-center gap-4 w-full min-w-0 px-2 sm:px-3">
        {showAwaiting && (
          <>
            <p className="text-sm font-mono uppercase tracking-widest text-accent-gold">
              {status === 'rendering' ? 'Preparing your look…' : 'AWAITING INPUT'}
            </p>
            {/* Фиксированный контейнер — высота и overflow не меняются, ширина на всю панель */}
            <div className="relative h-8 w-full min-w-0 overflow-hidden">
              {status === 'rendering' ? (
                isTransitioning ? (
                  <>
                    <p
                      className="absolute top-0 left-0 right-0 h-8 flex items-center justify-center text-xs font-mono text-neutral-500 leading-relaxed text-center whitespace-nowrap vyon-phrase-slide-out-down"
                      aria-hidden
                    >
                      {RENDERING_PHRASES[phraseIndex]}
                    </p>
                    <p
                      className="absolute top-0 left-0 right-0 h-8 flex items-center justify-center text-xs font-mono text-neutral-500 leading-relaxed text-center whitespace-nowrap vyon-phrase-slide-in-from-top"
                      aria-hidden
                    >
                      {RENDERING_PHRASES[(phraseIndex + 1) % RENDERING_PHRASES.length]}
                    </p>
                  </>
                ) : (
                  <p className="absolute top-0 left-0 right-0 h-8 flex items-center justify-center text-xs font-mono text-neutral-500 leading-relaxed text-center whitespace-nowrap">
                    {RENDERING_PHRASES[phraseIndex]}
                  </p>
                )
              ) : (
                <p className="absolute top-0 left-0 right-0 h-8 flex items-center justify-center text-xs font-mono text-neutral-500 leading-relaxed text-center whitespace-nowrap">
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
          <div className="relative w-fit max-w-full rounded-2xl overflow-hidden border-2 border-accent-gold shadow-[0_0_40px_rgba(191,161,95,0.25)]">
            <img
              src={resultImageUrl}
              alt="Сгенерированный образ"
              className="block max-w-[360px] sm:max-w-[420px] max-h-[75vh] w-auto h-auto"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-accent-gold/20 via-transparent to-transparent opacity-50 pointer-events-none" />
          </div>
        )}
        {showError && (
          <div className="text-center space-y-2">
            <p className="text-sm font-mono text-red-400/90">Ошибка</p>
            <p className="text-xs font-mono text-neutral-500 max-w-sm">{errorMessage}</p>
          </div>
        )}
      </div>
    </div>
  );
}
