'use client';

import { useEffect, useRef, useState } from 'react';
import { useFeedbackSuccess } from '@/context/FeedbackSuccessContext';

const FEEDBACK_TITLE = 'Request received';
const FEEDBACK_MESSAGE = 'Our managers will contact you shortly.';
const AUTO_HIDE_MS = 6000;
const EXIT_DURATION_MS = 400;

export function FeedbackSuccessToast() {
  const { isVisible, hideFeedbackSuccess } = useFeedbackSuccess();
  const [isMounted, setIsMounted] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const exitTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (isVisible) {
      const mountTimer = setTimeout(() => {
        setIsMounted(true);
        setIsExiting(false);
      }, 10);

      const hideTimer = setTimeout(() => {
        setIsExiting(true);
        exitTimeoutRef.current = setTimeout(hideFeedbackSuccess, EXIT_DURATION_MS);
      }, AUTO_HIDE_MS);

      return () => {
        clearTimeout(mountTimer);
        clearTimeout(hideTimer);
        if (exitTimeoutRef.current) {
          clearTimeout(exitTimeoutRef.current);
          exitTimeoutRef.current = null;
        }
      };
    }
    setIsMounted(false);
    setIsExiting(false);
  }, [isVisible, hideFeedbackSuccess]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed bottom-24 right-4 lg:right-8 z-[150] ${
        isMounted && !isExiting
          ? 'feedback-success-enter'
          : isExiting
            ? 'feedback-success-exit'
            : 'opacity-0 translate-y-4 scale-[0.97] pointer-events-none'
      }`}
      role="status"
      aria-live="polite"
    >
      <div className="relative bg-[rgba(10,10,10,0.95)] backdrop-blur-xl border border-amber-500/25 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.4)] px-4 py-3 max-w-[280px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-transparent pointer-events-none rounded-xl" />
        <div className="absolute top-0 right-0 w-16 h-16 bg-amber-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="relative flex flex-col gap-1.5">
          <p className="text-[10px] font-mono text-amber-500 uppercase tracking-[0.2em]">
            {FEEDBACK_TITLE}
          </p>
          <p className="text-sm text-[#F8F1E7]/90 font-light leading-snug">
            {FEEDBACK_MESSAGE}
          </p>
        </div>
      </div>
    </div>
  );
}
