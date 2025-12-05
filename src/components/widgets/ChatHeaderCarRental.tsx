'use client';

import Link from 'next/link';
import { X, ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import textLogo from '@/app/agents/car-rental/logos/Текст.png';
import carableIcon from '@/app/agents/car-rental/logos/carable-icon.png';

export function ChatHeaderCarRental() {
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

        {/* Desktop: Кнопка "На главную" со стрелкой */}
        <Link
          href="/"
          className="hidden lg:flex items-center gap-2 text-white/70 hover:text-white transition-all active:scale-95 px-3 py-1.5 rounded-lg hover:bg-white/5"
          aria-label={t.chat.backToHome}
        >
          <ArrowLeft size={16} />
          <span className="text-sm font-medium">{t.chat.backToHome}</span>
        </Link>

        {/* Mobile: Крестик для возврата на главную */}
        <Link
          href="/"
          className="flex lg:!hidden items-center justify-center text-white/70 hover:text-white transition-all active:scale-90 p-1.5 rounded-lg hover:bg-white/5"
          aria-label={t.chat.backToHome}
        >
          <X size={20} />
        </Link>
      </div>
    </header>
  );
}

