'use client';

import { useEffect, useState } from 'react';
import { useManagerNotification } from '@/context/ManagerNotificationContext';
import { useLanguage } from '@/context/LanguageContext';

export function ManagerNotification() {
  const { message, isVisible, hideNotification } = useManagerNotification();
  const { t } = useLanguage();
  const [isMounted, setIsMounted] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (isVisible && message) {
      // Небольшая задержка для плавного появления
      const mountTimer = setTimeout(() => {
        setIsMounted(true);
        setIsExiting(false);
      }, 10);
      
      // Автоматически скрываем через 8 секунд
      const hideTimer = setTimeout(() => {
        setIsExiting(true);
        setTimeout(() => {
          hideNotification();
        }, 300); // Время анимации исчезновения
      }, 8000);
      
      return () => {
        clearTimeout(mountTimer);
        clearTimeout(hideTimer);
      };
    } else {
      setIsMounted(false);
      setIsExiting(false);
    }
  }, [isVisible, message, hideNotification]);

  if (!isVisible || !message) {
    return null;
  }

  // Убираем множественные переносы строк (заменяем 2+ переноса на один)
  const cleanedMessage = message.replace(/\n{2,}/g, '\n').trim();

  return (
    <div
      className={`fixed bottom-24 right-4 lg:right-8 z-[100] ${
        isMounted && !isExiting
          ? 'manager-notification-enter'
          : 'opacity-0 translate-y-2 scale-95 pointer-events-none'
      }`}
      style={{
        transition: isExiting ? 'opacity 0.3s ease-out, transform 0.3s ease-out' : undefined,
      }}
    >
      <div className="relative bg-gradient-to-br from-sky-500/20 via-blue-500/15 to-blue-600/20 backdrop-blur-xl border border-sky-400/30 rounded-xl shadow-2xl shadow-sky-500/20 px-4 py-3 max-w-xs mx-auto overflow-hidden">
        {/* Блестящий эффект */}
        <div className="absolute inset-0 manager-notification-shimmer pointer-events-none" />
        
        {/* Декоративные элементы */}
        <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-sky-400/50 rounded-full blur-[2px] animate-pulse" />
        <div className="absolute -bottom-0.5 -left-0.5 w-1.5 h-1.5 bg-blue-400/40 rounded-full blur-[2px]" />

        {/* Заголовок */}
        <div className="flex items-center gap-1.5 mb-1.5">
          <div className="w-1.5 h-1.5 bg-sky-400 rounded-full animate-pulse flex-shrink-0" />
          <p className="text-[10px] font-medium text-sky-300/90 uppercase tracking-wider leading-tight">
            {t.chat.managerNotificationTitle}
          </p>
        </div>

        {/* Текст сообщения */}
        <p className="text-xs text-white/90 leading-relaxed break-words whitespace-pre-wrap">
          {cleanedMessage}
        </p>

        {/* Хвостик облачка */}
        <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-gradient-to-br from-sky-500/20 to-blue-600/20 border-l border-b border-sky-400/30 rotate-45 rounded-bl-sm" />
      </div>
    </div>
  );
}

