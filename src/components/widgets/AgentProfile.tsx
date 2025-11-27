'use client';

import { useLanguage } from '@/context/LanguageContext';
import { cardBaseStyles } from '@/lib/cardStyles';

export function AgentProfile() {
  const { t } = useLanguage();

  return (
    <div className={`${cardBaseStyles} overflow-hidden flex flex-col p-5 shadow-xl shrink-0`}>
      <div className="flex items-center gap-4 mb-1">
        <div className="w-12 h-12 flex items-center justify-center">
          <img src="/android-chrome-512x512.png" alt="Logo" className="w-full h-full object-contain" />
        </div>
        <div>
          <h3 className="text-white font-medium">KETLY</h3>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-xs text-zinc-500" suppressHydrationWarning>{t.chat.agentSubtitle}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

