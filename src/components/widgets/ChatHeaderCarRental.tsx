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
    <header className="px-4 sm:px-6 border-b border-white/5 flex items-center gap-3 shrink-0" style={{
      paddingTop: 'clamp(0.75rem, 2vh, 1.25rem)',
      paddingBottom: 'clamp(0.75rem, 2vh, 1.25rem)'
    }}>
      {/* ЛЕВАЯ ЧАСТЬ */}
      <div className="flex items-center gap-2 flex-1">
        {/* Desktop: слева логотип CarRental (текст) как сейчас */}
        <Link
          href="/"
          className="hidden lg:flex items-center gap-2 cursor-pointer hover:opacity-90 transition-opacity"
        >
          <img 
            src={textLogo.src} 
            alt="Carable logo" 
            className="w-auto object-contain" 
            style={{
              height: 'clamp(1.25rem, 3vh, 1.75rem)'
            }}
          />
        </Link>

        {/* Mobile: слева логотип KETLY, кликабельный, ведёт на главную */}
        <Link
          href="/"
          className="flex lg:hidden items-center gap-2 cursor-pointer hover:opacity-90 transition-opacity"
        >
          <img 
            src="/logo-text-black.png" 
            alt="KETLY" 
            className="w-auto object-contain" 
            style={{
              height: 'clamp(1rem, 2.5vh, 1.25rem)'
            }}
          />
        </Link>
      </div>

      {/* ПРАВАЯ ЧАСТЬ */}
      <div className="flex items-center gap-3 ml-auto">
        {/* Mobile: справа один логотип CarRental (только текст) */}
        <div className="flex items-center lg:hidden">
          <img 
            src={textLogo.src} 
            alt="Carable logo" 
            className="w-auto object-contain" 
            style={{
              height: 'clamp(1rem, 2.5vh, 1.25rem)'
            }}
          />
        </div>

        <LanguageToggleButton variant="mobile" className="lg:hidden" />
        <div className="flex items-center gap-2">
          <span
            className={`rounded-full transition-all duration-700 ease-in-out ${
              isDemoMode
                ? 'bg-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.5)]'
                : 'bg-sky-400 shadow-[0_0_10px_rgba(56,189,248,0.5)]'
            }`}
            style={{
              width: 'clamp(0.375rem, 1vh, 0.5rem)',
              height: 'clamp(0.375rem, 1vh, 0.5rem)'
            }}
          ></span>
          <span 
            className="text-zinc-500" 
            style={{
              fontSize: 'clamp(0.625rem, 1.2vh, 0.75rem)'
            }}
            suppressHydrationWarning
          >
            {t.chat.onlineStatus}
          </span>
        </div>
      </div>
    </header>
  );
}

