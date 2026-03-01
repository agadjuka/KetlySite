'use client';

import { useState, useCallback } from 'react';

export function useGarmentSelection(initialIndex = 0) {
  const [selectedIndex, setSelectedIndex] = useState(initialIndex);
  const select = useCallback((index: number) => setSelectedIndex(index), []);
  return { selectedIndex, select };
}
