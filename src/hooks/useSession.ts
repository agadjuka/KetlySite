import { useState, useEffect } from 'react';
import { generateSessionId } from '@/lib/id';

export function useSession(): string {
  // Используем useState с пустой строкой для SSR, чтобы избежать несоответствия гидратации
  // На сервере всегда будет пустая строка, на клиенте будет установлен реальный ID
  const [sessionId, setSessionId] = useState<string>('');

  useEffect(() => {
    // Генерируем ID только на клиенте после монтирования
    setSessionId(generateSessionId());
  }, []);

  return sessionId;
}

