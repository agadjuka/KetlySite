import { ChatResponse } from '@/types/chat';
import type { Language } from '@/lib/dictionary';

const DEFAULT_API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!DEFAULT_API_URL) {
  throw new Error('NEXT_PUBLIC_API_URL environment variable is not set');
}

export async function sendMessageToBackend(
  text: string,
  sessionId: string,
  language: Language,
  apiUrl?: string,
  skipLanguage?: boolean
): Promise<string> {
  const url = apiUrl || DEFAULT_API_URL;
  
  if (!url) {
    throw new Error('API URL is not defined');
  }

  // Формируем тело запроса: если skipLanguage === true, не включаем язык
  const requestBody: {
    message: string;
    thread_id: string;
    language?: Language;
  } = {
    message: text,
    thread_id: sessionId,
  };

  if (!skipLanguage) {
    requestBody.language = language;
  }

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data: ChatResponse = await response.json();
  
  // Если есть массив messages, возвращаем весь объект для обработки
  if (data.messages && Array.isArray(data.messages)) {
    return JSON.stringify(data);
  }
  
  // Иначе возвращаем обычный текст
  return data.response || data.content || '';
}

