import { useState, useCallback } from 'react';
import { Message } from '@/types/chat';
import { useSession } from './useSession';
import { sendMessageToBackend } from '@/services/chatService';
import { v4 as uuidv4 } from 'uuid';

export function useChat() {
  const sessionId = useSession();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || isLoading) {
        return;
      }

      const userMessage: Message = {
        id: uuidv4(),
        role: 'user',
        content: text.trim(),
        createdAt: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setIsLoading(true);

      try {
        const responseText = await sendMessageToBackend(text.trim(), sessionId);

        const assistantMessage: Message = {
          id: uuidv4(),
          role: 'assistant',
          content: responseText,
          createdAt: new Date(),
        };

        setMessages((prev) => [...prev, assistantMessage]);
      } catch (error) {
        const errorMessage: Message = {
          id: uuidv4(),
          role: 'assistant',
          content: 'Ошибка связи',
          createdAt: new Date(),
        };

        setMessages((prev) => [...prev, errorMessage]);
      } finally {
        setIsLoading(false);
      }
    },
    [sessionId, isLoading]
  );

  return {
    messages,
    isLoading,
    sessionId,
    handleSendMessage,
  };
}

