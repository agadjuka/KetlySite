import { VYON_TRY_ON_INSTRUCTIONS_ASSETS } from "./instructionsAssets";

export type VyonMatchRule = {
  key: "length" | "sleeves";
  targetThumbnailTitle: string;
  imageSrc: string;
  targetThumbnailImageSrc?: string;
  leftBadgeText: string;
  rightBadgeText: string;
  description: string;
};

export const VYON_MATCH_RULES: readonly VyonMatchRule[] = [
  {
    key: "length",
    targetThumbnailTitle: "LONG GARMENTS",
    imageSrc: VYON_TRY_ON_INSTRUCTIONS_ASSETS.photosRightSplit.visibility,
    targetThumbnailImageSrc: VYON_TRY_ON_INSTRUCTIONS_ASSETS.targets.merch,
    leftBadgeText: "LONG CLOTHING",
    rightBadgeText: "SHORT",
    description:
      "For maxi dresses or pants, wearing long clothing helps the AI map the fabric perfectly to the floor.",
  },
  {
    key: "sleeves",
    targetThumbnailTitle: "LONG SLEEVES",
    imageSrc: VYON_TRY_ON_INSTRUCTIONS_ASSETS.photosRightSplit.shoulders,
    targetThumbnailImageSrc: VYON_TRY_ON_INSTRUCTIONS_ASSETS.targets.jacket,
    leftBadgeText: "LONG SLEEVES",
    rightBadgeText: "SHORT",
    description:
      "For jackets or sweaters, wearing long sleeves ensures the most realistic texture rendering on your arms.",
  },
] as const;

