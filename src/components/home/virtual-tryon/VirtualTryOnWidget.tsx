'use client';

import { useCompareSlider } from './useCompareSlider';
import { useGarmentSelection } from './useGarmentSelection';
import { CompareSlider } from './CompareSlider';
import { GarmentSwatches } from './GarmentSwatches';
import {
  VIRTUAL_TRYON_IMAGES,
  VIRTUAL_TRYON_GARMENTS,
} from './virtualTryOnConfig';

export function VirtualTryOnWidget() {
  const { percent, setFromEvent } = useCompareSlider(50);
  const { selectedIndex, select } = useGarmentSelection(0);

  const currentResult = VIRTUAL_TRYON_GARMENTS[selectedIndex]?.resultImage ?? '';

  return (
    <div className="glass-panel rounded-xl overflow-hidden shadow-2xl p-4 lg:p-6 border border-amber-500/20">
      {/* Блок сравнения — сохраняем пропорции как у текущего виджета (чуть вытянут вверх) */}
      <div className="relative w-full aspect-[4/5] bg-neutral-900 rounded-lg overflow-hidden">
        <CompareSlider
          originalImage={VIRTUAL_TRYON_IMAGES.original}
          resultImage={currentResult}
          percent={percent}
          setFromEvent={setFromEvent}
          labelOriginal="ORIGINAL_IDENTITY"
          labelResult="NEURAL_RENDER"
          className="absolute inset-0"
        />
      </div>

      {/* Свотчи одежды */}
      <div className="mt-4 sm:mt-6">
        <GarmentSwatches
          garments={VIRTUAL_TRYON_GARMENTS}
          selectedIndex={selectedIndex}
          onSelect={select}
        />
      </div>

      {/* Футер как в референсе */}
      <div className="mt-6 sm:mt-8 flex flex-wrap justify-between items-center gap-4 px-1">
        <div className="flex gap-6 sm:gap-8">
          <div className="flex flex-col gap-1">
            <span className="text-[9px] text-neutral-500 uppercase tracking-wider">
              Identity Mapping
            </span>
            <span className="text-xs font-mono text-white tracking-widest">
              99.8% Match
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[9px] text-neutral-500 uppercase tracking-wider">
              Physics Solve
            </span>
            <span className="text-xs font-mono text-white tracking-widest">
              Active_14ms
            </span>
          </div>
        </div>
        <div className="text-right">
          <span className="block text-[10px] font-mono text-amber-500/80 uppercase tracking-widest font-bold">
            VYON SYSTEM V.4
          </span>
        </div>
      </div>
    </div>
  );
}
