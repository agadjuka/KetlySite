import React from "react";
import {
  VYON_TRY_ON_INSTRUCTIONS_ASSETS,
  PHOTO_GUIDELINES_BULLETS,
} from "./instructionsAssets";

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

      {/* DO / DON'T фотографии */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <div className="relative aspect-[3/4] rounded-xl overflow-hidden border border-accent-gold/25 bg-white/3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={VYON_TRY_ON_INSTRUCTIONS_ASSETS.photosLeft.good}
              alt="DO example"
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

        <div className="flex flex-col gap-2">
          <div className="relative aspect-[3/4] rounded-xl overflow-hidden border border-white/10 bg-white/3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={VYON_TRY_ON_INSTRUCTIONS_ASSETS.photosLeft.bad}
              alt="DON'T example"
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
        {PHOTO_GUIDELINES_BULLETS.map((b) => (
          <li key={b} className="flex items-start gap-3">
            <span className="mt-[0.55rem] shrink-0 w-1.5 h-1.5 rounded-full bg-accent-gold/60" />
            <span className="text-sm text-neutral-400 leading-relaxed">{b}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
