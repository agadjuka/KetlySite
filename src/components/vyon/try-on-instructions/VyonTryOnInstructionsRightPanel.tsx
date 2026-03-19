import React from "react";
import { InstructionSplitImageCard } from "./InstructionSplitImageCard";
import { VYON_TRY_ON_INSTRUCTIONS_ASSETS } from "./instructionsAssets";

const RULES = [
  {
    key: "visibility",
    ruleLabel: "Rule: Visibility",
    targetThumbnailTitle: "Target Merch",
    imageSrc: VYON_TRY_ON_INSTRUCTIONS_ASSETS.photosRightSplit.visibility,
    targetThumbnailImageSrc: VYON_TRY_ON_INSTRUCTIONS_ASSETS.targets.merch,
    leftBadgeText: "Full Body",
    rightBadgeText: "Cropped",
  },
  {
    key: "shoulders",
    ruleLabel: "Rule: Shoulders",
    targetThumbnailTitle: "Target Jacket",
    imageSrc: VYON_TRY_ON_INSTRUCTIONS_ASSETS.photosRightSplit.shoulders,
    targetThumbnailImageSrc: VYON_TRY_ON_INSTRUCTIONS_ASSETS.targets.jacket,
    leftBadgeText: "Covered",
    rightBadgeText: "Bare",
  },
] as const;

export function VyonTryOnInstructionsRightPanel() {
  return (
    <div className="flex flex-col gap-7">
      <div>
        <h2 className="text-xl font-display font-semibold text-alabaster tracking-tight mb-1">
          Match &amp; Learn
        </h2>
        <p className="text-xs font-mono uppercase tracking-[0.2em] text-accent-gold/70">
          Совместимость одежды
        </p>
      </div>

      {/* Два подблока в один ряд — зеркалят левый блок */}
      <div className="grid grid-cols-2 gap-4">
        {RULES.map((r) => (
          <div key={r.key} className="flex flex-col gap-2">
            <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-neutral-500">
              {r.ruleLabel}
            </span>
            <InstructionSplitImageCard
              imageSrc={r.imageSrc}
              targetThumbnailTitle={r.targetThumbnailTitle}
              targetThumbnailImageSrc={r.targetThumbnailImageSrc}
              leftBadgeText={r.leftBadgeText}
              rightBadgeText={r.rightBadgeText}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
