import type { NextApiRequest, NextApiResponse } from 'next';

/**
 * Прокси к Vyon-контейнеру.
 * POST — создание задачи (тело multipart пробрасывается как есть).
 * GET ?task_id= — поллинг статуса, ответ контейнера возвращается клиенту.
 */
export const config = {
  api: { bodyParser: false },
};

const EXTERNAL_API_URL = process.env.VYON_EXTERNAL_API_URL;
const EXTERNAL_API_KEY = process.env.VYON_EXTERNAL_API_KEY;

function missingEnv(res: NextApiResponse) {
  return res.status(500).json({
    error: 'VYON_EXTERNAL_API_URL и VYON_EXTERNAL_API_KEY задайте в .env.local',
  });
}

function getBody(req: NextApiRequest): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on('data', (chunk: Buffer) => chunks.push(chunk));
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!EXTERNAL_API_URL || !EXTERNAL_API_KEY) return missingEnv(res);

  if (req.method === 'GET') {
    const taskId = req.query.task_id;
    if (!taskId || typeof taskId !== 'string') {
      return res.status(400).json({ error: 'Нужен параметр task_id' });
    }
    try {
      const r = await fetch(`${EXTERNAL_API_URL}/${encodeURIComponent(taskId)}`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${EXTERNAL_API_KEY}` },
      });
      const text = await r.text();
      let data: unknown;
      try { data = JSON.parse(text); } catch { data = { raw: text }; }
      return res.status(r.status).json(data);
    } catch (e) {
      return res.status(500).json({ error: 'Ошибка запроса к сервису', details: String(e) });
    }
  }

  if (req.method === 'POST') {
    try {
      const body = await getBody(req);
      const contentType = req.headers['content-type'] ?? 'multipart/form-data';
      if (body.length === 0) {
        return res.status(400).json({ error: 'Пустое тело запроса', details: 'Фото не передано' });
      }

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 120_000);

      const r = await fetch(EXTERNAL_API_URL, {
        method: 'POST',
        signal: controller.signal,
        headers: {
          Authorization: `Bearer ${EXTERNAL_API_KEY}`,
          'Content-Type': contentType,
        },
        body: new Uint8Array(body),
      });
      clearTimeout(timeoutId);

      const text = await r.text();
      let data: unknown;
      try { data = JSON.parse(text); } catch { data = { raw: text }; }
      return res.status(r.status).json(data);
    } catch (e) {
      const isConnReset = e instanceof Error && (e.cause as NodeJS.ErrnoException)?.code === 'ECONNRESET';
      return res.status(500).json({
        error: 'Ошибка запроса к сервису',
        details: isConnReset
          ? 'Контейнер разорвал соединение (таймаут или перегрузка). Попробуй ещё раз или уменьши размер фото.'
          : e instanceof Error ? e.message : String(e),
      });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
