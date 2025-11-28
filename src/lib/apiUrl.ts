/**
 * Получает базовый URL API из переменной окружения
 */
export function getApiBaseUrl(): string {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  
  if (!apiUrl) {
    throw new Error('NEXT_PUBLIC_API_URL environment variable is not set');
  }
  
  return apiUrl;
}

/**
 * Получает URL для health check эндпоинта
 * Заменяет /chat на /health в базовом URL
 */
export function getHealthUrl(): string {
  const baseUrl = getApiBaseUrl();
  
  // Заменяем /chat на /health
  if (baseUrl.endsWith('/chat')) {
    return baseUrl.replace('/chat', '/health');
  }
  
  // Если URL не заканчивается на /chat, просто добавляем /health
  return baseUrl.replace(/\/$/, '') + '/health';
}





