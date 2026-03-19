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

