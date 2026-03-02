/**
 * Временное хранилище загруженных файлов одежды для Vyon.
 * Контейнер запрашивает GET /api/vyon/file/:id и получает файл.
 * Записи удаляются через 20 минут после сохранения.
 */
const TTL_MS = 20 * 60 * 1000; // 20 минут

const store = new Map<string, { buffer: Buffer; contentType: string; savedAt: number }>();

function isExpired(savedAt: number): boolean {
  return Date.now() - savedAt > TTL_MS;
}

/** Удаляет все просроченные записи (освобождает память). */
function purgeExpired(): void {
  for (const [id, entry] of store.entries()) {
    if (isExpired(entry.savedAt)) store.delete(id);
  }
}

export function saveGarment(id: string, buffer: Buffer, contentType: string): void {
  purgeExpired();
  store.set(id, { buffer, contentType, savedAt: Date.now() });
}

export function getGarment(id: string): { buffer: Buffer; contentType: string } | undefined {
  const entry = store.get(id);
  if (!entry) return undefined;
  if (isExpired(entry.savedAt)) {
    store.delete(id);
    return undefined;
  }
  return { buffer: entry.buffer, contentType: entry.contentType };
}
