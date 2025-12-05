'use client';

import { cardBaseStyles } from '@/lib/cardStyles';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

interface ExamplesButtonProps {
  onClick: () => void;
  isOpen: boolean;
}

export function ExamplesButton({ onClick, isOpen }: ExamplesButtonProps) {
  return (
    <div className="relative w-full">
      <button
        onClick={onClick}
        className={`${cardBaseStyles} overflow-visible shadow-xl shrink-0 h-12 flex items-center justify-center transition-all duration-300 ease-out w-full
          bg-gradient-to-r from-violet-500/20 to-purple-500/20 
          border-violet-500/30 hover:border-violet-400/50
          hover:from-violet-500/30 hover:to-purple-500/30
          hover:shadow-violet-500/20
          text-violet-300 hover:text-violet-200
          font-medium
          ${isOpen ? 'border-violet-400/50 shadow-violet-500/20' : ''}`}
      >
        <span className="text-sm">Примеры</span>
      </button>

      {/* Выпадающая кнопка Демо: Аренда Авто */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, x: -40, scale: 0.95 }}
            animate={{ opacity: 1, y: -10, x: 80, scale: 1 }}
            exit={{ opacity: 0, y: 20, x: -40, scale: 0.95 }}
            transition={{ 
              duration: 0.3, 
              ease: [0.4, 0, 0.2, 1],
              type: "spring",
              stiffness: 300,
              damping: 25
            }}
            className="absolute bottom-full right-0 mb-2 z-50"
          >
            <Link
              href="/agents/car-rental"
              className="block px-4 py-2.5 bg-black/60 backdrop-blur-xl border border-white/15 rounded-xl text-sm font-medium text-zinc-200 hover:text-white hover:bg-black/80 hover:border-white/25 transition-all duration-300 shadow-2xl hover:shadow-violet-500/20 hover:scale-105 whitespace-nowrap"
            >
              Демо: Аренда Авто
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

