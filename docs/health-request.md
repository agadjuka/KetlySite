# Health запрос при открытии сайта

## Текущая реализация

### Место отправки запроса

Health запрос отправляется в компоненте `LanguageProvider` в файле `src/context/LanguageContext.tsx`.

### Механизм работы

1. **Триггер**: 
   - Запрос отправляется в `useEffect` компонента `LanguageProvider` (строка 35)
   - `useEffect` выполняется один раз при монтировании компонента (пустой массив зависимостей `[]`)
   - `LanguageProvider` монтируется в корневом layout (`src/app/layout.tsx`, строка 36)

2. **Формирование URL**:
   - Вызывается функция `getHealthUrl()` из `src/lib/apiUrl.ts` (строка 38)
   - `getHealthUrl()` получает базовый URL через `getApiBaseUrl()`
   - `getApiBaseUrl()` читает переменную окружения `NEXT_PUBLIC_API_URL`
   - Если `NEXT_PUBLIC_API_URL` заканчивается на `/chat`, заменяется на `/health`
   - Если не заканчивается на `/chat`, добавляется `/health` в конец URL

3. **Параметры запроса**:
   - Метод: `GET`
   - URL: результат `getHealthUrl()`
   - Таймаут: 5 секунд через `AbortController`
   - Обработка ошибок: все ошибки игнорируются, только логируются в консоль

4. **Обработка ответа**:
   - Если успешно: ответ парсится как JSON и логируется в консоль (`console.log('Health check:', data)`)
   - Если ошибка: логируется предупреждение (`console.warn`), но приложение продолжает работу
   - Если таймаут: запрос прерывается через `AbortController`, ошибка игнорируется

### Последовательность выполнения

1. Пользователь открывает сайт
2. Загружается `layout.tsx` (корневой layout)
3. Монтируется `LanguageProvider` (обертка для всего приложения)
4. Выполняется `useEffect` в `LanguageProvider`
5. Вызывается `getHealthUrl()` для получения URL
6. Отправляется GET запрос на health endpoint
7. Параллельно выполняется остальная логика (чтение языка из localStorage)

### Ключевые файлы

1. **src/context/LanguageContext.tsx**:
   - Строки 35-66: логика отправки health запроса
   - Строка 38: вызов `getHealthUrl()`
   - Строки 42-45: настройка fetch с AbortController и таймаутом
   - Строки 46-62: обработка ответа и ошибок

2. **src/lib/apiUrl.ts**:
   - Строки 4-12: функция `getApiBaseUrl()` - читает `NEXT_PUBLIC_API_URL`
   - Строки 18-28: функция `getHealthUrl()` - формирует URL для health endpoint
   - Логика замены: если URL заканчивается на `/chat`, заменяет на `/health`, иначе добавляет `/health`

3. **src/app/layout.tsx**:
   - Строка 36: `LanguageProvider` оборачивает все приложение
   - Это гарантирует, что health запрос отправляется при первой загрузке

### Переменные окружения

- `NEXT_PUBLIC_API_URL`: базовый URL API (обязательная переменная)
- Формат: полный URL, например `https://api.example.com/chat` или `https://api.example.com`
- Используется для формирования health URL

### Особенности реализации

1. **Неблокирующий запрос**: health запрос не блокирует загрузку приложения, ошибки игнорируются
2. **Таймаут**: 5 секунд, после чего запрос прерывается
3. **SSR-совместимость**: запрос отправляется только на клиенте (в `useEffect`)
4. **Однократная отправка**: запрос отправляется только один раз при монтировании `LanguageProvider`
5. **Обработка отсутствия переменной**: если `NEXT_PUBLIC_API_URL` не установлена, выбрасывается ошибка в `getApiBaseUrl()`, которая перехватывается в try-catch и логируется

### Примеры URL

- Если `NEXT_PUBLIC_API_URL = "https://api.example.com/chat"`, то health URL = `"https://api.example.com/health"`
- Если `NEXT_PUBLIC_API_URL = "https://api.example.com"`, то health URL = `"https://api.example.com/health"`
- Если `NEXT_PUBLIC_API_URL = "https://api.example.com/"`, то health URL = `"https://api.example.com/health"`

