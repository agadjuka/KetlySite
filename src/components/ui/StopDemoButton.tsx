'use client';

import { useDemoMode } from '@/context/DemoContext';
import { useLanguage } from '@/context/LanguageContext';

interface StopDemoButtonProps {
  onStop: () => void;
  className?: string;
  position?: 'desktop' | 'mobile';
}

export function StopDemoButton({ onStop, className = '', position = 'desktop' }: StopDemoButtonProps) {
  const { isDemoMode } = useDemoMode();
  const { t } = useLanguage();

  if (!isDemoMode) {
    return null;
  }

  const positionClasses = position === 'desktop' 
    ? 'fixed bottom-24 left-1/2' 
    : 'fixed bottom-20 left-1/2';

  const transformClasses = position === 'desktop'
    ? isDemoMode 
      ? 'opacity-100 -translate-x-1/2 translate-y-0 pointer-events-auto' 
      : 'opacity-0 -translate-x-1/2 translate-y-2 pointer-events-none'
    : isDemoMode 
      ? 'opacity-100 -translate-x-1/2 translate-y-0 pointer-events-auto' 
      : 'opacity-0 -translate-x-1/2 translate-y-2 pointer-events-none';

  const buttonClasses = position === 'desktop'
    ? 'px-4 py-2 text-white/80 hover:text-white text-xs font-medium rounded-full border border-yellow-400/30 hover:border-yellow-400/50 bg-black/60 backdrop-blur-sm hover:bg-black/80 transition-all duration-200 whitespace-nowrap'
    : 'px-5 py-2.5 text-white/80 hover:text-white text-sm font-medium rounded-full border border-yellow-400/30 hover:border-yellow-400/50 bg-black/60 backdrop-blur-sm hover:bg-black/80 transition-all duration-200 whitespace-nowrap';

  return (
    <div 
      className={`${positionClasses} ${transformClasses} flex justify-center transition-all duration-700 ease-in-out z-50 ${className}`}
    >
      <button
        onClick={onStop}
        className={buttonClasses}
        suppressHydrationWarning
      >
        {t.chat.stopButton}
      </button>
    </div>
  );
}

