import { Message } from '@/types/chat';

const STORAGE_KEY = 'main_page_chat_history';
const TIMESTAMP_KEY = 'main_page_chat_timestamp';
const INACTIVITY_TIMEOUT_MS = 60 * 60 * 1000; // 1 час

interface StoredMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  createdAt: string; // ISO string
  isDemoMode?: boolean;
}

/**
 * Преобразует Message в формат для хранения
 */
function messageToStored(message: Message): StoredMessage {
  return {
    id: message.id,
    role: message.role,
    content: message.content,
    createdAt: message.createdAt.toISOString(),
    isDemoMode: message.isDemoMode,
  };
}

/**
 * Преобразует сохраненное сообщение обратно в Message
 */
function storedToMessage(stored: StoredMessage): Message {
  return {
    id: stored.id,
    role: stored.role,
    content: stored.content,
    createdAt: new Date(stored.createdAt),
    isDemoMode: stored.isDemoMode,
  };
}

/**
 * Проверяет, не истекла ли сессия (1 час неактивности)
 */
function isSessionExpired(): boolean {
  if (typeof window === 'undefined') {
    return true;
  }

  const timestampStr = sessionStorage.getItem(TIMESTAMP_KEY);
  if (!timestampStr) {
    return true;
  }

  const timestamp = parseInt(timestampStr, 10);
  const now = Date.now();
  const elapsed = now - timestamp;

  return elapsed > INACTIVITY_TIMEOUT_MS;
}

/**
 * Обновляет timestamp активности
 */
export function updateActivityTimestamp(): void {
  if (typeof window === 'undefined') {
    return;
  }

  sessionStorage.setItem(TIMESTAMP_KEY, Date.now().toString());
}

/**
 * Сохраняет историю сообщений в sessionStorage
 */
export function saveChatHistory(messages: Message[]): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    const storedMessages = messages.map(messageToStored);
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(storedMessages));
    updateActivityTimestamp();
  } catch (error) {
    console.error('Ошибка при сохранении истории чата:', error);
  }
}

/**
 * Загружает историю сообщений из sessionStorage
 */
export function loadChatHistory(): Message[] {
  if (typeof window === 'undefined') {
    return [];
  }

  // Проверяем, не истекла ли сессия
  if (isSessionExpired()) {
    clearChatHistory();
    return [];
  }

  try {
    const storedData = sessionStorage.getItem(STORAGE_KEY);
    if (!storedData) {
      return [];
    }

    const storedMessages: StoredMessage[] = JSON.parse(storedData);
    const messages = storedMessages.map(storedToMessage);
    
    // Обновляем timestamp при загрузке
    updateActivityTimestamp();
    
    return messages;
  } catch (error) {
    console.error('Ошибка при загрузке истории чата:', error);
    clearChatHistory();
    return [];
  }
}

/**
 * Очищает историю сообщений из sessionStorage
 */
export function clearChatHistory(): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    sessionStorage.removeItem(STORAGE_KEY);
    sessionStorage.removeItem(TIMESTAMP_KEY);
  } catch (error) {
    console.error('Ошибка при очистке истории чата:', error);
  }
}

/**
 * Проверяет, есть ли сохраненная история
 */
export function hasChatHistory(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  if (isSessionExpired()) {
    clearChatHistory();
    return false;
  }

  const storedData = sessionStorage.getItem(STORAGE_KEY);
  return !!storedData;
}


