'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { useCompareSlider } from './useCompareSlider';
import { CompareSlider } from './CompareSlider';
import { GarmentSwatches } from './GarmentSwatches';
import {
  VIRTUAL_TRYON_IMAGES,
  VIRTUAL_TRYON_GARMENTS,
} from './virtualTryOnConfig';

const AUTO_ROTATE_MS = 6000;

export function VirtualTryOnWidget() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isSectionInView, setIsSectionInView] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) setIsSectionInView(true);
      },
      { threshold: 0.25 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const { percent, setFromEvent, isIntroPhase } = useCompareSlider(50, isSectionInView);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const autoRotateRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    autoRotateRef.current = setInterval(() => {
      setSelectedIndex((prev) => (prev + 1) % 3);
    }, AUTO_ROTATE_MS);
    return () => {
      if (autoRotateRef.current) clearInterval(autoRotateRef.current);
    };
  }, []);

  const handleSelect = useCallback((index: number) => {
    if (autoRotateRef.current) {
      clearInterval(autoRotateRef.current);
      autoRotateRef.current = null;
    }
    setSelectedIndex(index);
  }, []);

  const stopAutoRotate = useCallback(() => {
    if (autoRotateRef.current) {
      clearInterval(autoRotateRef.current);
      autoRotateRef.current = null;
    }
  }, []);

  const currentResult = VIRTUAL_TRYON_GARMENTS[selectedIndex]?.resultImage ?? '';

  return (
    <div
      ref={sectionRef}
      className="glass-panel rounded-xl overflow-hidden shadow-2xl p-4 lg:p-6 border border-amber-500/20"
    >
      <div className="relative w-full aspect-[4/5] bg-neutral-900 rounded-lg overflow-hidden">
        <CompareSlider
          originalImage={VIRTUAL_TRYON_IMAGES.original}
          resultImage={currentResult}
          percent={percent}
          setFromEvent={setFromEvent}
          isIntroPhase={isIntroPhase}
          onUserInteract={stopAutoRotate}
          labelOriginal="ORIGINAL_IDENTITY"
          labelResult="VYON_RENDER"
          className="absolute inset-0"
        />
      </div>

      <div className="mt-4 sm:mt-6">
        <GarmentSwatches
          garments={VIRTUAL_TRYON_GARMENTS}
          selectedIndex={selectedIndex}
          onSelect={handleSelect}
        />
      </div>
    </div>
  );
}
