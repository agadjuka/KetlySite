# Инструкция по копированию модуля Car Rental

Эта инструкция поможет вам создать нового агента на основе модуля Car Rental.

## Шаг 1: Копирование папки модуля

1. Скопируйте всю папку `src/modules/car-rental` в новую папку с именем вашего агента (например, `src/modules/restaurant`)

## Шаг 2: Переименование файлов и папок

Внутри скопированной папки переименуйте следующие файлы:

### Файлы с суффиксом CarRental:
- `layouts/DesktopLayoutCarRental.tsx` → `layouts/DesktopLayout[ВашеИмя].tsx`
- `layouts/MobileLayoutCarRental.tsx` → `layouts/MobileLayout[ВашеИмя].tsx`
- `widgets/AgentProfileCarRental.tsx` → `widgets/AgentProfile[ВашеИмя].tsx`
- `widgets/ChatHeaderCarRental.tsx` → `widgets/ChatHeader[ВашеИмя].tsx`

### Пример для ресторана:
- `DesktopLayoutCarRental.tsx` → `DesktopLayoutRestaurant.tsx`
- `MobileLayoutCarRental.tsx` → `MobileLayoutRestaurant.tsx`
- `AgentProfileCarRental.tsx` → `AgentProfileRestaurant.tsx`
- `ChatHeaderCarRental.tsx` → `ChatHeaderRestaurant.tsx`

## Шаг 3: Обновление конфигурационного файла

Откройте `config.ts` в скопированной папке и измените все значения:

```typescript
export const [вашеИмя]Config = {
  // Идентификатор модуля (используется в URL, localStorage, переменных окружения)
  id: 'ваше-имя', // например: 'restaurant'
  
  // Отображаемое название (используется в UI)
  displayName: {
    ru: 'ВАШЕ НАЗВАНИЕ',
    en: 'YOUR NAME',
  },
  
  // Маршрут страницы агента
  route: '/agents/ваше-имя', // например: '/agents/restaurant'
  
  // Ключ для localStorage (для тура)
  tourStorageKey: 'tour_seen_ваше_имя', // например: 'tour_seen_restaurant'
  
  // Переменные окружения
  env: {
    // URL API агента
    apiUrl: 'NEXT_PUBLIC_ВАШЕ_ИМЯ_API_URL', // например: 'NEXT_PUBLIC_RESTAURANT_API_URL'
    // ID Google Sheets таблицы
    sheetId: 'NEXT_PUBLIC_ВАШЕ_ИМЯ_SHEET_ID', // например: 'NEXT_PUBLIC_RESTAURANT_SHEET_ID'
  },
  
  // Начальные сообщения
  initialMessages: {
    ru: 'Ваше приветственное сообщение на русском',
    en: 'Your welcome message in English',
  },
  
  // ID туров для чата
  tourIds: {
    desktop: 'tour-chat-input-desktop-ваше-имя',
    mobile: 'tour-chat-input-mobile-ваше-имя',
  },
  
  // Цвет градиента для страницы (blue, yellow, red)
  gradientColor: 'blue' as const, // или 'yellow', 'red'
  
  // Путь к логотипам (относительно папки модуля)
  logos: {
    text: './assets/logos/Текст.png', // замените на ваш логотип
    icon: './assets/logos/carable-icon.png', // замените на вашу иконку
  },
  
  // Настройки Google Sheets виджетов
  sheets: {
    widgets: [
      { title: 'Название таблицы 1', gid: 'ID_ЛИСТА_1' },
      { title: 'Название таблицы 2', gid: 'ID_ЛИСТА_2' },
      // добавьте свои виджеты
    ],
  },
} as const;
```

## Шаг 4: Обновление всех файлов модуля

Во всех файлах модуля замените:

1. **Импорты и экспорты:**
   - `carRentalConfig` → `[вашеИмя]Config`
   - `CarRental` → `[ВашеИмя]`
   - `car-rental` → `ваше-имя`

2. **В файлах layouts:**
   - `DesktopLayoutCarRental` → `DesktopLayout[ВашеИмя]`
   - `MobileLayoutCarRental` → `MobileLayout[ВашеИмя]`
   - `ChatHeaderCarRental` → `ChatHeader[ВашеИмя]`
   - `AgentProfileCarRental` → `AgentProfile[ВашеИмя]`

3. **В файлах widgets:**
   - Названия компонентов и функций
   - Импорты логотипов (замените пути на ваши)

4. **В файле `page.tsx`:**
   - Импорт конфига
   - Название компонента `CarRentalContent` → `[ВашеИмя]Content`
   - Название экспортируемой функции `CarRentalPage` → `[ВашеИмя]Page`

5. **В файле `index.ts`:**
   - Все экспорты с новыми именами
   - Экспорт конфига с новым именем

6. **В файле `getConfig.ts`:**
   - Импорт и экспорт конфига с новым именем

## Шаг 5: Создание страницы агента

Создайте файл `src/app/agents/[ваше-имя]/page.tsx`:

```typescript
export { default } from '@/modules/[ваше-имя]/page';
```

## Шаг 6: Обновление внешних файлов

### 6.1. `src/components/widgets/ExamplesButton.tsx`

Добавьте импорт вашего конфига и логотипа:

```typescript
import [вашеИмя]Logo from '@/modules/[ваше-имя]/assets/logos/Текст.png';
import { [вашеИмя]Config } from '@/modules/[ваше-имя]';
```

Добавьте новую ссылку в выпадающее меню (аналогично существующей для Car Rental):

```typescript
<Link
  href={[вашеИмя]Config.route}
  className="block bg-black border border-white/15 rounded-xl transition-all duration-300 shadow-2xl hover:border-white/25 hover:scale-105 flex flex-col items-center"
>
  <img 
    src={[вашеИмя]Logo.src} 
    alt="[Ваше название] logo" 
    className="object-contain"
    style={{ maxWidth: '80px', display: 'block' }}
  />
  <span>{t.chat.[вашеИмя]}</span>
</Link>
```

### 6.2. `src/components/widgets/MobileExamplesButton.tsx`

Аналогично добавьте импорт и ссылку для мобильной версии.

### 6.3. `src/components/ui/AmbientMeshGradients.tsx`

Добавьте проверку для вашего агента:

```typescript
const is[ВашеИмя]Page = useMemo(() => {
  return pathname?.includes('/[ваше-имя]') ?? false;
}, [pathname]);

const activeMode = useMemo(() => {
  if (is[ВашеИмя]Page) return '[ваш_цвет]'; // blue, yellow, или red
  if (isCarRentalPage) return 'red';
  if (isDemoMode) return 'yellow';
  return 'blue';
}, [is[ВашеИмя]Page, isCarRentalPage, isDemoMode]);
```

### 6.4. `src/lib/dictionary.ts`

Добавьте переводы для вашего агента:

```typescript
chat: {
  // ... существующие поля
  [вашеИмя]: 'ВАШЕ НАЗВАНИЕ',
}
```

### 6.5. `src/lib/apiUrl.ts`

Добавьте функцию для получения health URL вашего агента:

```typescript
export function get[ВашеИмя]HealthUrl(): string | null {
  const apiUrl = process.env.NEXT_PUBLIC_[ВАШЕ_ИМЯ]_API_URL;
  
  if (!apiUrl) {
    return null;
  }
  
  if (apiUrl.endsWith('/chat')) {
    return apiUrl.replace('/chat', '/health');
  }
  
  return apiUrl.replace(/\/$/, '') + '/health';
}
```

### 6.6. `src/context/LanguageContext.tsx`

Добавьте вызов health check для вашего агента:

```typescript
import { get[ВашеИмя]HealthUrl } from '@/lib/apiUrl';

// В useEffect добавьте:
const [вашеИмя]HealthUrl = get[ВашеИмя]HealthUrl();
if ([вашеИмя]HealthUrl) {
  sendHealthRequest([вашеИмя]HealthUrl, '[ваше-имя]');
}
```

### 6.7. `src/lib/tourContent.ts`

Добавьте тексты тура для вашего агента (если нужны):

```typescript
welcome: {
  title: "Добро пожаловать в Демо-режим",
  description: "Описание вашего агента..."
}
```

### 6.8. `src/components/chat/MobileWidgetCarousel.tsx`

Если ваш агент использует виджеты Google Sheets, обновите импорт:

```typescript
import { GoogleSheetEmbed, [вашеИмя]Config } from '@/modules/[ваше-имя]';

// И используйте:
const widgets = [вашеИмя]Config.sheets.widgets;
```

## Шаг 7: Переменные окружения

Добавьте в `.env.local` или `.env`:

```env
NEXT_PUBLIC_[ВАШЕ_ИМЯ]_API_URL=https://your-api-url.com/chat
NEXT_PUBLIC_[ВАШЕ_ИМЯ]_SHEET_ID=your-google-sheets-id
```

## Шаг 8: Замена логотипов

Замените файлы в `assets/logos/`:
- `Текст.png` - текстовый логотип
- `carable-icon.png` - иконка агента

## Шаг 9: Проверка

1. Убедитесь, что все импорты корректны
2. Проверьте, что все пути к файлам правильные
3. Убедитесь, что переменные окружения установлены
4. Запустите проект и проверьте работу нового агента

## Важные замечания

- Все имена должны быть в kebab-case для URL и переменных окружения (например: `restaurant-agent`)
- Все имена компонентов должны быть в PascalCase (например: `RestaurantAgent`)
- Все имена конфигов должны быть в camelCase (например: `restaurantConfig`)
- Убедитесь, что ID листов Google Sheets корректны
- Проверьте, что все пути к логотипам правильные

## Пример полного переименования для "Restaurant"

- Папка: `car-rental` → `restaurant`
- Конфиг: `carRentalConfig` → `restaurantConfig`
- Компоненты: `CarRental` → `Restaurant`
- Route: `/agents/car-rental` → `/agents/restaurant`
- ID: `car-rental` → `restaurant`
- Переменные: `NEXT_PUBLIC_CAR_RENTAL_API_URL` → `NEXT_PUBLIC_RESTAURANT_API_URL`
