'use client';

import { useEffect } from 'react';
import { getPendingEntries } from '@/lib/feedbackQueue';
import { retryQueuedEntry } from '@/lib/feedbackApi';

const INITIAL_DELAY_MS = 3_000;

/**
 * При монтировании проверяет localStorage на наличие незакрытых заявок
 * (например, браузер был закрыт до получения ответа от сервера).
 * Отправляет их последовательно с небольшой начальной задержкой,
 * чтобы не мешать первичной загрузке страницы.
 */
export function useRetryFeedbackQueue(): void {
  useEffect(() => {
    const timer = setTimeout(async () => {
      const pending = getPendingEntries();
      for (const entry of pending) {
        await retryQueuedEntry(entry.id, entry.payload);
      }
    }, INITIAL_DELAY_MS);

    return () => clearTimeout(timer);
  }, []);
}
