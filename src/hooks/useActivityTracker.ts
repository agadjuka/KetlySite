import { useEffect } from 'react';
import { updateActivityTimestamp } from '@/lib/chatHistoryStorage';

/**
 * Хук для отслеживания активности пользователя и обновления timestamp сессии
 * Используется только на главной странице для сохранения истории чата
 */
export function useActivityTracker(isEnabled: boolean) {
  useEffect(() => {
    if (!isEnabled || typeof window === 'undefined') {
      return;
    }

    // Список событий, которые считаются активностью пользователя
    const activityEvents = [
      'mousedown',
      'mousemove',
      'keypress',
      'scroll',
      'touchstart',
      'click',
    ];

    // Функция для обновления timestamp с debounce (не чаще раза в 30 секунд)
    let lastUpdate = 0;
    const DEBOUNCE_MS = 30000; // 30 секунд

    const handleActivity = () => {
      const now = Date.now();
      if (now - lastUpdate > DEBOUNCE_MS) {
        updateActivityTimestamp();
        lastUpdate = now;
      }
    };

    // Добавляем обработчики событий
    activityEvents.forEach((event) => {
      window.addEventListener(event, handleActivity, { passive: true });
    });

    // Очистка при размонтировании
    return () => {
      activityEvents.forEach((event) => {
        window.removeEventListener(event, handleActivity);
      });
    };
  }, [isEnabled]);
}


