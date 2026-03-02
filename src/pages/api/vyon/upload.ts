import type { NextApiRequest, NextApiResponse } from 'next';
import { saveGarment } from '@/lib/vyonGarmentStore';
import { randomBytes } from 'crypto';

export const config = {
  api: { bodyParser: { sizeLimit: '15mb' } },
};

function getBaseUrl(req: NextApiRequest): string {
  const host = req.headers.host ?? 'localhost:3000';
  const proto = req.headers['x-forwarded-proto'] === 'https' ? 'https' : 'http';
  return `${proto}://${host}`;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const body = req.body as { base64?: string; contentType?: string };
  const base64 = body?.base64;
  if (!base64 || typeof base64 !== 'string') {
    return res.status(400).json({ error: 'Нужно поле base64 с данными изображения' });
  }

  const match = base64.match(/^data:([^;]+);base64,(.+)$/);
  const contentType = match ? match[1].trim() : (body.contentType ?? 'image/jpeg');
  const raw = match ? match[2] : base64;

  let buffer: Buffer;
  try {
    buffer = Buffer.from(raw, 'base64');
  } catch {
    return res.status(400).json({ error: 'Неверный base64' });
  }
  if (buffer.length === 0) return res.status(400).json({ error: 'Пустое изображение' });

  const id = randomBytes(12).toString('hex');
  saveGarment(id, buffer, contentType);

  const base = getBaseUrl(req);
  const url = `${base}/api/vyon/file/${id}`;
  return res.status(200).json({ url });
}
