'use client';

import Link from 'next/link';
import { X, CornerUpLeft } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export function TourExitButton() {
  const { t } = useLanguage();

  return (
    <>
      {/* Desktop: Кнопка "На главную" со стрелкой - на отдельном слое */}
      <Link
        id="tour-exit-button-desktop"
        href="/"
        className="fixed right-6 z-[100] hidden lg:flex items-center gap-2 text-white/70 hover:text-white transition-all active:scale-95"
        style={{
          top: 'calc(1rem + clamp(0.75rem, 2vh, 1.25rem) + clamp(1.25rem, 3vh, 1.75rem) / 2)',
          transform: 'translateY(-50%)'
        }}
        aria-label={t.chat.backToHome}
      >
        <CornerUpLeft size={16} />
        <span className="text-sm font-medium">{t.chat.backToHome}</span>
      </Link>

      {/* Mobile: Крестик для возврата на главную - на отдельном слое, привязан к хедеру */}
      <Link
        id="tour-exit-button-mobile"
        href="/"
        className="fixed right-4 z-[100] flex lg:!hidden items-center justify-center text-white/70 hover:text-white transition-all active:scale-90 p-1.5 rounded-lg hover:bg-white/5 bg-black/40 backdrop-blur-xl"
        style={{
          top: 'calc(env(safe-area-inset-top, 0px) + clamp(0.75rem, 2vh, 1.25rem) + clamp(1rem, 2.5vh, 1.25rem) / 2)',
          transform: 'translateY(-50%)'
        }}
        aria-label={t.chat.backToHome}
      >
        <X size={20} />
      </Link>
    </>
  );
}


















