'use client';

import { cardBaseStyles } from '@/lib/cardStyles';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import textLogo from '@/app/agents/car-rental/logos/Текст.png';
import { useLanguage } from '@/context/LanguageContext';

interface ExamplesButtonProps {
  onClick: () => void;
  isOpen: boolean;
}

export function ExamplesButton({ onClick, isOpen }: ExamplesButtonProps) {
  const { t } = useLanguage();
  
  return (
    <div className="relative w-full">
      <button
        id="tour-showcase-desktop"
        onClick={onClick}
        className={`button-examples shrink-0 h-12 flex items-center justify-center w-full text-sm font-medium ${isOpen ? 'is-open' : ''}`}
      >
        <span suppressHydrationWarning>Примеры</span>
      </button>

      {/* Выпадающая кнопка Демо: Аренда Авто */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, x: 60, scale: 0.8, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: -10, x: 80, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 8, x: 60, scale: 0.8, filter: "blur(8px)" }}
            transition={{ 
              duration: 0.4, 
              ease: [0.16, 1, 0.3, 1],
              type: "spring",
              stiffness: 400,
              damping: 30
            }}
            className="absolute bottom-full right-0 mb-2 z-50"
          >
            <Link
              href="/agents/car-rental"
              className="block bg-black border border-white/15 rounded-xl transition-all duration-300 shadow-2xl hover:border-white/25 hover:scale-105 flex flex-col items-center"
              style={{
                padding: '8px 14px',
                gap: '6px'
              }}
            >
              <img 
                src={textLogo.src} 
                alt="Carable logo" 
                className="object-contain"
                style={{
                  maxWidth: '80px',
                  display: 'block'
                }}
              />
              <div 
                className="w-full"
                style={{
                  height: '1px',
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                  margin: '1px 0'
                }}
              />
              <span 
                className="uppercase font-semibold"
                style={{
                  fontSize: '9px',
                  letterSpacing: '1.5px',
                  color: '#8fa0b5',
                  fontWeight: 600
                }}
                suppressHydrationWarning
              >
                {t.chat.carRental}
              </span>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

