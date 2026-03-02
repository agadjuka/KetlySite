import type { NextApiRequest, NextApiResponse } from 'next';
import { getGarment } from '@/lib/vyonGarmentStore';

/** Раздача загруженного файла одежды по id (контейнер запрашивает по URL из upload). */
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).end();

  const id = req.query.id;
  if (!id || typeof id !== 'string') return res.status(400).end();

  const entry = getGarment(id);
  if (!entry) return res.status(404).end();

  res.setHeader('Content-Type', entry.contentType);
  res.setHeader('Cache-Control', 'private, max-age=300');
  return res.send(entry.buffer);
}
