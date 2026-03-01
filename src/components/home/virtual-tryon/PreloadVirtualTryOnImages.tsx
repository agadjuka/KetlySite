'use client';

import { useEffect } from 'react';
import {
  VIRTUAL_TRYON_IMAGES,
  VIRTUAL_TRYON_GARMENTS,
} from './virtualTryOnConfig';

/** Предзагрузка всех изображений виджета Virtual Try-On при открытии страницы. */
export function PreloadVirtualTryOnImages() {
  useEffect(() => {
    const urls: string[] = [VIRTUAL_TRYON_IMAGES.original];
    VIRTUAL_TRYON_GARMENTS.forEach((g) => {
      urls.push(g.garmentImage, g.resultImage);
    });
    urls.forEach((href) => {
      const img = new Image();
      img.src = href;
    });
  }, []);
  return null;
}
