import { useState, useCallback, useEffect } from 'react';
import { Message } from '@/types/chat';
import { useSession } from './useSession';
import { sendMessageToBackend } from '@/services/chatService';
import { v4 as uuidv4 } from 'uuid';
import { getRandomWelcomeMessage } from '@/lib/welcomeScenarios';
import { removeDemoPrefix } from '@/lib/utils';

const INITIAL_DELAY = 1000;
const TYPING_DURATION = 2000;
const MESSAGE_GAP = 500;

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export function useChat() {
  const sessionId = useSession();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isTyping, setIsTyping] = useState<boolean>(false);

  const addAssistantMessage = useCallback((content: string) => {
    const cleanedContent = removeDemoPrefix(content);
    const assistantMessage: Message = {
      id: uuidv4(),
      role: 'assistant',
      content: cleanedContent,
      createdAt: new Date(),
    };

    setMessages((prev) => [...prev, assistantMessage]);
  }, []);

  const processMessages = useCallback(
    async (messagesArray: string[]) => {
      const queue = messagesArray.map((msg) => msg.trim()).filter(Boolean);

      if (queue.length === 0) {
        return;
      }

      addAssistantMessage(queue[0]);

      for (let index = 1; index < queue.length; index += 1) {
        await wait(MESSAGE_GAP);
        setIsTyping(true);
        await wait(TYPING_DURATION);
        setIsTyping(false);
        addAssistantMessage(queue[index]);
      }
    },
    [addAssistantMessage]
  );

  const handleSendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || isProcessing) {
        return;
      }

      const sanitizedText = text.trim();

      const userMessage: Message = {
        id: uuidv4(),
        role: 'user',
        content: sanitizedText,
        createdAt: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setIsProcessing(true);

      await wait(INITIAL_DELAY);
      setIsTyping(true);

      try {
        const responseText = await sendMessageToBackend(sanitizedText, sessionId);
        const parts = responseText.split('|||').map((part) => part.trim());

        setIsTyping(false);
        await processMessages(parts);
      } catch (error) {
        setIsTyping(false);
        addAssistantMessage('Ошибка связи');
      } finally {
        setIsProcessing(false);
      }
    },
    [addAssistantMessage, isProcessing, processMessages, sessionId]
  );

  useEffect(() => {
    if (messages.length > 0) {
      return;
    }

    let cancelled = false;

    const runWelcome = async () => {
      const isMobile = window.innerWidth < 768;
      const welcomeMessages = getRandomWelcomeMessage(isMobile);

      await wait(INITIAL_DELAY);
      if (cancelled) return;

      setIsTyping(true);
      await wait(TYPING_DURATION);
      if (cancelled) return;

      setIsTyping(false);
      if (cancelled) return;

      await processMessages(welcomeMessages);
    };

    runWelcome();

    return () => {
      cancelled = true;
    };
  }, [messages.length, processMessages]);

  return {
    messages,
    isTyping,
    isProcessing,
    sessionId,
    handleSendMessage,
  };
}

