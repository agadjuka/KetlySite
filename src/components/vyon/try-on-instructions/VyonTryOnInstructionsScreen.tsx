import React from "react";
import { HomeFooter, HomeHeader } from "@/components/home";
import { VyonTryOnInstructionsLeftPanel } from "./VyonTryOnInstructionsLeftPanel";
import { VyonTryOnInstructionsRightPanel } from "./VyonTryOnInstructionsRightPanel";

export function VyonTryOnInstructionsScreen() {
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

          {/* Шапка карточки */}
          <div className="relative flex items-center gap-3 px-8 pt-8 pb-6 border-b border-white/6">
            <div className="w-1.5 h-1.5 rounded-full bg-accent-gold animate-pulse" />
            <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-accent-gold/80">
              [ VYON — Virtual Try-On ]
            </p>
          </div>

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
          <div className="relative flex items-center justify-end gap-4 px-8 py-5 border-t border-white/6">
            <button
              type="button"
              className="px-5 py-2 text-xs font-mono uppercase tracking-widest text-neutral-400 hover:text-white transition-colors"
            >
              Назад
            </button>
            <button
              type="button"
              className="px-7 py-2.5 text-xs font-mono uppercase tracking-widest bg-accent-gold text-black font-bold hover:bg-white transition-colors"
            >
              Понятно, продолжить
            </button>
          </div>
        </div>
      </main>

      <div className="bg-black">
        <HomeFooter />
      </div>
    </div>
  );
}
