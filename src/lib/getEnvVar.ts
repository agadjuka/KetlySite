/**
 * Получает переменную окружения по имени
 * В Next.js переменные окружения с префиксом NEXT_PUBLIC_ доступны на клиенте
 * Используем прямой доступ через индексацию
 */
export function getEnvVar(varName: string): string | undefined {
  // В Next.js переменные окружения доступны через process.env
  // Используем прямой доступ через индексацию
  if (typeof window === 'undefined') {
    // На сервере
    return process.env[varName];
  }
  
  // На клиенте Next.js встраивает переменные в код во время сборки
  // Используем прямой доступ через индексацию
  return (process.env as Record<string, string | undefined>)[varName];
}

