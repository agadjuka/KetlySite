'use client';

import React from 'react';
import { HomeFooter, HomeHeader } from "@/components/home";
import { VyonTryOnInstructionsLeftPanel } from "./VyonTryOnInstructionsLeftPanel";
import { VyonTryOnInstructionsRightPanel } from "./VyonTryOnInstructionsRightPanel";
import { useMediaQuery } from "./useMediaQuery";
import { VyonTryOnInstructionsMobileFlow } from "./VyonTryOnInstructionsMobileFlow";

export function VyonTryOnInstructionsScreen() {
  const isMobile = useMediaQuery("(max-width: 1023px)");

  return (
    <div className="relative flex min-h-screen w-full max-w-full flex-col grid-lines vyon-mesh-bg font-body antialiased overflow-x-hidden selection:bg-accent-gold selection:text-black">
      <HomeHeader hideNav />

      <main className="flex-1 w-full flex items-center justify-center px-4 md:px-8 pt-28 pb-24">
        {/* Подложка-сияние позади карточки */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-accent-gold/8 blur-[120px] pointer-events-none" />

        {/* Основная карточка */}
        <div className="relative w-full max-w-5xl vyon-poc-block rounded-2xl border border-accent-gold/20 bg-neutral-900/70 backdrop-blur-xl overflow-hidden shadow-[0_0_0_1px_rgba(255,255,255,0.03)_inset,0_8px_64px_rgba(0,0,0,0.6)]">
          {/* Верхний градиент — тонкий amber блик */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-accent-gold/6 via-transparent to-transparent" />

          {/* Шапка карточки (на мобилке её показывает Step 1) */}
          {!isMobile && (
            <div className="relative px-8 pt-8 pb-6 border-b border-white/6">
              <div className="flex items-start gap-3">
                <div className="mt-2 w-1.5 h-1.5 rounded-full bg-accent-gold animate-pulse" />
                <p className="text-sm md:text-base font-display font-medium text-alabaster leading-snug">
                  For the most realistic virtual try-on experience, please upload a photo that meets the following
                  guidelines:
                </p>
              </div>
            </div>
          )}

          {isMobile ? (
            <VyonTryOnInstructionsMobileFlow />
          ) : (
            <>
              {/* Тело: два блока */}
              <div className="relative flex flex-col lg:flex-row gap-0 divide-y lg:divide-y-0 lg:divide-x divide-white/6">
                <div className="w-full lg:w-[42%] p-8">
                  <VyonTryOnInstructionsLeftPanel />
                </div>
                <div className="w-full lg:w-[58%] p-8">
                  <VyonTryOnInstructionsRightPanel />
                </div>
              </div>

              {/* Нижний footer карточки */}
              <div className="relative flex items-center justify-center px-8 py-6 border-t border-white/6">
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-lg px-10 py-4 bg-accent-gold text-black font-display text-xs font-bold tracking-[0.2em] uppercase shadow-[0_0_0_1px_rgba(191,161,95,0.25)_inset,0_10px_30px_rgba(0,0,0,0.35)] transition-colors duration-200 hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
                >
                  Got it, proceed
                </button>
              </div>
            </>
          )}
        </div>
      </main>

      <div className="bg-black">
        <HomeFooter />
      </div>
    </div>
  );
}
