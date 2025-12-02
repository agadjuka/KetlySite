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

// Функция для форматирования текста с жирным первым словом (до двоеточия)
const formatCapabilityText = (text: string) => {
  const colonIndex = text.indexOf(':');
  if (colonIndex === -1) {
    return text;
  }
  const boldPart = text.substring(0, colonIndex + 1);
  const restPart = text.substring(colonIndex + 1);
  return (
    <>
      <strong>{boldPart}</strong>
      {restPart}
    </>
  );
};

export function WelcomeFlow() {
  const {
    language,
    t,
    isLanguageReady,
    isLanguageConfirmed,
    isWelcomeInfoShown,
    setLanguage,
    setWelcomeInfoShown,
  } = useLanguage();

  const [showLanguageIntro, setShowLanguageIntro] = useState(false);
  const [showWelcomeInfo, setShowWelcomeInfo] = useState(false);
  const [shouldShowBackground, setShouldShowBackground] = useState(false);

  useEffect(() => {
    if (!isLanguageReady) {
      setShowLanguageIntro(false);
      setShowWelcomeInfo(false);
      setShouldShowBackground(false);
      return;
    }

    const needsLanguageSelection = !isLanguageConfirmed;
    const needsWelcomeInfo = isLanguageConfirmed && !isWelcomeInfoShown;

    setShowLanguageIntro(needsLanguageSelection);
    
    if (needsWelcomeInfo) {
      // Небольшая задержка для плавного перехода после анимации LanguageIntro
      const timer = setTimeout(() => {
        setShowWelcomeInfo(true);
      }, 400);
      return () => clearTimeout(timer);
    } else {
      setShowWelcomeInfo(false);
    }

    // Фон показывается, если нужно показать хотя бы одно окно
    setShouldShowBackground(needsLanguageSelection || needsWelcomeInfo);
  }, [isLanguageReady, isLanguageConfirmed, isWelcomeInfoShown]);

  if (!isLanguageReady) {
    return null;
  }

  const handleLanguageSelect = (code: Language) => {
    setLanguage(code);
  };

  const handleStart = () => {
    setShowWelcomeInfo(false);
    setWelcomeInfoShown(true);
  };

  const welcomeText = t.welcomeInfo;

  return (
    <AnimatePresence>
      {shouldShowBackground && (
        <motion.div
          className="fixed inset-0 z-[100] bg-zinc-900/30 backdrop-blur-[18px] flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          {/* Окно выбора языка */}
          <AnimatePresence mode="wait">
            {showLanguageIntro && (
              <motion.div
                key="language-intro"
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
                      onClick={() => handleLanguageSelect(code)}
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
            )}

            {/* Информационное окно */}
            {showWelcomeInfo && (
              <motion.div
                key="welcome-info"
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
                        {formatCapabilityText(welcomeText.capabilities.consult)}
                      </p>
                    </div>
                    
                    <div className="flex gap-3">
                      <span className="text-zinc-400 mt-1">🔹</span>
                      <p className="text-sm sm:text-base text-zinc-300 leading-relaxed flex-1">
                        {formatCapabilityText(welcomeText.capabilities.demonstrate)}
                      </p>
                    </div>
                    
                    <div className="flex gap-3">
                      <span className="text-zinc-400 mt-1">🔹</span>
                      <p className="text-sm sm:text-base text-zinc-300 leading-relaxed flex-1">
                        {formatCapabilityText(welcomeText.capabilities.connect)}
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
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

