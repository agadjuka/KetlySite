const img1 = new URL("./Images/1.jpg", import.meta.url).toString();
const img2 = new URL("./Images/2.jpg", import.meta.url).toString();
const img3 = new URL("./Images/3.jpg", import.meta.url).toString();
const img4 = new URL("./Images/4.jpg", import.meta.url).toString();
const img5 = new URL("./Images/5.jpg", import.meta.url).toString();
const img6 = new URL("./Images/6.jpg", import.meta.url).toString();

export const VYON_TRY_ON_INSTRUCTIONS_ASSETS = {
  photosLeft: {
    good: img1,
    bad: img2,
  },
  photosRightSplit: {
    visibility: img3,
    shoulders: img4,
  },
  targets: {
    merch: img5,
    jacket: img6,
  },
} as const;

export const PHOTO_GUIDELINES_BULLETS = [
  "Upload a clear, front-facing portrait with good lighting and natural posture.",
  "Wear clothing of a similar length to the item you are trying on. Avoid swimwear or heavy exposure.",
  "Avoid excessively loose or oversized garments so the AI can map your proportions accurately.",
] as const;

