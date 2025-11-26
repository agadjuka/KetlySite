/**
 * Утилиты для обработки touch-событий и предотвращения нежелательных свайпов
 */

export interface TouchPosition {
  x: number;
  y: number;
}

/**
 * Предотвращает нежелательные свайпы (горизонтальные и диагональные)
 * Разрешает только вертикальную прокрутку в указанных элементах
 */
export function preventUnwantedSwipes(
  element: HTMLElement,
  options: {
    allowHorizontal?: boolean;
    allowVertical?: boolean;
    threshold?: number;
  } = {}
): () => void {
  const {
    allowHorizontal = false,
    allowVertical = true,
    threshold = 10,
  } = options;

  let startTouch: TouchPosition | null = null;
  let isScrolling = false;

  const handleTouchStart = (e: TouchEvent) => {
    if (e.touches.length === 1) {
      startTouch = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      };
      isScrolling = false;
    }
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!startTouch || e.touches.length !== 1) return;

    const currentTouch = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };

    const deltaX = Math.abs(currentTouch.x - startTouch.x);
    const deltaY = Math.abs(currentTouch.y - startTouch.y);

    // Определяем направление движения
    const isHorizontalSwipe = deltaX > deltaY && deltaX > threshold;
    const isVerticalSwipe = deltaY > deltaX && deltaY > threshold;

    // Если это горизонтальный свайп и он не разрешен - блокируем
    if (isHorizontalSwipe && !allowHorizontal) {
      e.preventDefault();
      return;
    }

    // Если это вертикальный свайп
    if (isVerticalSwipe) {
      if (allowVertical) {
        isScrolling = true;
      } else {
        e.preventDefault();
        return;
      }
    }
  };

  const handleTouchEnd = () => {
    startTouch = null;
    isScrolling = false;
  };

  element.addEventListener('touchstart', handleTouchStart, { passive: false });
  element.addEventListener('touchmove', handleTouchMove, { passive: false });
  element.addEventListener('touchend', handleTouchEnd, { passive: true });

  // Функция очистки
  return () => {
    element.removeEventListener('touchstart', handleTouchStart);
    element.removeEventListener('touchmove', handleTouchMove);
    element.removeEventListener('touchend', handleTouchEnd);
  };
}

/**
 * Предотвращает масштабирование при двойном тапе
 */
export function preventDoubleTapZoom(element: HTMLElement): () => void {
  let lastTap = 0;
  const delay = 300;

  const handleTouchEnd = (e: TouchEvent) => {
    const currentTime = Date.now();
    const tapLength = currentTime - lastTap;

    if (tapLength < delay && tapLength > 0) {
      e.preventDefault();
    }

    lastTap = currentTime;
  };

  element.addEventListener('touchend', handleTouchEnd, { passive: false });

  return () => {
    element.removeEventListener('touchend', handleTouchEnd);
  };
}

/**
 * Предотвращает случайные свайпы при прокрутке
 */
export function preventAccidentalSwipes(element: HTMLElement): () => void {
  let touchStartY = 0;
  let touchStartX = 0;
  let isVerticalScroll = false;

  const handleTouchStart = (e: TouchEvent) => {
    touchStartY = e.touches[0].clientY;
    touchStartX = e.touches[0].clientX;
    isVerticalScroll = false;
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!touchStartY || !touchStartX) return;

    const touchY = e.touches[0].clientY;
    const touchX = e.touches[0].clientX;

    const deltaY = Math.abs(touchY - touchStartY);
    const deltaX = Math.abs(touchX - touchStartX);

    // Если движение в основном вертикальное - разрешаем прокрутку
    if (deltaY > deltaX && deltaY > 5) {
      isVerticalScroll = true;
    }

    // Если движение горизонтальное и не было вертикальной прокрутки - блокируем
    if (deltaX > deltaY && deltaX > 10 && !isVerticalScroll) {
      e.preventDefault();
    }
  };

  const handleTouchEnd = () => {
    touchStartY = 0;
    touchStartX = 0;
    isVerticalScroll = false;
  };

  element.addEventListener('touchstart', handleTouchStart, { passive: true });
  element.addEventListener('touchmove', handleTouchMove, { passive: false });
  element.addEventListener('touchend', handleTouchEnd, { passive: true });

  return () => {
    element.removeEventListener('touchstart', handleTouchStart);
    element.removeEventListener('touchmove', handleTouchMove);
    element.removeEventListener('touchend', handleTouchEnd);
  };
}



