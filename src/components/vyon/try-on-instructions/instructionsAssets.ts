/**
 * Статические изображения инструкции Try-On.
 * Лежат в public/images/vyon/try-on-instructions/ — как остальные картинки сайта,
 * попадают в деплой вместе с папкой public.
 */
const BASE = "/images/vyon/try-on-instructions";

export const VYON_TRY_ON_INSTRUCTIONS_ASSETS = {
  photosLeft: {
    good: `${BASE}/1.jpg`,
    bad: `${BASE}/2.jpg`,
  },
  photosRightSplit: {
    visibility: `${BASE}/3.jpg`,
    shoulders: `${BASE}/4.jpg`,
  },
  targets: {
    merch: `${BASE}/5.jpg`,
    jacket: `${BASE}/6.jpg`,
  },
} as const;

/** Все URL для префетча (VyonImagePreloader и т.п.) */
export const VYON_TRY_ON_INSTRUCTIONS_IMAGE_URLS = [
  VYON_TRY_ON_INSTRUCTIONS_ASSETS.photosLeft.good,
  VYON_TRY_ON_INSTRUCTIONS_ASSETS.photosLeft.bad,
  VYON_TRY_ON_INSTRUCTIONS_ASSETS.photosRightSplit.visibility,
  VYON_TRY_ON_INSTRUCTIONS_ASSETS.photosRightSplit.shoulders,
  VYON_TRY_ON_INSTRUCTIONS_ASSETS.targets.merch,
  VYON_TRY_ON_INSTRUCTIONS_ASSETS.targets.jacket,
] as const;

export const PHOTO_GUIDELINES_BULLETS = [
  "Upload a clear, front-facing portrait with good lighting and natural posture.",
  "Wear clothing of a similar length to the item you are trying on. Avoid swimwear or heavy exposure.",
  "Avoid excessively loose or oversized garments so the AI can map your proportions accurately.",
] as const;
