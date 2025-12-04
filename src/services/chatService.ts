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
  apiUrl?: string
): Promise<string> {
  const url = apiUrl || DEFAULT_API_URL;
  
  if (!url) {
    throw new Error('API URL is not defined');
  }

  const response = await fetch(url, {
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

