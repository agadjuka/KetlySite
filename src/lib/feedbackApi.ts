import { enqueue, dequeue } from './feedbackQueue';

export interface FeedbackPayload {
  full_name: string;
  contact: string;
  website: string;
  message: string;
}

async function sendToProxy(payload: FeedbackPayload): Promise<boolean> {
  try {
    const res = await fetch('/api/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return res.ok;
  } catch {
    return false;
  }
}

/**
 * Сохраняет заявку в localStorage-очередь, затем пересылает через
 * Next.js прокси (/api/feedback), который ждёт Cloud Run с retry.
 * При успехе удаляет запись из очереди.
 * При неудаче запись остаётся — хук useRetryFeedbackQueue отправит её
 * при следующем открытии сайта.
 */
export async function submitFeedback(payload: FeedbackPayload): Promise<void> {
  const id = enqueue(payload);
  const ok = await sendToProxy(payload);
  if (ok) dequeue(id);
}

/**
 * Отправляет одну заявку из очереди по ID.
 * Используется хуком useRetryFeedbackQueue.
 */
export async function retryQueuedEntry(id: string, payload: FeedbackPayload): Promise<void> {
  const ok = await sendToProxy(payload);
  if (ok) dequeue(id);
}
