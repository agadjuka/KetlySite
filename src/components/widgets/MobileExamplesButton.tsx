'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import textLogo from '@/app/agents/car-rental/logos/Текст.png';

export function MobileExamplesButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      className="fixed left-4 bottom-32 z-40 flex flex-col-reverse items-center gap-3"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      {/* Основная кнопка - трансформируется в крестик */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 shadow-lg hover:shadow-xl active:scale-95 button-examples-mobile"
      >
        <motion.div
          animate={{ rotate: 0 }}
          transition={{ duration: 0.2 }}
          className="relative w-6 h-6"
        >
          <AnimatePresence mode="wait">
            {!isOpen ? (
              <motion.svg
                key="examples"
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.2 }}
                className="w-6 h-6 fill-current absolute inset-0" 
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Иконка звездочки/примеров */}
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </motion.svg>
            ) : (
              <motion.svg
                key="close"
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.2 }}
                className="w-6 h-6 fill-current absolute inset-0" 
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              </motion.svg>
            )}
          </AnimatePresence>
        </motion.div>
      </button>

      {/* Значок с логотипом CarRental */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0, y: 20 }}
            transition={{ duration: 0.2, delay: 0.05 }}
            onClick={() => setIsOpen(false)}
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
              >
                АРЕНДА АВТО
              </span>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

