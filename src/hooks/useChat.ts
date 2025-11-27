import { useState, useCallback, useEffect } from 'react';
import { Message } from '@/types/chat';
import { useSession } from './useSession';
import { sendMessageToBackend } from '@/services/chatService';
import { v4 as uuidv4 } from 'uuid';
import { getRandomWelcomeMessage } from '@/lib/welcomeScenarios';
import { removeDemoPrefix } from '@/lib/utils';
import { useDemoMode } from '@/context/DemoContext';
import { useLanguage } from '@/context/LanguageContext';
import {
  isStopMessage,
  parseDemoStart,
  splitMessages,
  DEMO_START_DELAY_MS,
} from '@/lib/demoMessageHandler';

const INITIAL_DELAY = 1000;
const TYPING_DURATION = 2000;
const MESSAGE_GAP = 500;

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const nichePlaceholderRegex = /\$\{niche\}/gi;

const replaceNiche = (template: string, niche: string) =>
  template.replace(nichePlaceholderRegex, niche);

export function useChat() {
  const sessionId = useSession();
  const { isDemoMode, setIsDemoMode } = useDemoMode();
  const { language, t, isLanguageReady, isLanguageConfirmed } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isTyping, setIsTyping] = useState<boolean>(false);

  const addAssistantMessage = useCallback((content: string, wasInDemoMode: boolean) => {
    const cleanedContent = removeDemoPrefix(content);
    const assistantMessage: Message = {
      id: uuidv4(),
      role: 'assistant',
      content: cleanedContent,
      createdAt: new Date(),
      isDemoMode: wasInDemoMode, // Всегда используем явно переданное значение
    };

    setMessages((prev) => [...prev, assistantMessage]);
  }, []);


  const processMessages = useCallback(
    async (messagesArray: string[], wasInDemoMode: boolean) => {
      const queue = messagesArray.map((msg) => msg.trim()).filter(Boolean);

      if (queue.length === 0) {
        return;
      }

      addAssistantMessage(queue[0], wasInDemoMode);

      for (let index = 1; index < queue.length; index += 1) {
        await wait(MESSAGE_GAP);
        setIsTyping(true);
        await wait(TYPING_DURATION);
        setIsTyping(false);
        addAssistantMessage(queue[index], wasInDemoMode);
      }
    },
    [addAssistantMessage]
  );

  const handleSendMessage = useCallback(
    async (text: string) => {
      if (!text.trim()) {
        return;
      }

      const sanitizedText = text.trim();

      // Проверка на стоп-слово сразу после отправки сообщения
      const isStop = isStopMessage(sanitizedText, t.chat.stopKeyword);
      
      // Если это стоп-сообщение, выключаем демо-режим сразу
      if (isStop) {
        setIsDemoMode(false);
      }

      const userMessage: Message = {
        id: uuidv4(),
        role: 'user',
        content: sanitizedText,
        createdAt: new Date(),
        isDemoMode: isDemoMode,
      };

      // Сообщение появляется в чате сразу
      setMessages((prev) => [...prev, userMessage]);
      setIsProcessing(true);

      await wait(INITIAL_DELAY);
      setIsTyping(true);

      try {
        const responseText = await sendMessageToBackend(sanitizedText, sessionId, language);
        
        setIsTyping(false);
        
        // Определяем режим для сообщений: если это стоп-сообщение, то false, иначе текущий isDemoMode
        const currentDemoMode = isStop ? false : isDemoMode;
        
        // Проверка на тег [[DEMO_START::Ниша]]
        const demoResult = parseDemoStart(responseText);
        
        if (demoResult.isDemoStart && demoResult.niche) {
          // Включаем демо-режим сразу
          setIsDemoMode(true);
          
          // Ждем 1.7 секунды после смены темы (0.7 сек анимация + 1 сек задержка)
          await wait(DEMO_START_DELAY_MS);
          
          // Первое системное сообщение - обычное (не желтое)
          addAssistantMessage(
            replaceNiche(t.demo.startMessages.acknowledgement, demoResult.niche),
            false,
          );
          
          await wait(MESSAGE_GAP);
          setIsTyping(true);
          await wait(TYPING_DURATION);
          setIsTyping(false);
          
          // Второе системное сообщение - обычное (не желтое)
          addAssistantMessage(t.demo.startMessages.disclaimer, false);
          
          await wait(MESSAGE_GAP);
          setIsTyping(true);
          await wait(TYPING_DURATION);
          setIsTyping(false);
          
          // Третье сообщение - демонстрационное (желтое)
          addAssistantMessage(demoResult.mainText, true);
        } else {
          // Стандартная обработка (разделение по |||)
          // Если это стоп-сообщение, все сообщения должны быть обычными (false)
          const parts = splitMessages(responseText);
          await processMessages(parts, currentDemoMode);
        }
      } catch (error) {
        setIsTyping(false);
        // Если это стоп-сообщение, ошибка тоже должна быть обычной
        const errorDemoMode = isStop ? false : isDemoMode;
        addAssistantMessage(t.demo.startMessages.error, errorDemoMode);
      } finally {
        setIsProcessing(false);
      }
    },
    [
      addAssistantMessage,
      isDemoMode,
      language,
      processMessages,
      sessionId,
      setIsDemoMode,
      t.demo.startMessages.acknowledgement,
      t.demo.startMessages.disclaimer,
      t.chat.stopKeyword,
      t.demo.startMessages.error,
    ]
  );

  useEffect(() => {
    if (
      !isLanguageReady ||
      !isLanguageConfirmed ||
      messages.length > 0 ||
      typeof window === 'undefined'
    ) {
      return;
    }

    let cancelled = false;

    const runWelcome = async () => {
      const isMobile = window.innerWidth < 768;
      const welcomeMessages = getRandomWelcomeMessage(isMobile, language);

      await wait(INITIAL_DELAY);
      if (cancelled) return;

      setIsTyping(true);
      await wait(TYPING_DURATION);
      if (cancelled) return;

      setIsTyping(false);
      if (cancelled) return;

      // Приветственные сообщения всегда в обычном режиме
      await processMessages(welcomeMessages, false);
    };

    runWelcome();

    return () => {
      cancelled = true;
    };
  }, [
    isLanguageReady,
    isLanguageConfirmed,
    language,
    messages.length,
    processMessages,
  ]);

  return {
    messages,
    isTyping,
    isProcessing,
    sessionId,
    handleSendMessage,
  };
}

