/**
 * Конфигурация модуля Car Rental
 * Этот файл содержит все настройки модуля, которые нужно будет изменить при копировании
 */

export const carRentalConfig = {
  // Идентификатор модуля (используется в URL, localStorage, переменных окружения)
  id: 'car-rental',
  
  // Отображаемое название (используется в UI)
  displayName: {
    ru: 'АРЕНДА АВТО',
    en: 'CAR RENTAL',
  },
  
  // Маршрут страницы агента
  route: '/agents/car-rental',
  
  // Ключ для localStorage (для тура)
  tourStorageKey: 'tour_seen_car_rental',
  
  // Переменные окружения
  env: {
    // URL API агента
    apiUrl: 'NEXT_PUBLIC_CAR_RENTAL_API_URL',
    // ID Google Sheets таблицы
    sheetId: 'NEXT_PUBLIC_CAR_RENTAL_SHEET_ID',
  },
  
  // Начальные сообщения
  initialMessages: {
    ru: 'Добрый день! Это Carable — сервис аренды авто. Чем могу помочь?',
    en: 'Hello! This is Carable — a car rental service. How can I assist you?',
  },
  
  // ID туров для чата
  tourIds: {
    desktop: 'tour-chat-input-desktop-car-rental',
    mobile: 'tour-chat-input-mobile-car-rental',
  },
  
  // Цвет градиента для страницы (используется в AmbientMeshGradients)
  gradientColor: 'red' as const,
  
  // Путь к логотипам (относительно папки модуля)
  logos: {
    text: './assets/logos/Текст.png',
    icon: './assets/logos/carable-icon.png',
  },
  
  // Настройки Google Sheets виджетов
  sheets: {
    widgets: [
      { title: 'Availability', gid: '667953082' },
      { title: 'Bookings', gid: '337777908' },
      { title: 'Car Park', gid: '0' },
    ],
  },
} as const;


