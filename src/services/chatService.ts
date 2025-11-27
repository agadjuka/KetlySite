import { ChatResponse } from '@/types/chat';
import type { Language } from '@/lib/dictionary';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error('NEXT_PUBLIC_API_URL environment variable is not set');
}

const API_URL_STRING: string = API_URL;

export async function sendMessageToBackend(
  text: string,
  sessionId: string,
  language: Language
): Promise<string> {
  const response = await fetch(API_URL_STRING, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: text,
      thread_id: sessionId,
      language,
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data: ChatResponse = await response.json();
  
  return data.response || data.content || '';
}

