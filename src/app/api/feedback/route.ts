import { NextRequest, NextResponse } from 'next/server';
import type { FeedbackPayload } from '@/lib/feedbackApi';

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/chat$/, '/feedback')
  ?? process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '') + '/feedback';

const MAX_ATTEMPTS = 3;
// Задержки между повторами: 5 с, 15 с
const RETRY_DELAYS_MS = [5_000, 15_000];
// Таймаут на один запрос к контейнеру
const REQUEST_TIMEOUT_MS = 50_000;

async function tryForward(payload: FeedbackPayload): Promise<boolean> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    const res = await fetch(BACKEND_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    return res.ok;
  } catch {
    return false;
  } finally {
    clearTimeout(timer);
  }
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function POST(req: NextRequest) {
  let payload: FeedbackPayload;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
    if (attempt > 0) {
      await sleep(RETRY_DELAYS_MS[attempt - 1]);
    }
    const ok = await tryForward(payload);
    if (ok) {
      return NextResponse.json({ ok: true });
    }
  }

  // Все попытки исчерпаны — сообщаем браузеру об ошибке,
  // чтобы localStorage-очередь осталась и была отправлена при следующем визите.
  return NextResponse.json({ ok: false, error: 'backend_unavailable' }, { status: 503 });
}
