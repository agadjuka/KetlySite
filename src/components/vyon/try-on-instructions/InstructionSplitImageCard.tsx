import React from "react";

interface InstructionSplitImageCardProps {
  imageSrc: string;
  targetThumbnailTitle: string;
  targetThumbnailImageSrc?: string;
  leftBadgeText: string;
  rightBadgeText: string;
  showBottomMarks?: boolean;
  /** Растягивает карточку на всю высоту родителя (flex-1 / h-full в цепочке) */
  fillHeight?: boolean;
}

export function InstructionSplitImageCard({
  imageSrc,
  targetThumbnailTitle,
  targetThumbnailImageSrc,
  leftBadgeText,
  rightBadgeText,
  showBottomMarks = true,
  fillHeight = false,
}: InstructionSplitImageCardProps) {
  return (
    <div className={`relative w-full rounded-xl overflow-hidden border border-white/8 bg-neutral-950/60 ${fillHeight ? 'h-full' : ''}`}>
      {/* Target thumbnail — плавающий бейдж */}
      <div className="absolute top-[clamp(8px,2.2vw,10px)] left-[clamp(10px,2.6vw,12px)] z-20 flex items-center gap-[clamp(6px,1.6vw,8px)] bg-black/65 backdrop-blur-md h-[clamp(40px,8vw,48px)] px-[clamp(8px,2.2vw,10px)] rounded-lg border border-white/10">
        <div className="w-[clamp(34px,7vw,44px)] h-[clamp(34px,7vw,44px)] rounded-md overflow-hidden bg-white/5 flex items-center justify-center shrink-0">
          {targetThumbnailImageSrc ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={targetThumbnailImageSrc}
              alt={targetThumbnailTitle}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="material-symbols-outlined text-accent-gold/70 text-[clamp(16px,4.2vw,18px)]">
              checkroom
            </span>
          )}
        </div>
        <span className="text-[clamp(9px,2.2vw,10px)] font-mono uppercase tracking-[0.15em] text-white/80 whitespace-nowrap">
          {targetThumbnailTitle}
        </span>
      </div>

      {/* Изображение */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imageSrc}
        alt={targetThumbnailTitle}
        className={fillHeight ? 'absolute inset-0 w-full h-full object-cover object-top' : 'block w-full h-auto'}
      />

      {/* Тонкая вертикальная линия строго по центру */}
      <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[2px] bg-accent-gold/70 z-10 shadow-[0_0_12px_rgba(191,161,95,0.45)]" />

      {/* Бейдж DO (левая половина) */}
      <div className="absolute bottom-[clamp(8px,2.2vw,10px)] left-[clamp(10px,2.6vw,12px)] z-20 flex items-center gap-[clamp(6px,1.6vw,8px)] px-[clamp(8px,2.2vw,10px)] py-[clamp(4px,1.2vw,6px)] rounded-md bg-black/60 backdrop-blur-sm border border-accent-gold/40">
        {showBottomMarks && (
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true" className="shrink-0">
            <path
              d="M1.5 5L4 7.5L8.5 2.5"
              stroke="#bfa15f"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
        <span className="text-[clamp(8px,2vw,9px)] font-mono tracking-[0.15em] uppercase text-accent-gold/90">
          {leftBadgeText}
        </span>
      </div>

      {/* Бейдж DON'T (правая половина) */}
      <div className="absolute bottom-[clamp(8px,2.2vw,10px)] right-[clamp(10px,2.6vw,12px)] z-20 flex items-center gap-[clamp(6px,1.6vw,8px)] px-[clamp(8px,2.2vw,10px)] py-[clamp(4px,1.2vw,6px)] rounded-md bg-black/60 backdrop-blur-sm border border-white/15">
        {showBottomMarks && (
          <svg width="9" height="9" viewBox="0 0 9 9" fill="none" aria-hidden="true" className="shrink-0">
            <path
              d="M2 2L7 7M7 2L2 7"
              stroke="rgba(255,255,255,0.45)"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        )}
        <span className="text-[clamp(8px,2vw,9px)] font-mono tracking-[0.15em] uppercase text-neutral-400">
          {rightBadgeText}
        </span>
      </div>
    </div>
  );
}
