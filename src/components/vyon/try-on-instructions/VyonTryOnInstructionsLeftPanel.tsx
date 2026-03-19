import React from "react";
import { VYON_TRY_ON_INSTRUCTIONS_ASSETS } from "./instructionsAssets";

const BULLETS = [
  "Upload a clear, front-facing portrait with good lighting and natural posture.",
  "Wear clothing of a similar length to the item you are trying on. Avoid swimwear or heavy exposure.",
  "Avoid excessively loose or oversized garments so the AI can map your proportions accurately.",
] as const;

function CheckBadge() {
  return (
    <div className="absolute top-3 right-3 z-10 w-7 h-7 rounded-full bg-accent-gold/90 border border-accent-gold/60 flex items-center justify-center shadow-[0_0_12px_rgba(191,161,95,0.5)]">
      <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
        <path
          d="M2.5 6.5L5.5 9.5L10.5 4"
          stroke="#000"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

function CrossBadge() {
  return (
    <div className="absolute top-3 right-3 z-10 w-7 h-7 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
      <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
        <path
          d="M2 2L9 9M9 2L2 9"
          stroke="rgba(255,255,255,0.5)"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

export function VyonTryOnInstructionsLeftPanel() {
  return (
    <div className="flex flex-col gap-7">
      <div>
        <h2 className="text-xl font-display font-semibold text-alabaster tracking-tight mb-1">
          Photo Guidelines
        </h2>
      </div>

      {/* Две вертикальные фотографии */}
      <div className="grid grid-cols-2 gap-4">
        {/* DO */}
        <div className="flex flex-col gap-2">
          <div className="relative aspect-[3/4] rounded-xl overflow-hidden border border-accent-gold/25 bg-white/3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={VYON_TRY_ON_INSTRUCTIONS_ASSETS.photosLeft.good}
              alt="Правильное фото"
              className="w-full h-full object-cover"
            />
            <CheckBadge />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent pt-6 pb-2 px-3">
              <span className="text-[9px] font-mono tracking-[0.2em] uppercase text-accent-gold/90">
                DO
              </span>
            </div>
          </div>
        </div>

        {/* DON'T */}
        <div className="flex flex-col gap-2">
          <div className="relative aspect-[3/4] rounded-xl overflow-hidden border border-white/10 bg-white/3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={VYON_TRY_ON_INSTRUCTIONS_ASSETS.photosLeft.bad}
              alt="Неправильное фото"
              className="w-full h-full object-cover opacity-85"
            />
            <CrossBadge />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent pt-6 pb-2 px-3">
              <span className="text-[9px] font-mono tracking-[0.2em] uppercase text-neutral-400">
                DON&apos;T
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Список правил */}
      <ul className="space-y-3.5">
        {BULLETS.map((b) => (
          <li key={b} className="flex items-start gap-3">
            <span className="mt-[0.55rem] shrink-0 w-1.5 h-1.5 rounded-full bg-accent-gold/60" />
            <span className="text-sm text-neutral-400 leading-relaxed">{b}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
