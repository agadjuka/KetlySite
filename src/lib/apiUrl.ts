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

/**
 * Получает URL для health check эндпоинта из переменной car-rental
 * Заменяет /chat на /health в базовом URL
 */
export function getCarRentalHealthUrl(): string | null {
  const carRentalApiUrl = process.env.NEXT_PUBLIC_CAR_RENTAL_API_URL;
  
  if (!carRentalApiUrl) {
    return null;
  }
  
  // Заменяем /chat на /health
  if (carRentalApiUrl.endsWith('/chat')) {
    return carRentalApiUrl.replace('/chat', '/health');
  }
  
  // Если URL не заканчивается на /chat, просто добавляем /health
  return carRentalApiUrl.replace(/\/$/, '') + '/health';
}

/**
 * Получает URL для health check эндпоинта из переменной velvet-spa
 * Заменяет /chat на /health в базовом URL
 */
export function getVelvetSpaHealthUrl(): string | null {
  const velvetSpaApiUrl = process.env.NEXT_PUBLIC_VELVET_SPA_API_URL;
  
  if (!velvetSpaApiUrl) {
    return null;
  }
  
  // Заменяем /chat на /health
  if (velvetSpaApiUrl.endsWith('/chat')) {
    return velvetSpaApiUrl.replace('/chat', '/health');
  }
  
  // Если URL не заканчивается на /chat, просто добавляем /health
  return velvetSpaApiUrl.replace(/\/$/, '') + '/health';
}







