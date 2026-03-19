"use client";

import React, { useMemo, useState } from "react";
import { InstructionSplitImageCard } from "./InstructionSplitImageCard";
import { VYON_TRY_ON_INSTRUCTIONS_ASSETS } from "./instructionsAssets";
import { VYON_MATCH_RULES } from "./matchRules";

type Step = "photo" | "match";

const BULLETS = [
  "Upload a clear, front-facing portrait with good lighting and natural posture.",
  "Wear clothing of a similar length to the item you are trying on. Avoid swimwear or heavy exposure.",
  "Avoid excessively loose or oversized garments so the AI can map your proportions accurately.",
] as const;

function CheckBadge() {
  return (
    <div className="absolute top-2.5 right-2.5 z-10 w-6 h-6 rounded-full bg-accent-gold/90 border border-accent-gold/60 flex items-center justify-center shadow-[0_0_10px_rgba(191,161,95,0.5)]">
      <svg width="11" height="11" viewBox="0 0 13 13" fill="none" aria-hidden="true">
        <path d="M2.5 6.5L5.5 9.5L10.5 4" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

function CrossBadge() {
  return (
    <div className="absolute top-2.5 right-2.5 z-10 w-6 h-6 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
      <svg width="10" height="10" viewBox="0 0 11 11" fill="none" aria-hidden="true">
        <path d="M2 2L9 9M9 2L2 9" stroke="rgba(255,255,255,0.5)" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    </div>
  );
}

const BTN_CLASS =
  "inline-flex items-center justify-center rounded-lg px-10 py-3.5 bg-accent-gold text-black font-display text-xs font-bold tracking-[0.2em] uppercase transition-colors duration-200 hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950";

export function VyonTryOnInstructionsMobileFlow({
  onDone,
  onClose,
}: {
  onDone: () => void;
  onClose: () => void;
}) {
  const [step, setStep] = useState<Step>("photo");
  const rules = useMemo(() => VYON_MATCH_RULES, []);

  if (step === "photo") {
    return (
      <div className="h-full flex flex-col">
        {/* Шапка шага 1 */}
        <div className="flex-none flex items-start justify-between gap-3 px-5 pt-4 pb-3 border-b border-white/[0.06]">
          <div className="flex items-start gap-2.5">
            <div className="mt-[0.35rem] w-1.5 h-1.5 rounded-full bg-accent-gold animate-pulse shrink-0" />
            <p className="text-xs font-display font-medium text-alabaster leading-snug">
              For the most realistic virtual try-on experience, please upload a photo that meets
              the following guidelines:
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
          >
            <span className="material-symbols-outlined text-white/60 text-[18px]">close</span>
          </button>
        </div>

        {/* Заголовок Photo Guidelines */}
        <div className="flex-none px-5 pt-3 pb-1">
          <h2 className="text-base font-display font-semibold text-alabaster tracking-tight">
            Photo Guidelines
          </h2>
        </div>

        {/* Фото — занимают оставшееся место */}
        <div className="flex-1 min-h-0 px-5 py-1 grid grid-cols-2 gap-3">
          {/* DO */}
          <div className="relative rounded-xl overflow-hidden border border-accent-gold/25 bg-white/3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={VYON_TRY_ON_INSTRUCTIONS_ASSETS.photosLeft.good}
              alt="Правильное фото"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <CheckBadge />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent pt-5 pb-2 px-3">
              <span className="text-[9px] font-mono tracking-[0.2em] uppercase text-accent-gold/90">
                DO
              </span>
            </div>
          </div>

          {/* DON'T */}
          <div className="relative rounded-xl overflow-hidden border border-white/10 bg-white/3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={VYON_TRY_ON_INSTRUCTIONS_ASSETS.photosLeft.bad}
              alt="Неправильное фото"
              className="absolute inset-0 w-full h-full object-cover opacity-85"
            />
            <CrossBadge />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent pt-5 pb-2 px-3">
              <span className="text-[9px] font-mono tracking-[0.2em] uppercase text-neutral-400">
                DON&apos;T
              </span>
            </div>
          </div>
        </div>

        {/* Список правил */}
        <div className="flex-none px-5 pt-3 pb-2">
          <ul className="space-y-2">
            {BULLETS.map((b) => (
              <li key={b} className="flex items-start gap-2.5">
                <span className="mt-[0.42rem] shrink-0 w-1 h-1 rounded-full bg-accent-gold/60" />
                <span className="text-xs text-neutral-400 leading-relaxed">{b}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Кнопка Next */}
        <div className="flex-none flex items-center justify-center px-5 py-4 border-t border-white/[0.06]">
          <button type="button" onClick={() => setStep("match")} className={BTN_CLASS}>
            Next
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Заголовок шага 2 с крестиком */}
      <div className="flex-none px-5 pt-4 pb-1">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-base font-display font-semibold text-alabaster tracking-tight">
            For a Flawless Result
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
          >
            <span className="material-symbols-outlined text-white/60 text-[18px]">close</span>
          </button>
        </div>
        <p className="mt-1 text-xs text-neutral-400 leading-relaxed">
          Our AI adapts to any photo. However, for the most realistic visualization, we highly
          recommend matching your clothing length to the item you want to try on.
        </p>
      </div>

      {/* Карусель — занимает оставшееся место */}
      <div className="flex-1 min-h-0 overflow-hidden py-3">
        <div
          className="h-full flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-hide px-5"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {rules.map((r) => (
            <div
              key={r.key}
              className="snap-center flex-none w-[72%] h-full flex flex-col gap-2"
            >
              {/* Карточка занимает flex-1 */}
              <div className="flex-1 min-h-0">
                <InstructionSplitImageCard
                  imageSrc={r.imageSrc}
                  targetThumbnailTitle={r.targetThumbnailTitle}
                  targetThumbnailImageSrc={r.targetThumbnailImageSrc}
                  leftBadgeText={r.leftBadgeText}
                  rightBadgeText={r.rightBadgeText}
                  showBottomMarks
                  fillHeight
                />
              </div>
              <p className="flex-none text-xs text-neutral-400 leading-relaxed">
                {r.description}
              </p>
            </div>
          ))}
          {/* Небольшой хвост для peek следующего слайда */}
          <div className="flex-none w-[8%]" aria-hidden />
        </div>
      </div>

      {/* Кнопка Got it */}
      <div className="flex-none flex items-center justify-center px-5 py-4 border-t border-white/[0.06]">
        <button type="button" onClick={onDone} className={BTN_CLASS}>
          Got it!
        </button>
      </div>
    </div>
  );
}
