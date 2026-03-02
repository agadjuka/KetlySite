/**
 * Временное хранилище загруженных файлов одежды для Vyon.
 * Контейнер по URL запрашивает GET и получает файл.
 */

const store = new Map<string, { buffer: Buffer; contentType: string }>();

export function saveGarment(id: string, buffer: Buffer, contentType: string): void {
  store.set(id, { buffer, contentType });
}

export function getGarment(id: string): { buffer: Buffer; contentType: string } | undefined {
  return store.get(id);
}

export function deleteGarment(id: string): void {
  store.delete(id);
}
