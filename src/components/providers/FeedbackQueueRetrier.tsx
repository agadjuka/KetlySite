'use client';

import { useRetryFeedbackQueue } from '@/hooks/useRetryFeedbackQueue';

export function FeedbackQueueRetrier() {
  useRetryFeedbackQueue();
  return null;
}
