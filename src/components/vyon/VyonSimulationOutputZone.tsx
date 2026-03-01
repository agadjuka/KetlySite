'use client';

/**
 * Правая зона Simulation Sandbox: превью нейросетевого рендера.
 * Состояние «ожидание ввода» — по макету VYON (code.html).
 * Отображает только UI зоны вывода; данные приходят снаружи (Dependency Inversion).
 */

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

  return (
    <div
      className={`relative bg-neutral-900/40 overflow-hidden border-t lg:border-t-0 lg:border-l border-white/5 flex items-center justify-center min-h-[320px] lg:min-h-0 ${className}`}
      aria-live="polite"
      aria-label="Зона вывода нейросетевого рендера"
    >
      {/* Центральный контент */}
      <div className="relative z-20 text-center flex flex-col items-center gap-4 max-w-sm mx-auto px-6">
        {showAwaiting && (
          <>
            <p className="text-sm font-mono uppercase tracking-widest text-accent-gold">
              {status === 'rendering' ? 'RENDERING…' : 'AWAITING INPUT'}
            </p>
            <p className="text-xs font-mono text-neutral-500 leading-relaxed max-w-[280px]">
              {status === 'rendering'
                ? 'Neural render in progress. Lighting and physics sync active.'
                : 'Upload your portrait and select a garment to initiate the Try-On.'}
            </p>
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
