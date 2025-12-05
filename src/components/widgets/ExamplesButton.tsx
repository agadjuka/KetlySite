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

