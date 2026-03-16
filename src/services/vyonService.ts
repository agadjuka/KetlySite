/**
 * Vyon Try-On API.
 * Контейнеру уходят: model (файл), garment_url_1 … (HTTP-URL одежды).
 * Ответ поллинга: { status: "completed", results: ["https://..."] } — берём results[0] для img.src.
 */

export interface VyonCreateResponse {
  task_id?: string;
  error?: string;
  [key: string]: unknown;
}

export interface VyonPollResponse {
  status?: string;
  /** URL готовых изображений (прямые ссылки для img.src) */
  results?: string[];
  result_url?: string;
  output_url?: string;
  image_url?: string;
  result?: string;
  error?: string;
  [key: string]: unknown;
}

function apiBase(): string {
  if (typeof window !== 'undefined') return '';
  return process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';
}

// 0 + 3 + 7 + 12 + 20 ≈ до 25 секунд общего окна ретраев
const CREATE_RETRY_DELAYS_MS = [0, 3000, 7000, 12_000, 20_000];

async function fetchWithRetry(
  input: RequestInfo | URL,
  init: RequestInit,
  retryDelays: number[]
): Promise<Response> {
  const start = Date.now();
  let lastError: unknown;

  for (let attempt = 0; attempt < retryDelays.length; attempt++) {
    const delay = retryDelays[attempt];
    if (delay > 0) {
      await new Promise((r) => setTimeout(r, delay));
    }

    try {
      const res = await fetch(input, init);
      if (res.ok) return res;

      const shouldRetry =
        res.status === 404 ||
        res.status === 408 ||
        res.status === 425 ||
        res.status === 429 ||
        (res.status >= 500 && res.status < 600);

      if (!shouldRetry) return res;

      lastError = new Error(`HTTP ${res.status}`);
      // продолжаем цикл — следующая попытка
    } catch (err) {
      lastError = err;
      // сетевые/таймаутные ошибки считаем ретраибельными
    }

    if (Date.now() - start > 25_000) break;
  }

  if (lastError instanceof Error) {
    throw lastError;
  }
  throw new Error('Не удалось выполнить запрос к Vyon');
}

/** Загрузить файл одежды на наш сервер, получить URL для garment_url_1 (контейнер по нему скачает). */
export async function uploadGarmentFile(file: File): Promise<string> {
  const base = apiBase();
  const dataUrl = await new Promise<string>((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(r.result as string);
    r.onerror = () => reject(new Error('Не удалось прочитать файл'));
    r.readAsDataURL(file);
  });
  const res = await fetch(`${base}/api/vyon/upload`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ base64: dataUrl }),
  });
  const data = (await res.json()) as { url?: string; error?: string };
  if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);
  if (!data.url) throw new Error('Нет URL в ответе загрузки');
  return data.url;
}

export async function createTryOnTask(
  modelFile: File,
  garmentUrls: string[]
): Promise<VyonCreateResponse> {
  const formData = new FormData();
  formData.append('model', modelFile);
  garmentUrls.forEach((url, i) => formData.append('garment_url_' + (i + 1), url));

  const base = apiBase();
  const res = await fetchWithRetry(
    `${base}/api/vyon`,
    {
      method: 'POST',
      body: formData,
      headers: {
        'x-vyon-client-attempt': 'true',
      },
    },
    CREATE_RETRY_DELAYS_MS
  );

  const data = (await res.json()) as VyonCreateResponse;
  if (!res.ok) {
    const err = data as { error?: string; details?: string };
    const msg = [err.error, err.details].filter(Boolean).join(' — ') || `HTTP ${res.status}`;
    throw new Error(msg);
  }
  return data;
}

export async function pollTaskStatus(taskId: string): Promise<VyonPollResponse> {
  const base = apiBase();
  const res = await fetch(`${base}/api/vyon?task_id=${encodeURIComponent(taskId)}`, {
    method: 'GET',
  });

  const data = (await res.json()) as VyonPollResponse;
  if (!res.ok) {
    if (res.status === 404) {
      return { status: 'pending' };
    }
    const err = data as { error?: string; details?: string };
    const msg = [err.error, err.details].filter(Boolean).join(' — ') || `HTTP ${res.status}`;
    throw new Error(msg);
  }
  return data;
}

const POLL_MS = 2000;
const MAX_ATTEMPTS = 120;

export async function runTryOn(
  modelFile: File,
  garmentUrl: string,
  onProgress?: (status: string) => void
): Promise<string | null> {
  const createRes = await createTryOnTask(modelFile, [garmentUrl]);
  const taskId = createRes.task_id;
  if (!taskId) throw new Error((createRes as { error?: string }).error || 'Нет task_id');

  for (let i = 0; i < MAX_ATTEMPTS; i++) {
    const poll = await pollTaskStatus(taskId);
    const status = (poll.status ?? '').toLowerCase();
    if (onProgress) onProgress(poll.status ?? 'pending');

    if (status === 'completed' || status === 'complete' || status === 'success') {
      if (Array.isArray(poll.results) && poll.results.length > 0 && typeof poll.results[0] === 'string') {
        return poll.results[0];
      }
      const url = poll.result_url ?? poll.output_url ?? poll.image_url ?? poll.result;
      return typeof url === 'string' ? url : null;
    }
    if (status === 'failed' || status === 'error') {
      throw new Error((poll as { error?: string }).error || 'Задача завершилась с ошибкой');
    }

    await new Promise((r) => setTimeout(r, POLL_MS));
  }

  throw new Error('Превышено время ожидания');
}
