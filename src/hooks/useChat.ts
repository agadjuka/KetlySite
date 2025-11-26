import { useState, useCallback, useEffect } from 'react';
import { Message } from '@/types/chat';
import { useSession } from './useSession';
import { sendMessageToBackend } from '@/services/chatService';
import { v4 as uuidv4 } from 'uuid';
import { getRandomWelcomeMessage } from '@/lib/welcomeScenarios';
import { removeDemoPrefix } from '@/lib/utils';
import { useDemoMode } from '@/context/DemoContext';

const INITIAL_DELAY = 1000;
const TYPING_DURATION = 2000;
const MESSAGE_GAP = 500;

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export function useChat() {
  const sessionId = useSession();
  const { isDemoMode, setIsDemoMode } = useDemoMode();
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
      if (!text.trim() || isProcessing) {
        return;
      }

      const sanitizedText = text.trim();

      // Проверка на стоп-слово сразу после отправки сообщения
      const stopWords = ['стоп', 'stop'];
      const normalizedText = sanitizedText.toLowerCase().trim();
      const isStopMessage = stopWords.includes(normalizedText);
      
      // Если это стоп-сообщение, выключаем демо-режим сразу
      if (isStopMessage) {
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
        const responseText = await sendMessageToBackend(sanitizedText, sessionId);
        
        setIsTyping(false);
        
        // Определяем режим для сообщений: если это стоп-сообщение, то false, иначе текущий isDemoMode
        // Но нужно проверить актуальное состояние после возможного изменения
        const currentDemoMode = isStopMessage ? false : isDemoMode;
        
        // Проверка на тег [[DEMO_START::Ниша]]
        const demoStartRegex = /\[\[DEMO_START::(.*?)\]\]/;
        const demoMatch = responseText.match(demoStartRegex);
        
        if (demoMatch) {
          // Включаем демо-режим сразу
          setIsDemoMode(true);
          
          // Извлекаем нишу из тега
          const niche = demoMatch[1].trim();
          
          // Извлекаем основной текст (всё после закрывающих скобок ]])
          const mainText = responseText.replace(demoStartRegex, '').trim();
          
          // Ждем 1.7 секунды после смены темы (0.7 сек анимация + 1 сек задержка)
          await wait(1700);
          
          // Первое системное сообщение - обычное (не желтое)
          addAssistantMessage(`Отлично! Сейчас я буду играть роль администратора ${niche}. Если захотите остановить демонстрацию и снова обсудить мои услуги— просто напишите «Стоп».`, false);
          
          await wait(MESSAGE_GAP);
          setIsTyping(true);
          await wait(TYPING_DURATION);
          setIsTyping(false);
          
          // Второе системное сообщение - обычное (не желтое)
          addAssistantMessage('Важный момент: сейчас я импровизирую.  Стиль общения, тон и данные о работе организации я подобрала сама для примера. При реальной работе я буду общаться строго в стиле вашего бренда, а также использовать данные вашей системы.', false);
          
          await wait(MESSAGE_GAP);
          setIsTyping(true);
          await wait(TYPING_DURATION);
          setIsTyping(false);
          
          // Третье сообщение - демонстрационное (желтое)
          addAssistantMessage(mainText, true);
        } else {
          // Стандартная обработка (разделение по |||)
          // Если это стоп-сообщение, все сообщения должны быть обычными (false)
          const parts = responseText.split('|||').map((part) => part.trim());
          await processMessages(parts, currentDemoMode);
        }
      } catch (error) {
        setIsTyping(false);
        // Если это стоп-сообщение, ошибка тоже должна быть обычной
        const errorDemoMode = isStopMessage ? false : isDemoMode;
        addAssistantMessage('Ошибка связи', errorDemoMode);
      } finally {
        setIsProcessing(false);
      }
    },
    [addAssistantMessage, isProcessing, processMessages, sessionId, setIsDemoMode]
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

      // Приветственные сообщения всегда в обычном режиме
      await processMessages(welcomeMessages, false);
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

