"use client";

import React from "react";
import { InstructionSplitImageCard } from "./InstructionSplitImageCard";
import type { VyonMatchRule } from "./matchRules";

interface VyonMatchRulesCarouselMobileProps {
  rules: readonly VyonMatchRule[];
}

export function VyonMatchRulesCarouselMobile({
  rules,
}: VyonMatchRulesCarouselMobileProps) {
  return (
    <div className="w-full">
      <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-hide -mx-2 px-2">
        {rules.map((r) => (
          <div
            key={r.key}
            className="snap-center flex-none w-[70%] min-w-[70%]"
          >
            <div className="flex flex-col gap-3">
              <InstructionSplitImageCard
                imageSrc={r.imageSrc}
                targetThumbnailTitle={r.targetThumbnailTitle}
                targetThumbnailImageSrc={r.targetThumbnailImageSrc}
                leftBadgeText={r.leftBadgeText}
                rightBadgeText={r.rightBadgeText}
                showBottomMarks
              />
              <p className="text-xs text-neutral-400 leading-relaxed">
                {r.description}
              </p>
            </div>
          </div>
        ))}
        <div className="flex-none w-[10%]" aria-hidden />
      </div>
    </div>
  );
}

