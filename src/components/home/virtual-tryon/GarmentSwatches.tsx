'use client';

import type { GarmentItem } from './virtualTryOnConfig';

interface GarmentSwatchesProps {
  garments: GarmentItem[];
  selectedIndex: number;
  onSelect: (index: number) => void;
  className?: string;
}

export function GarmentSwatches({
  garments,
  selectedIndex,
  onSelect,
  className = '',
}: GarmentSwatchesProps) {
  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-500">
          Curated Collection
        </span>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
          <span className="text-[10px] font-mono uppercase text-amber-500/80">
            Active Selection
          </span>
        </div>
      </div>
      <div className="flex justify-center gap-2">
        {garments.map((g, index) => {
          const isActive = selectedIndex === index;
          return (
            <button
              key={g.id}
              type="button"
              onClick={() => onSelect(index)}
              className={`garment-swatch group flex flex-col items-center gap-1.5 p-2 bg-white/5 border rounded-lg text-center transition-all duration-300 hover:translate-y-[-2px] relative w-[72px] sm:w-[80px] ${
                isActive
                  ? 'border-amber-500/50 bg-amber-500/10'
                  : 'border-white/10 hover:border-amber-500/30'
              }`}
            >
              <div className="w-full aspect-square bg-neutral-800 rounded overflow-hidden border border-white/10 flex-shrink-0">
                <img
                  alt={g.labelLong}
                  className={`w-full h-full object-cover transition-opacity ${
                    isActive ? 'opacity-100' : 'opacity-80 group-hover:opacity-100'
                  }`}
                  src={g.garmentImage}
                />
              </div>
              <span
                className={`w-full text-[10px] sm:text-[11px] font-display leading-tight text-white group-hover:text-amber-200 transition-colors break-words ${
                  isActive ? 'text-amber-100 font-medium' : 'font-normal'
                }`}
              >
                {g.labelLong}
              </span>
              {isActive && (
                <span
                  className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-amber-500"
                  aria-hidden
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
