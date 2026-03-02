/**
 * Конфигурация виджета Virtual Try-On.
 * Изображения берутся из public/images/virtual-tryon/ (деплоятся с сайтом, как на странице Vyon).
 * Нужны файлы: original.jpg, garment-1.jpg, garment-2.jpg, garment-3.jpg, result-1.jpg, result-2.jpg, result-3.jpg
 */

const BASE = '/images/virtual-tryon';

export interface GarmentItem {
  id: number;
  garmentImage: string;
  resultImage: string;
  labelShort: string;
  labelLong: string;
  category?: string;
}

export const VIRTUAL_TRYON_IMAGES = {
  original: `${BASE}/original.jpg`,
} as const;

export const VIRTUAL_TRYON_GARMENTS: GarmentItem[] = [
  {
    id: 0,
    garmentImage: `${BASE}/garment-1.jpg`,
    resultImage: `${BASE}/result-1.jpg`,
    labelShort: '',
    labelLong: 'Blue Dress "Infinity"',
    category: 'Essential',
  },
  {
    id: 1,
    garmentImage: `${BASE}/garment-2.jpg`,
    resultImage: `${BASE}/result-2.jpg`,
    labelShort: '',
    labelLong: 'Red Suit "Classic"',
    category: 'Premium',
  },
  {
    id: 2,
    garmentImage: `${BASE}/garment-3.jpg`,
    resultImage: `${BASE}/result-3.jpg`,
    labelShort: '',
    labelLong: 'Yellow Blouse "Sunrise"',
    category: 'Bespoke',
  },
];

export const VIRTUAL_TRYON_ASSET_PATHS = {
  original: `${BASE}/original.jpg`,
  garments: [`${BASE}/garment-1.jpg`, `${BASE}/garment-2.jpg`, `${BASE}/garment-3.jpg`] as const,
  results: [`${BASE}/result-1.jpg`, `${BASE}/result-2.jpg`, `${BASE}/result-3.jpg`] as const,
} as const;
