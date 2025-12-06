'use client';

import { useLanguage } from '@/context/LanguageContext';
import { cardBaseStyles } from '@/lib/cardStyles';

export function AgentProfileCarRental() {
  const { t } = useLanguage();

  return (
    <div 
      className={`${cardBaseStyles} overflow-hidden flex flex-col shadow-xl shrink-0 relative`}
      style={{
        paddingTop: 'clamp(0.875rem, 1.6vh, 1.35rem)',
        paddingBottom: 'clamp(0.75rem, 1.5vh, 1.25rem)',
        paddingLeft: 'clamp(0.75rem, 1.5vh, 1.25rem)',
        paddingRight: 'clamp(0.75rem, 1.5vh, 1.25rem)'
      }}
    >
      <div className="flex items-center gap-3">
        <div 
          className="flex items-center justify-center shrink-0"
          style={{
            width: 'clamp(2.5rem, 5vh, 3rem)',
            height: 'clamp(2.5rem, 5vh, 3rem)'
          }}
        >
          <img src="/android-chrome-512x512.png" alt="Logo" className="w-full h-full object-contain" />
        </div>
        <div className="min-w-0 flex-1">
          <h3 
            className="text-white font-medium truncate"
            style={{
              fontSize: 'clamp(0.875rem, 1.8vh, 1rem)',
              lineHeight: '1.2'
            }}
          >
            Car Rental Assistant
          </h3>
          <div className="flex items-center gap-2 mt-0.5">
            <span 
              className="text-zinc-500 truncate"
              style={{
                fontSize: 'clamp(0.625rem, 1.2vh, 0.75rem)'
              }}
              suppressHydrationWarning
            >
              {t.chat.agentSubtitle}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}





