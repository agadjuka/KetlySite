'use client';

import { useDemoMode } from '@/context/DemoContext';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

export function AmbientMeshGradients() {
  const { isDemoMode } = useDemoMode();
  const pathname = usePathname();
  
  const isCarRentalPage = useMemo(() => {
    return pathname?.includes('/car-rental') ?? false;
  }, [pathname]);

  // Определяем цвета градиентов в зависимости от страницы
  const getGradientColors = () => {
    if (isCarRentalPage) {
      // Красные градиенты для CarRental - насыщенный глубокий красный
      return {
        gradient1: 'rgba(185, 28, 28, 0.18)',
        gradient2: 'rgba(185, 28, 28, 0.25)',
      };
    } else if (isDemoMode) {
      // Желтые градиенты для демо-режима
      return {
        gradient1: 'rgba(250, 204, 21, 0.2)',
        gradient2: 'rgba(250, 204, 21, 0.3)',
      };
    } else {
      // Синие градиенты для обычного режима
      return {
        gradient1: 'rgba(37, 99, 235, 0.1)',
        gradient2: 'rgba(37, 99, 235, 0.2)',
      };
    }
  };

  const colors = getGradientColors();

  return (
    <>
      {/* Градиент 1 - левый верхний */}
      <div 
        key="gradient-1"
        className="absolute top-0 left-0 w-[400px] h-[400px] lg:w-[800px] lg:h-[800px] blur-[80px] lg:blur-[120px] rounded-full pointer-events-none -translate-x-1/2 -translate-y-3/4 lg:-translate-y-1/2 mix-blend-screen transition-all duration-1000 ease-in-out"
        style={{
          backgroundColor: colors.gradient1,
          transition: 'background-color 1000ms ease-in-out, opacity 1000ms ease-in-out',
        }}
      />
      {/* Градиент 2 - правый нижний */}
      <div 
        key="gradient-2"
        className="absolute bottom-0 right-0 w-[400px] h-[400px] lg:w-[800px] lg:h-[800px] blur-[80px] lg:blur-[120px] rounded-full pointer-events-none translate-x-1/3 translate-y-0 lg:translate-y-1/3 mix-blend-screen transition-all duration-1000 ease-in-out"
        style={{
          backgroundColor: colors.gradient2,
          transition: 'background-color 1000ms ease-in-out, opacity 1000ms ease-in-out',
        }}
      />
    </>
  );
}








