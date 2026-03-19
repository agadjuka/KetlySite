import React from "react";

interface InstructionSplitImageCardProps {
  imageSrc: string;
  targetThumbnailTitle: string;
  targetThumbnailImageSrc?: string;
  leftBadgeText: string;
  rightBadgeText: string;
}

export function InstructionSplitImageCard({
  imageSrc,
  targetThumbnailTitle,
  targetThumbnailImageSrc,
  leftBadgeText,
  rightBadgeText,
}: InstructionSplitImageCardProps) {
  return (
    <div className="relative w-full rounded-xl overflow-hidden border border-white/8 bg-neutral-950/60">
      {/* Target thumbnail — плавающий бейдж */}
      <div className="absolute top-2 left-3 z-20 flex items-center gap-2 bg-black/65 backdrop-blur-md h-12 px-2.5 rounded-lg border border-white/10">
        <div className="w-11 h-11 rounded-md overflow-hidden bg-white/5 flex items-center justify-center shrink-0">
          {targetThumbnailImageSrc ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={targetThumbnailImageSrc}
              alt={targetThumbnailTitle}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="material-symbols-outlined text-accent-gold/70 text-lg">
              checkroom
            </span>
          )}
        </div>
        <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-white/80 whitespace-nowrap">
          {targetThumbnailTitle}
        </span>
      </div>

      {/* Изображение: растягивается по высоте */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imageSrc}
        alt={targetThumbnailTitle}
        className="block w-full h-auto"
      />

      {/* Тонкая вертикальная линия строго по центру */}
      <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-px bg-white/35 z-10 shadow-[0_0_6px_rgba(255,255,255,0.15)]" />

      {/* Бейдж DO (левая половина) */}
      <div className="absolute bottom-2 left-3 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-sm border border-accent-gold/40">
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
          <path
            d="M1.5 5L4 7.5L8.5 2.5"
            stroke="#bfa15f"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="text-[9px] font-mono tracking-[0.15em] uppercase text-accent-gold/90">
          {leftBadgeText}
        </span>
      </div>

      {/* Бейдж DON'T (правая половина) */}
      <div className="absolute bottom-2 right-3 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-sm border border-white/15">
        <svg width="9" height="9" viewBox="0 0 9 9" fill="none" aria-hidden="true">
          <path
            d="M2 2L7 7M7 2L2 7"
            stroke="rgba(255,255,255,0.45)"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
        <span className="text-[9px] font-mono tracking-[0.15em] uppercase text-neutral-400">
          {rightBadgeText}
        </span>
      </div>
    </div>
  );
}
