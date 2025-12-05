'use client';

import { useLanguage } from '@/context/LanguageContext';
import { LanguageToggleButton } from '@/components/ui/LanguageToggleButton';
import { cardBaseStyles } from '@/lib/cardStyles';

export function AgentProfileCarRental() {
  const { t } = useLanguage();

  return (
    <div className={`${cardBaseStyles} overflow-hidden flex flex-col p-5 shadow-xl shrink-0 relative`}>
      <LanguageToggleButton
        variant="desktop"
        className="absolute top-0 right-0 z-10"
      />
      <div className="flex items-center gap-4 mb-1">
        <div className="w-12 h-12 flex items-center justify-center">
          <img src="/android-chrome-512x512.png" alt="Logo" className="w-full h-full object-contain" />
        </div>
        <div>
          <h3 className="text-white font-medium">Car Rental Assistant</h3>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-xs text-zinc-500" suppressHydrationWarning>{t.chat.agentSubtitle}</span>
          </div>
        </div>
      </div>
    </div>
  );
}






