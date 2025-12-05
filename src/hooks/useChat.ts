import { useState, useCallback, useEffect } from 'react';
import { Message } from '@/types/chat';
import { sendMessageToBackend } from '@/services/chatService';
import { v4 as uuidv4 } from 'uuid';
import { getRandomWelcomeMessage } from '@/lib/welcomeScenarios';
import { removeDemoPrefix } from '@/lib/utils';
import { useDemoMode } from '@/context/DemoContext';
import { useLanguage } from '@/context/LanguageContext';
import { useGlobal } from '@/context/GlobalContext';
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

export type UseChatProps = {
  apiUrl?: string; // Опциональный URL. Если не передан — берем дефолтный из .env
  initialMessages?: string[]; // Опциональные приветственные сообщения
  enableDataRefresh?: boolean; // Включить проверку тега [[DATA_UPDATED]] для обновления таблиц (только для агентов)
  tourStorageKey?: string; // Ключ в localStorage для проверки наличия тура (если передан, ждем завершения тура перед отправкой сообщений)
};

export function useChat(props?: UseChatProps) {
  const { apiUrl, initialMessages, enableDataRefresh = false, tourStorageKey } = props || {};
  const { sessionId, language: globalLanguage } = useGlobal();
  const { isDemoMode, setIsDemoMode } = useDemoMode();
  const { language, t, isLanguageReady, isLanguageConfirmed, isWelcomeInfoShown } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [isTourCompleted, setIsTourCompleted] = useState<boolean>(false);

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
        if (!sessionId) {
          throw new Error('Session ID is not available');
        }
        const responseText = await sendMessageToBackend(
          sanitizedText,
          sessionId,
          globalLanguage,
          apiUrl
        );
        
        setIsTyping(false);
        
        // Проверка на тег [[DATA_UPDATED]] для обновления таблиц (только для агентов)
        let cleanedResponseText = responseText;
        if (enableDataRefresh && responseText.includes('[[DATA_UPDATED]]')) {
          cleanedResponseText = responseText.replace(/\[\[DATA_UPDATED\]\]/g, '').trim();
          // Диспатчим событие для обновления таблиц
          if (typeof window !== 'undefined') {
            window.dispatchEvent(new Event('google-sheet-refresh'));
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

    // Проверяем, был ли тур уже показан
    const tourSeen = localStorage.getItem(tourStorageKey);
    
    if (tourSeen) {
      // Тур уже был показан ранее - можно отправлять сообщения сразу
      setIsTourCompleted(true);
      return;
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

    // Логика отправки приветственных сообщений:
    // 1. Если welcomeInfo было показано ранее (isWelcomeInfoShown === true) - отправляем сообщения сразу
    // 2. Если welcomeInfo еще не было показано (isWelcomeInfoShown === false):
    //    - Если это новый пользователь (первый визит) - welcomeInfo показывается, ждем нажатия кнопки
    //    - Если это возвращающийся пользователь (заходил до добавления welcomeInfo) - 
    //      welcomeInfo не показывается, отправляем сообщения сразу
    //
    // Ключевой момент: welcomeInfo показывается только для новых пользователей при первом визите.
    // Если пользователь заходил до добавления welcomeInfo, то при следующем заходе welcomeInfo
    // покажется один раз, но мы должны отправлять сообщения сразу для таких пользователей.
    //
    // Упрощенная логика: если welcomeInfo было показано - отправляем сразу.
    // Если не было показано - проверяем, показывается ли оно сейчас.
    // Если показывается - это новый пользователь, ждем нажатия кнопки.
    // Если не показывается - это возвращающийся пользователь, отправляем сообщения сразу.
    
    // Проверяем, должно ли welcomeInfo показываться сейчас (та же логика, что в WelcomeFlow)
    const shouldShowWelcomeInfo = isLanguageConfirmed && !isWelcomeInfoShown;
    
    // Если welcomeInfo было показано ранее - отправляем сообщения сразу
    if (isWelcomeInfoShown) {
      // Продолжаем выполнение - отправляем сообщения
    } else if (shouldShowWelcomeInfo) {
      // WelcomeInfo должно показываться - это новый пользователь, ждем нажатия кнопки
      return;
    } else {
      // WelcomeInfo не показывается, но язык выбран - это возвращающийся пользователь
      // (заходил до добавления welcomeInfo) - отправляем сообщения сразу
      // Продолжаем выполнение - отправляем сообщения
    }

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
    isWelcomeInfoShown,
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

