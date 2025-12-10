'use client';

import Link from 'next/link';
import textLogo from '../assets/logos/Текст.png';
import { velvetSpaConfig } from '../config';

export function ChatHeaderVelvetSpa() {

  return (
    <header className="px-4 sm:px-6 border-b border-white/5 flex items-center gap-3 shrink-0" style={{
      paddingTop: 'clamp(0.75rem, 2vh, 1.25rem)',
      paddingBottom: 'clamp(0.75rem, 2vh, 1.25rem)'
    }}>
      {/* ЛЕВАЯ ЧАСТЬ */}
      <div className="flex items-center gap-2 flex-1">
        {/* Desktop: слева логотип Velvet SPA (текст) */}
        <Link
          href="/"
          className="hidden lg:flex items-center gap-2 cursor-pointer hover:opacity-90 transition-opacity"
        >
          <img 
            src={textLogo.src} 
            alt="Velvet SPA logo" 
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
        {/* Mobile: справа один логотип Velvet SPA (только текст) */}
        <div className="flex items-center lg:hidden mr-12">
          <img 
            src={textLogo.src} 
            alt="Velvet SPA logo" 
            className="w-auto object-contain" 
            style={{
              height: 'clamp(1rem, 2.5vh, 1.25rem)'
            }}
          />
        </div>
      </div>
    </header>
  );
}

