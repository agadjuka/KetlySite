'use client';

import { useCallback, useState } from 'react';

const MIN = 5;
const MAX = 95;

export function useCompareSlider(initialPercent = 50) {
  const [percent, setPercent] = useState(() =>
    Math.min(MAX, Math.max(MIN, initialPercent))
  );

  const setFromEvent = useCallback((clientX: number, rect: DOMRect) => {
    const x = clientX - rect.left;
    const pct = (x / rect.width) * 100;
    setPercent(Math.min(MAX, Math.max(MIN, pct)));
  }, []);

  return { percent, setPercent, setFromEvent };
}
