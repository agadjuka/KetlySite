'use client';

import { useDemoMode } from '@/context/DemoContext';
import { useLanguage } from '@/context/LanguageContext';

export function ChatHeader() {
  const { isDemoMode } = useDemoMode();
  const { t } = useLanguage();

  return (
    <header className="px-4 sm:px-6 py-4 sm:py-5 border-b border-white/5 flex items-center justify-between shrink-0">
      <div className="h-5 flex items-center gap-2">
        <img src="/logo-text-black.png" alt="Logo" className="h-full w-auto object-contain" />
        <img src="/android-chrome-512x512.png" alt="Logo" className="h-5 w-5 object-contain lg:hidden" />
      </div>
      <div className="flex items-center gap-2">
        <span
          className={`w-2 h-2 rounded-full transition-all duration-700 ease-in-out ${
            isDemoMode
              ? 'bg-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.5)]'
              : 'bg-sky-400 shadow-[0_0_10px_rgba(56,189,248,0.5)]'
          }`}
        ></span>
        <span className="text-xs text-zinc-500">{t.chat.onlineStatus}</span>
      </div>
    </header>
  );
}

