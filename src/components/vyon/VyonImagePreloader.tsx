'use client';

import { useEffect } from 'react';
import { VYON_TRY_ON_INSTRUCTIONS_ASSETS } from './try-on-instructions/instructionsAssets';

/** Все статические изображения страницы Vyon (из public), подгружаются в кэш при открытии страницы */
const VYON_PRELOAD_IMAGES = [
  '/images/Casual_Set.jpg',
  '/images/Dress.jpg',
  '/images/Jacket.jpg',
  '/images/Camel_Wool_Coat.jpg',
  '/images/vyon/complete-looks/1.jpg',
  '/images/vyon/complete-looks/2.jpg',
  '/images/vyon/complete-looks/3.jpg',
  '/images/vyon/complete-looks/4.jpg',
  // Инструкции для Try-On (модалка)
  VYON_TRY_ON_INSTRUCTIONS_ASSETS.photosLeft.good,
  VYON_TRY_ON_INSTRUCTIONS_ASSETS.photosLeft.bad,
  VYON_TRY_ON_INSTRUCTIONS_ASSETS.photosRightSplit.visibility,
  VYON_TRY_ON_INSTRUCTIONS_ASSETS.photosRightSplit.shoulders,
  VYON_TRY_ON_INSTRUCTIONS_ASSETS.targets.merch,
  VYON_TRY_ON_INSTRUCTIONS_ASSETS.targets.jacket,
];

function preloadImage(src: string) {
  const img = new Image();
  img.src = src;
}

export function VyonImagePreloader() {
  useEffect(() => {
    VYON_PRELOAD_IMAGES.forEach(preloadImage);
  }, []);
  return null;
}
