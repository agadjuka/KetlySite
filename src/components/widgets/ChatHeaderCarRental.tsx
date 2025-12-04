'use client';

import Link from 'next/link';
import { useDemoMode } from '@/context/DemoContext';
import { useLanguage } from '@/context/LanguageContext';
import { LanguageToggleButton } from '@/components/ui/LanguageToggleButton';
import textLogo from '@/app/agents/car-rental/logos/Текст.png';
import carableIcon from '@/app/agents/car-rental/logos/carable-icon.png';

export function ChatHeaderCarRental() {
  const { isDemoMode } = useDemoMode();
  const { t } = useLanguage();

  return (
    <header className="px-4 sm:px-6 py-4 sm:py-5 border-b border-white/5 flex items-center gap-3 shrink-0">
      {/* ЛЕВАЯ ЧАСТЬ */}
      <div className="flex items-center gap-2 flex-1">
        {/* Desktop: слева логотип CarRental (текст) как сейчас */}
        <Link
          href="/"
          className="hidden lg:flex items-center gap-2 cursor-pointer hover:opacity-90 transition-opacity"
        >
          <img src={textLogo.src} alt="Carable logo" className="h-6 sm:h-7 w-auto object-contain" />
        </Link>

        {/* Mobile: слева логотип KETLY, кликабельный, ведёт на главную */}
        <Link
          href="/"
          className="flex lg:hidden items-center gap-2 cursor-pointer hover:opacity-90 transition-opacity"
        >
          <img src="/logo-text-black.png" alt="KETLY" className="h-5 w-auto object-contain" />
        </Link>
      </div>

      {/* ПРАВАЯ ЧАСТЬ */}
      <div className="flex items-center gap-3 ml-auto">
        {/* Mobile: справа один логотип CarRental (только текст) */}
        <div className="flex items-center lg:hidden">
          <img src={textLogo.src} alt="Carable logo" className="h-5 w-auto object-contain" />
        </div>

        <LanguageToggleButton variant="mobile" className="lg:hidden" />
        <div className="flex items-center gap-2">
          <span
            className={`w-2 h-2 rounded-full transition-all duration-700 ease-in-out ${
              isDemoMode
                ? 'bg-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.5)]'
                : 'bg-sky-400 shadow-[0_0_10px_rgba(56,189,248,0.5)]'
            }`}
          ></span>
          <span className="text-xs text-zinc-500" suppressHydrationWarning>
            {t.chat.onlineStatus}
          </span>
        </div>
      </div>
    </header>
  );
}

