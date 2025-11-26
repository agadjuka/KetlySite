'use client';

import clsx from 'clsx';
import { useLanguage } from '@/context/LanguageContext';

type LanguageToggleButtonProps = {
  variant?: 'desktop' | 'mobile';
  className?: string;
};

export function LanguageToggleButton({
  variant = 'desktop',
  className,
}: LanguageToggleButtonProps) {
  const { language, setLanguage } = useLanguage();
  const isRussian = language === 'ru';

  const handleToggle = () => {
    setLanguage(isRussian ? 'en' : 'ru');
  };

  const baseClasses =
    'flex items-center gap-1 border border-white/15 bg-transparent text-white/70 backdrop-blur-xl shadow-lg shadow-black/20 transition-all duration-300';

  const variantClasses =
    variant === 'mobile'
      ? 'rounded-lg px-2.5 py-1 text-[11px] font-medium hover:border-white/30 hover:text-white'
      : 'rounded-full px-3 py-1.5 text-xs font-semibold hover:border-white/40 hover:text-white';

  return (
    <button
      type="button"
      onClick={handleToggle}
      className={clsx(baseClasses, variantClasses, className)}
    >
      <span
        className={clsx(
          'px-2 py-0.5 rounded-full transition-colors',
          isRussian ? 'bg-white/30 text-white' : 'text-white/60',
          variant === 'mobile' && 'px-1.5 py-[2px]',
        )}
      >
        RU
      </span>
      <span
        className={clsx(
          'px-2 py-0.5 rounded-full transition-colors',
          !isRussian ? 'bg-white/30 text-white' : 'text-white/60',
          variant === 'mobile' && 'px-1.5 py-[2px]',
        )}
      >
        EN
      </span>
    </button>
  );
}


