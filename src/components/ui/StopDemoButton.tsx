'use client';

import { useDemoMode } from '@/context/DemoContext';
import { useLanguage } from '@/context/LanguageContext';
import { useChatPosition } from '@/hooks/useChatPosition';

interface StopDemoButtonProps {
  onStop: () => void;
  className?: string;
  position?: 'desktop' | 'mobile';
}

export function StopDemoButton({ onStop, className = '', position = 'desktop' }: StopDemoButtonProps) {
  const { isDemoMode } = useDemoMode();
  const { t } = useLanguage();
  const chatPosition = useChatPosition();

  if (!isDemoMode) {
    return null;
  }

  // Для desktop используем позицию чата, для mobile - центр экрана
  const getPositionStyle = () => {
    const translateY = isDemoMode ? 'translateY(0)' : 'translateY(0.5rem)';
    
    if (position === 'desktop' && chatPosition) {
      return {
        left: `${chatPosition.center}px`,
        transform: `translateX(-50%) ${translateY}`,
      };
    }
    return {
      left: '50%',
      transform: `translateX(-50%) ${translateY}`,
    };
  };

  const positionClasses = position === 'desktop' 
    ? 'fixed bottom-24' 
    : 'fixed bottom-20';

  const opacityClasses = isDemoMode 
    ? 'opacity-100 pointer-events-auto' 
    : 'opacity-0 pointer-events-none';

  const buttonClasses = position === 'desktop'
    ? 'px-4 py-2 text-white/80 hover:text-white text-xs font-medium rounded-full border border-yellow-400/30 hover:border-yellow-400/50 bg-black/60 backdrop-blur-sm hover:bg-black/80 transition-all duration-200 whitespace-nowrap'
    : 'px-5 py-2.5 text-white/80 hover:text-white text-sm font-medium rounded-full border border-yellow-400/30 hover:border-yellow-400/50 bg-black/60 backdrop-blur-sm hover:bg-black/80 transition-all duration-200 whitespace-nowrap';

  return (
    <div 
      className={`${positionClasses} ${opacityClasses} flex justify-center transition-all duration-700 ease-in-out z-50 ${className}`}
      style={getPositionStyle()}
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

