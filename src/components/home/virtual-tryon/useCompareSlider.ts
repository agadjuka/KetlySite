'use client';

import { useCallback, useState, useEffect, useRef } from 'react';

const MIN = 5;
const MAX = 95;

/** Вправо почти до конца → влево почти до конца → центр. Длительность каждой фазы (мс). */
const PHASE_DURATION_MS = 900;
const INTRO_RIGHT = MAX - 5;
const INTRO_LEFT = MIN + 5;

export function useCompareSlider(initialPercent = 50, runIntroWhenInView = false) {
  const [percent, setPercent] = useState(initialPercent);
  const [isIntroPhase, setIsIntroPhase] = useState(false);
  const hasRunIntroRef = useRef(false);

  useEffect(() => {
    if (!runIntroWhenInView || hasRunIntroRef.current) return;
    hasRunIntroRef.current = true;
    setIsIntroPhase(true);

    const t1 = setTimeout(() => setPercent(INTRO_RIGHT), 0);
    const t2 = setTimeout(() => setPercent(INTRO_LEFT), PHASE_DURATION_MS);
    const t3 = setTimeout(() => setPercent(initialPercent), PHASE_DURATION_MS * 2);
    const t4 = setTimeout(() => setIsIntroPhase(false), PHASE_DURATION_MS * 3);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [runIntroWhenInView, initialPercent]);

  const setFromEvent = useCallback((clientX: number, rect: DOMRect) => {
    const x = clientX - rect.left;
    const pct = (x / rect.width) * 100;
    setPercent(Math.min(MAX, Math.max(MIN, pct)));
  }, []);

  return { percent, setPercent, setFromEvent, isIntroPhase };
}
