'use client';

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { VyonTryOnInstructionsLeftPanel } from './VyonTryOnInstructionsLeftPanel';
import { VyonTryOnInstructionsRightPanel } from './VyonTryOnInstructionsRightPanel';
import { VyonTryOnInstructionsMobileFlow } from './VyonTryOnInstructionsMobileFlow';
import { useMediaQuery } from './useMediaQuery';

interface VyonTryOnInstructionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDone: () => void;
}

const EASE = [0.22, 1, 0.36, 1] as const;

export function VyonTryOnInstructionsModal({
  isOpen,
  onClose,
  onDone,
}: VyonTryOnInstructionsModalProps) {
  const [mounted, setMounted] = useState(false);
  const isMobile = useMediaQuery('(max-width: 1023px)');

  // Монтируемся только в браузере (SSR-safe)
  useEffect(() => {
    setMounted(true);
  }, []);

  // Блокируем скролл страницы пока модалка открыта
  useEffect(() => {
    if (!isOpen) return;

    const html = document.documentElement;
    const scrollbarWidth = window.innerWidth - html.clientWidth;

    html.style.overflow = 'hidden';
    // Компенсируем ширину скроллбара, чтобы контент не прыгал
    if (scrollbarWidth > 0) {
      html.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      html.style.overflow = '';
      html.style.paddingRight = '';
    };
  }, [isOpen]);

  const content = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="vyon-instructions-modal"
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
        >
          {/* Тёмный overlay */}
          <div
            className="absolute inset-0 bg-neutral-950/90"
            onClick={onClose}
            aria-hidden
          />

          {/* Карточка модалки */}
          <motion.div
            className="relative w-full max-w-5xl max-h-[90dvh] rounded-2xl border border-accent-gold/20 bg-[#141414] overflow-hidden shadow-[0_24px_80px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,255,255,0.04)_inset] flex flex-col"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.28, ease: EASE }}
          >
            {/* Amber блик сверху */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-accent-gold/5 via-transparent to-transparent" />

            {/* Шапка */}
            <div className="relative flex-none flex items-start justify-between gap-4 px-6 md:px-8 pt-6 md:pt-8 pb-5 border-b border-white/[0.06]">
              <div className="flex items-start gap-3">
                <div className="mt-2 w-1.5 h-1.5 rounded-full bg-accent-gold animate-pulse shrink-0" />
                <p className="text-sm md:text-base font-display font-medium text-alabaster leading-snug">
                  For the most realistic virtual try-on experience, please upload a photo that meets the
                  following guidelines:
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="shrink-0 inline-flex items-center justify-center w-9 h-9 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
              >
                <span className="material-symbols-outlined text-white/60 text-xl">close</span>
              </button>
            </div>

            {/* Тело */}
            <div className="flex-1 min-h-0 overflow-y-auto">
              {isMobile ? (
                <VyonTryOnInstructionsMobileFlow onDone={onDone} />
              ) : (
                <>
                  <div className="flex flex-col lg:flex-row divide-y lg:divide-y-0 lg:divide-x divide-white/[0.06]">
                    <div className="w-full lg:w-[42%] p-6 md:p-8">
                      <VyonTryOnInstructionsLeftPanel />
                    </div>
                    <div className="w-full lg:w-[58%] p-6 md:p-8">
                      <VyonTryOnInstructionsRightPanel />
                    </div>
                  </div>

                  <div className="flex items-center justify-center px-6 md:px-8 py-6 border-t border-white/[0.06]">
                    <button
                      type="button"
                      onClick={onDone}
                      className="inline-flex items-center justify-center rounded-lg px-10 py-4 bg-accent-gold text-black font-display text-xs font-bold tracking-[0.2em] uppercase transition-colors duration-200 hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
                    >
                      Got it!
                    </button>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  if (!mounted) return null;
  return createPortal(content, document.body);
}
