'use client';

import { createContext, useContext, useState, useCallback, useMemo, type ReactNode } from 'react';

interface FeedbackSuccessContextValue {
  isVisible: boolean;
  showFeedbackSuccess: () => void;
  hideFeedbackSuccess: () => void;
}

const FeedbackSuccessContext = createContext<FeedbackSuccessContextValue | undefined>(undefined);

export function FeedbackSuccessProvider({ children }: { children: ReactNode }) {
  const [isVisible, setIsVisible] = useState(false);

  const showFeedbackSuccess = useCallback(() => setIsVisible(true), []);
  const hideFeedbackSuccess = useCallback(() => setIsVisible(false), []);

  const value = useMemo(
    () => ({ isVisible, showFeedbackSuccess, hideFeedbackSuccess }),
    [isVisible, showFeedbackSuccess, hideFeedbackSuccess]
  );

  return (
    <FeedbackSuccessContext.Provider value={value}>
      {children}
    </FeedbackSuccessContext.Provider>
  );
}

export function useFeedbackSuccess() {
  const ctx = useContext(FeedbackSuccessContext);
  if (ctx === undefined) {
    throw new Error('useFeedbackSuccess must be used within FeedbackSuccessProvider');
  }
  return ctx;
}
