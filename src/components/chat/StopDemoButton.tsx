'use client';

import { X } from 'lucide-react';
import { useDemoMode } from '@/context/DemoContext';
import { useLanguage } from '@/context/LanguageContext';

interface StopDemoButtonProps {
  onStop: () => void;
}

export function StopDemoButton({ onStop }: StopDemoButtonProps) {
  const { isDemoMode } = useDemoMode();
  const { t } = useLanguage();

  if (!isDemoMode) {
    return null;
  }

  return (
    <div className="sticky bottom-0 z-20 pb-2 pt-2 bg-gradient-to-t from-black/40 via-black/20 to-transparent pointer-events-none">
      <div className="flex justify-center pointer-events-auto">
        <button
          onClick={onStop}
          className="px-4 py-2 bg-orange-600/90 hover:bg-orange-600 text-white text-sm font-medium rounded-lg border border-orange-500/30 shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2"
        >
          <X className="w-4 h-4" />
          {t.chat.stopButton}
        </button>
      </div>
    </div>
  );
}



