/**
 * Конфигурация модуля Velvet SPA
 */

export const velvetSpaConfig = {
  // Идентификатор модуля (используется в URL, localStorage, переменных окружения)
  id: 'velvet-spa',
  
  // Отображаемое название (используется в UI)
  displayName: {
    ru: 'СПА-САЛОН',
    en: 'SPA',
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
  
  // Тексты тура для агента
  tour: {
    ru: {
      welcome: {
        title: "Добро пожаловать в Демо-режим",
        description: "Это демонстрация работы AI-Администратора спа-салона. Здесь вы можете не только общаться с агентом, но и видеть, как он управляет базой данных в режиме реального времени."
      },
      widgets: {
        title: "Живая База Данных",
        descriptionDesktop: "Бот не придумывает данные. Он читает таблицу и вносит в неё изменения. Следите за записями здесь прямо во время диалога.",
        descriptionMobile: "Бот не придумывает данные. Он читает таблицу и вносит в неё изменения. Следите за записями здесь прямо во время диалога. Нажмите на заголовок сверху, чтобы свернуть таблицу для удобства."
      },
      exit: {
        title: "Вернуться к Ketly",
        description: "Когда закончите тестирование, нажмите сюда, чтобы вернуться на главную страницу и обсудить внедрение такого агента в ваш бизнес."
      },
      buttons: {
        next: "Далее →",
        prev: "← Назад",
        done: "Готово"
      }
    },
    en: {
      welcome: {
        title: "Welcome to Demo Mode",
        description: "This is a demonstration of the SPA AI Administrator. Here you can not only chat with the agent, but also see how it manages the database in real-time."
      },
      widgets: {
        title: "Live Database",
        descriptionDesktop: "The bot doesn't invent data. It reads the table and makes changes to it. Watch the records here during the dialogue.",
        descriptionMobile: "The bot doesn't invent data. It reads the table and makes changes to it. Watch the records here during the dialogue. Tap the header above to collapse the table for convenience."
      },
      exit: {
        title: "Return to Ketly",
        description: "When you finish testing, click here to return to the main page and discuss implementing such an agent for your business."
      },
      buttons: {
        next: "Next →",
        prev: "← Previous",
        done: "Done"
      }
    }
  },
} as const;


