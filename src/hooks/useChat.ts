import { useState, useCallback, useEffect } from 'react';
import { Message } from '@/types/chat';
import { sendMessageToBackend } from '@/services/chatService';
import { v4 as uuidv4 } from 'uuid';
import { getRandomWelcomeMessage } from '@/lib/welcomeScenarios';
import { removeDemoPrefix } from '@/lib/utils';
import { useDemoMode } from '@/context/DemoContext';
import { useLanguage } from '@/context/LanguageContext';
import { useGlobal } from '@/context/GlobalContext';
import { useManagerNotification } from '@/context/ManagerNotificationContext';
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

// Функция для проверки и обработки команды [[CALL_MANAGER]]
const parseCallManager = (text: string): { isCallManager: boolean; message: string } => {
  const trimmedText = text.trim();
  if (trimmedText.startsWith('[[CALL_MANAGER]]')) {
    const message = trimmedText.replace(/^\[\[CALL_MANAGER\]\]\s*/i, '').trim();
    return { isCallManager: true, message };
  }
  return { isCallManager: false, message: text };
};

export type UseChatProps = {
  apiUrl?: string; // Опциональный URL. Если не передан — берем дефолтный из .env
  initialMessages?: string[]; // Опциональные приветственные сообщения
  enableDataRefresh?: boolean; // Включить проверку тега [[DATA_UPDATED]] для обновления таблиц (только для агентов)
  tourStorageKey?: string; // Ключ в localStorage для проверки наличия тура (если передан, ждем завершения тура перед отправкой сообщений)
  skipLanguage?: boolean; // Пропустить отправку языка в HTTP запросе (для velvet-spa)
};

export function useChat(props?: UseChatProps) {
  const { apiUrl, initialMessages, enableDataRefresh = false, tourStorageKey, skipLanguage = false } = props || {};
  const { sessionId, language: globalLanguage } = useGlobal();
  const { isDemoMode, setIsDemoMode } = useDemoMode();
  const { language, t, isLanguageReady, isLanguageConfirmed, isWelcomeInfoShown } = useLanguage();
  const { showNotification } = useManagerNotification();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [isTourCompleted, setIsTourCompleted] = useState<boolean>(() => {
    // Если тур уже был показан, сразу разрешаем отправку сообщений
    if (typeof window === 'undefined' || !tourStorageKey) {
      return !tourStorageKey; // Если нет tourStorageKey, тур не нужен
    }
    // Для главной страницы проверяем конкретный ключ
    if (tourStorageKey === 'tour_seen_main_page') {
      const tourSeen = localStorage.getItem(tourStorageKey);
      return !!tourSeen;
    }
    // Для агентов проверяем общий ключ tour_seen_agent
    const tourSeenAgent = localStorage.getItem('tour_seen_agent');
    return !!tourSeenAgent;
  });

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

      // Проверка на команду [[CALL_MANAGER]] в сообщении пользователя
      const userCallManager = parseCallManager(sanitizedText);
      if (userCallManager.isCallManager) {
        // Показываем уведомление и не добавляем сообщение в чат
        showNotification(userCallManager.message || sanitizedText.replace(/^\[\[CALL_MANAGER\]\]\s*/i, '').trim());
        return;
      }

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
        if (!sessionId) {
          throw new Error('Session ID is not available');
        }
        const responseText = await sendMessageToBackend(
          sanitizedText,
          sessionId,
          globalLanguage,
          apiUrl,
          skipLanguage
        );
        
        setIsTyping(false);
        
        // Проверка на формат с массивом messages
        let parsedResponse: { messages?: string[]; response?: string; content?: string } | null = null;
        try {
          parsedResponse = JSON.parse(responseText);
        } catch {
          // Не JSON, продолжаем со старой логикой
        }
        
        // Если есть массив messages, обрабатываем его
        if (parsedResponse && parsedResponse.messages && Array.isArray(parsedResponse.messages)) {
          const messagesArray = parsedResponse.messages;
          const callManagerIndex = messagesArray.findIndex(msg => 
            typeof msg === 'string' && msg.includes('[[CALL_MANAGER]]')
          );
          
          if (callManagerIndex !== -1) {
            // Отправляем все сообщения до CALL_MANAGER в чат
            const messagesBeforeCallManager = messagesArray.slice(0, callManagerIndex);
            if (messagesBeforeCallManager.length > 0) {
              await processMessages(messagesBeforeCallManager, isStop ? false : isDemoMode);
            }
            
            // Обрабатываем сообщение с CALL_MANAGER
            const callManagerMessage = messagesArray[callManagerIndex];
            const callManagerMatch = callManagerMessage.match(/^([\s\S]*?)\[\[CALL_MANAGER\]\]\s*([\s\S]*)$/i);
            
            if (callManagerMatch) {
              const textBeforeCallManager = callManagerMatch[1].trim();
              const textAfterCallManager = callManagerMatch[2].trim();
              
              // Текст до CALL_MANAGER отправляем в чат (если он не пустой)
              if (textBeforeCallManager) {
                await wait(MESSAGE_GAP);
                setIsTyping(true);
                await wait(TYPING_DURATION);
                setIsTyping(false);
                addAssistantMessage(textBeforeCallManager, isStop ? false : isDemoMode);
              }
              
              // Текст после CALL_MANAGER отправляем в уведомление (если он не пустой)
              if (textAfterCallManager) {
                showNotification(textAfterCallManager);
              }
            } else {
              // Если формат не совпал, отправляем все после CALL_MANAGER в уведомление
              const callManagerResult = parseCallManager(callManagerMessage);
              if (callManagerResult.isCallManager && callManagerResult.message) {
                showNotification(callManagerResult.message);
              }
            }
            
            setIsProcessing(false);
            return;
          }
        }
        
        // Проверка на команду [[CALL_MANAGER]] в обычном текстовом ответе
        const callManagerResult = parseCallManager(responseText);
        if (callManagerResult.isCallManager) {
          // Показываем уведомление и не добавляем сообщение в чат
          showNotification(callManagerResult.message || responseText.replace(/^\[\[CALL_MANAGER\]\]\s*/i, '').trim());
          setIsProcessing(false);
          return;
        }
        
        // Проверка на тег [[DATA_UPDATED]] для обновления таблиц (только для агентов)
        let cleanedResponseText = responseText;
        if (enableDataRefresh && responseText.includes('[[DATA_UPDATED')) {
          // Проверяем формат с датой: [[DATA_UPDATED, ДАТА]]
          const dataUpdatedWithDateRegex = /\[\[DATA_UPDATED,\s*([^\]]+)\]\]/g;
          const matches = [...responseText.matchAll(dataUpdatedWithDateRegex)];
          
          if (matches.length > 0) {
            // Формат с датой - для Belvedere SPA
            // Извлекаем дату из первого совпадения (формат: ГОД-МЕСЯЦ-ДЕНЬ или ГОД-МЕСЯЦ-ДЕНЬ ЧАС:МИНУТА)
            const dateMatch = matches[0][1].trim();
            // Извлекаем только дату (без времени), формат: ГОД-МЕСЯЦ-ДЕНЬ
            const dateOnly = dateMatch.split(' ')[0];
            
            // Удаляем тег из текста
            cleanedResponseText = responseText.replace(dataUpdatedWithDateRegex, '').trim();
            
            // Диспатчим событие для открытия виджета CRM с указанной датой
            if (typeof window !== 'undefined') {
              window.dispatchEvent(new CustomEvent('google-script-widget-open-date', { 
                detail: { date: dateOnly } 
              }));
            }
          } else {
            // Обычный формат [[DATA_UPDATED]] - работаем как обычно
            cleanedResponseText = responseText.replace(/\[\[DATA_UPDATED\]\]/g, '').trim();
            // Диспатчим событие для обновления таблиц
            if (typeof window !== 'undefined') {
              window.dispatchEvent(new Event('google-sheet-refresh'));
            }
          }
        }
        
        // Определяем режим для сообщений: если это стоп-сообщение, то false, иначе текущий isDemoMode
        const currentDemoMode = isStop ? false : isDemoMode;
        
        // Проверка на тег [[DEMO_START::Ниша]]
        const demoResult = parseDemoStart(cleanedResponseText);
        
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
          const parts = splitMessages(cleanedResponseText);
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
      apiUrl,
      globalLanguage,
      isDemoMode,
      processMessages,
      sessionId,
      setIsDemoMode,
      showNotification,
      t.demo.startMessages.acknowledgement,
      t.demo.startMessages.disclaimer,
      t.chat.stopKeyword,
      t.demo.startMessages.error,
    ]
  );

  // Проверка наличия тура и ожидание его завершения
  useEffect(() => {
    if (!tourStorageKey || typeof window === 'undefined') {
      setIsTourCompleted(true);
      return;
    }

    // Для главной страницы проверяем конкретный ключ
    if (tourStorageKey === 'tour_seen_main_page') {
      const tourSeen = localStorage.getItem(tourStorageKey);
      if (tourSeen) {
        setIsTourCompleted(true);
        return;
      }
    } else {
      // Для агентов проверяем общий ключ tour_seen_agent
      const tourSeenAgent = localStorage.getItem('tour_seen_agent');
      if (tourSeenAgent) {
        setIsTourCompleted(true);
        return;
      }
    }

    // Тур будет показан - ждем события о его завершении
    const eventName = `tour-completed-${tourStorageKey}`;
    
    const handleTourCompleted = () => {
      setIsTourCompleted(true);
    };

    window.addEventListener(eventName, handleTourCompleted);

    return () => {
      window.removeEventListener(eventName, handleTourCompleted);
    };
  }, [tourStorageKey]);

  useEffect(() => {
    if (
      !isLanguageReady ||
      !isLanguageConfirmed ||
      messages.length > 0 ||
      typeof window === 'undefined' ||
      !isTourCompleted // Ждем завершения тура, если он есть
    ) {
      return;
    }

    // Приветственные сообщения отправляются только после завершения тура

    let cancelled = false;

    const runWelcome = async () => {
      const isMobile = window.innerWidth < 768;
      // Используем initialMessages если переданы, иначе генерируем случайные
      const welcomeMessages = initialMessages || getRandomWelcomeMessage(isMobile, globalLanguage);

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
    globalLanguage,
    initialMessages,
    messages.length,
    processMessages,
    isTourCompleted,
  ]);

  return {
    messages,
    isTyping,
    isProcessing,
    sessionId: sessionId || '',
    handleSendMessage,
  };
}

