'use client';

import { useManagerNotification } from '@/context/ManagerNotificationContext';
import { MessageSquare } from 'lucide-react';

export function TestManagerNotificationButton() {
  const { showNotification } = useManagerNotification();

  const handleTest = () => {
    showNotification('Это тестовое сообщение для настройки уведомления менеджера. Здесь может быть любой текст, который приходит с командой [[CALL_MANAGER]].');
  };

  return (
    <button
      onClick={handleTest}
      className="fixed top-20 right-4 z-[99] p-2.5 bg-sky-500/20 hover:bg-sky-500/30 border border-sky-400/30 rounded-lg backdrop-blur-sm text-sky-300 hover:text-sky-200 transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg shadow-sky-500/10"
      title="Тест уведомления менеджера"
      aria-label="Тест уведомления менеджера"
    >
      <MessageSquare className="w-5 h-5" />
    </button>
  );
}

