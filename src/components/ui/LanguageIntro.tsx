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
  { code: 'ru', label: 'RU', description: 'Русский', Icon: Circle },
  { code: 'en', label: 'EN', description: 'English', Icon: Globe },
];

export function LanguageIntro() {
  const { setLanguage } = useLanguage();
  const [isReady, setIsReady] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const stored = window.localStorage.getItem('language');
    const hasLanguage = stored === 'ru' || stored === 'en';
    setIsVisible(!hasLanguage);
    setIsReady(true);
  }, []);

  if (!isReady) {
    return null;
  }

  const handleSelect = (code: Language) => {
    setLanguage(code);
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-xl flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <motion.div
            className="w-full max-w-xl bg-zinc-900 border border-white/10 rounded-2xl shadow-2xl p-10 space-y-8"
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            <div className="text-center space-y-2">
              <p className="text-sm uppercase tracking-[0.3em] text-zinc-600">Interface</p>
              <h2 className="text-3xl font-light text-zinc-100">Select Language</h2>
              <p className="text-sm text-zinc-500">
                Прежде чем начать, выберите удобный язык интерфейса.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {OPTIONS.map(({ code, label, description, Icon }) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => handleSelect(code)}
                  className="group relative flex items-center justify-between p-6 border border-white/5 hover:border-white/20 hover:bg-white/5 transition-all duration-300 rounded-xl text-left"
                >
                  <div>
                    <span className="text-4xl font-semibold text-white tracking-tight">{label}</span>
                    <p className="text-sm text-zinc-500 group-hover:text-white transition-colors">
                      {description}
                    </p>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/5 text-white/70 group-hover:text-white group-hover:bg-white/10 transition-colors">
                    <Icon className="h-5 w-5" strokeWidth={1.5} />
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


