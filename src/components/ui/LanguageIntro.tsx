'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Circle, Globe } from 'lucide-react';

import { useLanguage } from '@/context/LanguageContext';
import type { Language } from '@/lib/dictionary';

type LanguageOption = {
  code: Language;
  label: string;
  description: string;
  Icon: typeof Circle;
};

const OPTIONS: LanguageOption[] = [
  { code: 'en', label: 'EN', description: 'English', Icon: Globe },
  { code: 'ru', label: 'RU', description: 'Русский', Icon: Circle },
];

export function LanguageIntro() {
  const { setLanguage, isLanguageReady, isLanguageConfirmed } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!isLanguageReady) {
      setIsVisible(false);
      return;
    }

    setIsVisible(!isLanguageConfirmed);
  }, [isLanguageReady, isLanguageConfirmed]);

  if (!isLanguageReady) {
    return null;
  }

  const handleSelect = (code: Language) => {
    setLanguage(code);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[100] bg-zinc-900/30 backdrop-blur-[18px] flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <motion.div
            className="w-full max-w-sm sm:max-w-md bg-zinc-900/95 border border-white/10 rounded-2xl shadow-2xl p-5 sm:p-6 space-y-4 sm:space-y-5"
            initial={{ opacity: 0, scale: 0.95, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 8 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            <div className="text-center space-y-2">
              <h2 className="text-lg sm:text-xl font-light text-zinc-100">Select Language</h2>
              <p className="text-[11px] sm:text-xs text-zinc-500">Прежде чем начать, выберите удобный язык.</p>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              {OPTIONS.map(({ code, label, description, Icon }) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => handleSelect(code)}
                  className="group relative flex items-center justify-between p-3.5 sm:p-4 border border-white/5 hover:border-white/20 hover:bg-white/5 transition-all duration-300 rounded-lg text-left"
                >
                  <div>
                    <span className="text-xl sm:text-2xl font-semibold text-white tracking-tight">{label}</span>
                    <p className="text-[11px] sm:text-xs text-zinc-500 group-hover:text-white transition-colors">
                      {description}
                    </p>
                  </div>
                  <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-white/5 text-white/70 group-hover:text-white group-hover:bg-white/10 transition-colors">
                    <Icon className="h-4 w-4 sm:h-[18px] sm:w-[18px]" strokeWidth={1.4} />
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}


