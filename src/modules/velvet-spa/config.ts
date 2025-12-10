/**
 * Конфигурация модуля Velvet SPA
 */

export const velvetSpaConfig = {
  // Идентификатор модуля (используется в URL, localStorage, переменных окружения)
  id: 'velvet-spa',
  
  // Отображаемое название (используется в UI)
  displayName: {
    ru: 'VELVET SPA',
    en: 'VELVET SPA',
  },
  
  // Маршрут страницы агента
  route: '/agents/velvet-spa',
  
  // Ключ для localStorage (для тура)
  tourStorageKey: 'tour_seen_velvet_spa',
  
  // Переменные окружения
  env: {
    // URL API агента
    apiUrl: 'NEXT_PUBLIC_VELVET_SPA_API_URL',
    // ID Google Sheets таблицы
    sheetId: 'NEXT_PUBLIC_VELVET_SPA_SHEET_ID',
  },
  
  // Начальные сообщения
  initialMessages: {
    ru: 'Добро пожаловать в Velvet SPA! Я помогу вам выбрать процедуру, забронировать сеанс или ответить на любые вопросы. Чем могу быть полезна?',
    en: 'Welcome to Velvet SPA! I can help you choose a treatment, book a session, or answer any questions. How can I assist you?',
  },
  
  // ID туров для чата
  tourIds: {
    desktop: 'tour-chat-input-desktop-velvet-spa',
    mobile: 'tour-chat-input-mobile-velvet-spa',
  },
  
  // Цвет градиента для страницы (используется в AmbientMeshGradients)
  gradientColor: 'silver' as const,
  
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


