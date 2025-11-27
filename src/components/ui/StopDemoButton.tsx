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
    ? 'absolute bottom-[108px] left-0 right-0' 
    : 'absolute bottom-4 left-0 right-0';

  return (
    <div 
      className={`${positionClasses} flex justify-center transition-all duration-700 ease-in-out z-20 px-3 sm:px-4 ${
        isDemoMode 
          ? 'opacity-100 translate-y-0 pointer-events-auto' 
          : 'opacity-0 translate-y-2 pointer-events-none'
      } ${className}`}
    >
      <button
        onClick={onStop}
        className="px-4 py-1.5 text-white/80 hover:text-white text-xs font-medium rounded-lg border border-yellow-400/30 hover:border-yellow-400/50 bg-black/60 backdrop-blur-sm hover:bg-black/80 transition-all duration-200"
        suppressHydrationWarning
      >
        {t.chat.stopButton}
      </button>
    </div>
  );
}

