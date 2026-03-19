import React from "react";
import { InstructionSplitImageCard } from "./InstructionSplitImageCard";
import { VYON_MATCH_RULES } from "./matchRules";

export function VyonTryOnInstructionsRightPanel() {
  return (
    <div className="flex flex-col gap-7">
      <div>
        <h2 className="text-xl font-display font-semibold text-alabaster tracking-tight mb-1">
          For a Flawless Result
        </h2>
        <p className="mt-2 text-sm text-neutral-400 leading-relaxed">
          Our AI adapts to any photo. However, for the most realistic visualization, we highly recommend matching your
          clothing length to the item you want to try on.
        </p>
      </div>

      {/* Два подблока в один ряд — зеркалят левый блок */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {VYON_MATCH_RULES.map((r) => (
          <div key={r.key} className="flex flex-col gap-3">
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
        ))}
      </div>
    </div>
  );
}
