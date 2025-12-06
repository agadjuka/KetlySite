import { useCallback } from 'react';
import { useDemoMode } from '@/context/DemoContext';
import { useLanguage } from '@/context/LanguageContext';

/**
 * Хук для обработки быстрых сообщений с учетом демо-режима
 * Устраняет дублирование логики между страницами
 */
export function useQuickMessage(onSendMessage: (text: string) => void) {
  const { isDemoMode } = useDemoMode();
  const { t } = useLanguage();

  const handleQuickMessage = useCallback(
    (text: string) => {
      if (isDemoMode) {
        onSendMessage(t.chat.stopKeyword);
        setTimeout(() => {
          onSendMessage(text);
        }, 700);
      } else {
        onSendMessage(text);
      }
    },
    [isDemoMode, onSendMessage, t.chat.stopKeyword]
  );

  return handleQuickMessage;
}

