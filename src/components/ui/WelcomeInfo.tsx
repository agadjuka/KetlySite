'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

export function WelcomeInfo() {
  const { language, t, isLanguageReady, isLanguageConfirmed, isWelcomeInfoShown, setWelcomeInfoShown } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!isLanguageReady || !isLanguageConfirmed) {
      setIsVisible(false);
      return;
    }

    // Показываем только если язык выбран, но welcomeInfo еще не показывалось
    // Добавляем небольшую задержку для плавного перехода после анимации LanguageIntro
    if (!isWelcomeInfoShown) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 400); // Задержка после анимации исчезновения LanguageIntro
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [isLanguageReady, isLanguageConfirmed, isWelcomeInfoShown]);

  if (!isLanguageReady || !isLanguageConfirmed) {
    return null;
  }

  const handleStart = () => {
    setIsVisible(false);
    setWelcomeInfoShown(true);
  };

  const welcomeText = t.welcomeInfo;

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
            className="w-full max-w-lg sm:max-w-2xl bg-zinc-900/95 border border-white/10 rounded-2xl shadow-2xl p-6 sm:p-8 space-y-6 sm:space-y-8 max-h-[90vh] overflow-y-auto"
            initial={{ opacity: 0, scale: 0.95, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 8 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            <div className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-light text-zinc-100 text-center">
                {welcomeText.title}
              </h2>
              
              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed text-center">
                {welcomeText.description}
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg sm:text-xl font-medium text-zinc-100">
                {language === 'ru' ? 'Что я умею:' : 'What I can do:'}
              </h3>
              
              <div className="space-y-3">
                <div className="flex gap-3">
                  <span className="text-zinc-400 mt-1">🔹</span>
                  <p className="text-sm sm:text-base text-zinc-300 leading-relaxed flex-1">
                    {welcomeText.capabilities.consult}
                  </p>
                </div>
                
                <div className="flex gap-3">
                  <span className="text-zinc-400 mt-1">🔹</span>
                  <p className="text-sm sm:text-base text-zinc-300 leading-relaxed flex-1">
                    {welcomeText.capabilities.demonstrate}
                  </p>
                </div>
                
                <div className="flex gap-3">
                  <span className="text-zinc-400 mt-1">🔹</span>
                  <p className="text-sm sm:text-base text-zinc-300 leading-relaxed flex-1">
                    {welcomeText.capabilities.connect}
                  </p>
                </div>
              </div>
            </div>

            <p className="text-sm sm:text-base text-zinc-400 text-center leading-relaxed">
              {welcomeText.footer}
            </p>

            <div className="flex justify-center pt-2">
              <button
                type="button"
                onClick={handleStart}
                className="px-6 sm:px-8 py-3 sm:py-3.5 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 text-white font-medium rounded-lg transition-all duration-300 text-sm sm:text-base"
              >
                {welcomeText.button}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

