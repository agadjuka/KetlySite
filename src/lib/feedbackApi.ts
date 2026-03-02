import { getFeedbackUrl } from './apiUrl';

export interface FeedbackPayload {
  full_name: string;
  contact: string;
  website: string;
  message: string;
}

export type SubmitFeedbackResult = { ok: true } | { ok: false; status: number; message: string };

/**
 * Отправляет заявку обратной связи на бэкенд (POST /feedback).
 * Формат тела как в CheckBackend.py.
 */
export async function submitFeedback(payload: FeedbackPayload): Promise<SubmitFeedbackResult> {
  const url = getFeedbackUrl();
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const text = await res.text();
      return { ok: false, status: res.status, message: text || res.statusText };
    }
    return { ok: true };
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    return { ok: false, status: -1, message };
  }
}
