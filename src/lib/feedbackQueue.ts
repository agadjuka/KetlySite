import type { FeedbackPayload } from './feedbackApi';

const QUEUE_KEY = 'ketly_feedback_queue';

interface QueueEntry {
  id: string;
  payload: FeedbackPayload;
  addedAt: number;
}

function readQueue(): QueueEntry[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(QUEUE_KEY) ?? '[]');
  } catch {
    return [];
  }
}

function writeQueue(entries: QueueEntry[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(QUEUE_KEY, JSON.stringify(entries));
  } catch {
    // localStorage недоступен — не критично, просто пропускаем
  }
}

export function enqueue(payload: FeedbackPayload): string {
  const entry: QueueEntry = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    payload,
    addedAt: Date.now(),
  };
  writeQueue([...readQueue(), entry]);
  return entry.id;
}

export function dequeue(id: string): void {
  writeQueue(readQueue().filter((e) => e.id !== id));
}

export function getPendingEntries(): QueueEntry[] {
  // Отбрасываем заявки старше 48 часов — они уже нерелевантны
  const cutoff = Date.now() - 48 * 60 * 60 * 1000;
  const fresh = readQueue().filter((e) => e.addedAt >= cutoff);
  writeQueue(fresh);
  return fresh;
}
