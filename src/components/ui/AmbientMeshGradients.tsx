'use client';

import { useDemoMode } from '@/context/DemoContext';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

// Константы цветов для каждого режима
const GRADIENT_COLORS = {
  blue: {
    gradient1: 'rgba(37, 99, 235, 0.1)',
    gradient2: 'rgba(37, 99, 235, 0.2)',
  },
  yellow: {
    gradient1: 'rgba(250, 204, 21, 0.2)',
    gradient2: 'rgba(250, 204, 21, 0.3)',
  },
  red: {
    gradient1: 'rgba(185, 28, 28, 0.18)',
    gradient2: 'rgba(185, 28, 28, 0.25)',
  },
  silver: {
    gradient1: 'rgba(192, 192, 192, 0.15)',
    gradient2: 'rgba(169, 169, 169, 0.22)',
  },
} as const;

// Базовые классы для градиентов (без transition на filter/blur)
const GRADIENT_1_CLASSES = 'absolute top-0 left-0 w-[400px] h-[400px] lg:w-[800px] lg:h-[800px] blur-[80px] lg:blur-[120px] rounded-full pointer-events-none -translate-x-1/2 -translate-y-3/4 lg:-translate-y-1/2 mix-blend-screen';
const GRADIENT_2_CLASSES = 'absolute bottom-0 right-0 w-[400px] h-[400px] lg:w-[800px] lg:h-[800px] blur-[80px] lg:blur-[120px] rounded-full pointer-events-none translate-x-1/3 translate-y-0 lg:translate-y-1/3 mix-blend-screen';

export function AmbientMeshGradients() {
  const { isDemoMode } = useDemoMode();
  const pathname = usePathname();
  
  const isCarRentalPage = useMemo(() => {
    return pathname?.includes('/car-rental') ?? false;
  }, [pathname]);

  const isVelvetSpaPage = useMemo(() => {
    return pathname?.includes('/velvet-spa') ?? false;
  }, [pathname]);

  // Определяем активный режим
  const activeMode = useMemo(() => {
    if (isVelvetSpaPage) return 'silver';
    if (isCarRentalPage) return 'red';
    if (isDemoMode) return 'yellow';
    return 'blue';
  }, [isVelvetSpaPage, isCarRentalPage, isDemoMode]);

  return (
    <>
      {/* === ГРАДИЕНТ 1 - левый верхний === */}
      {/* Синий слой */}
      <div 
        className={GRADIENT_1_CLASSES}
        style={{
          backgroundColor: GRADIENT_COLORS.blue.gradient1,
          opacity: activeMode === 'blue' ? 1 : 0,
          transition: 'opacity 1000ms ease-in-out',
        }}
      />
      {/* Желтый слой */}
      <div 
        className={GRADIENT_1_CLASSES}
        style={{
          backgroundColor: GRADIENT_COLORS.yellow.gradient1,
          opacity: activeMode === 'yellow' ? 1 : 0,
          transition: 'opacity 1000ms ease-in-out',
        }}
      />
      {/* Красный слой */}
      <div 
        className={GRADIENT_1_CLASSES}
        style={{
          backgroundColor: GRADIENT_COLORS.red.gradient1,
          opacity: activeMode === 'red' ? 1 : 0,
          transition: 'opacity 1000ms ease-in-out',
        }}
      />
      {/* Серебристый слой */}
      <div 
        className={GRADIENT_1_CLASSES}
        style={{
          backgroundColor: GRADIENT_COLORS.silver.gradient1,
          opacity: activeMode === 'silver' ? 1 : 0,
          transition: 'opacity 1000ms ease-in-out',
        }}
      />

      {/* === ГРАДИЕНТ 2 - правый нижний === */}
      {/* Синий слой */}
      <div 
        className={GRADIENT_2_CLASSES}
        style={{
          backgroundColor: GRADIENT_COLORS.blue.gradient2,
          opacity: activeMode === 'blue' ? 1 : 0,
          transition: 'opacity 1000ms ease-in-out',
        }}
      />
      {/* Желтый слой */}
      <div 
        className={GRADIENT_2_CLASSES}
        style={{
          backgroundColor: GRADIENT_COLORS.yellow.gradient2,
          opacity: activeMode === 'yellow' ? 1 : 0,
          transition: 'opacity 1000ms ease-in-out',
        }}
      />
      {/* Красный слой */}
      <div 
        className={GRADIENT_2_CLASSES}
        style={{
          backgroundColor: GRADIENT_COLORS.red.gradient2,
          opacity: activeMode === 'red' ? 1 : 0,
          transition: 'opacity 1000ms ease-in-out',
        }}
      />
      {/* Серебристый слой */}
      <div 
        className={GRADIENT_2_CLASSES}
        style={{
          backgroundColor: GRADIENT_COLORS.silver.gradient2,
          opacity: activeMode === 'silver' ? 1 : 0,
          transition: 'opacity 1000ms ease-in-out',
        }}
      />
    </>
  );
}




