import { Language } from './dictionary';

/**
 * Названия месяцев в родительном падеже (русский)
 */
const MONTHS_GENITIVE_RU = [
  'января',
  'февраля',
  'марта',
  'апреля',
  'мая',
  'июня',
  'июля',
  'августа',
  'сентября',
  'октября',
  'ноября',
  'декабря'
];

/**
 * Названия месяцев (английский)
 */
const MONTHS_EN = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

/**
 * Преобразует дату из формата YYYY-MM-DD в локализованный формат
 * Русский: "2025-12-10" -> "10 декабря"
 * Английский: "2025-12-10" -> "December 10"
 * 
 * @param dateString - Дата в формате YYYY-MM-DD
 * @param language - Язык интерфейса ('ru' | 'en')
 * @returns Отформатированная дата или исходная строка, если формат неверный
 */
export function formatDate(dateString: string, language: Language = 'ru'): string {
  // Проверяем формат даты YYYY-MM-DD
  const dateRegex = /^(\d{4})-(\d{2})-(\d{2})$/;
  const match = dateString.match(dateRegex);
  
  if (!match) {
    // Если формат не соответствует, возвращаем исходную строку
    return dateString;
  }
  
  const year = parseInt(match[1], 10);
  const month = parseInt(match[2], 10);
  const day = parseInt(match[3], 10);
  
  // Проверяем валидность даты
  if (month < 1 || month > 12 || day < 1 || day > 31) {
    return dateString;
  }
  
  // Проверяем валидность через Date объект
  const date = new Date(year, month - 1, day);
  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return dateString;
  }
  
  // Форматируем дату в зависимости от языка
  if (language === 'en') {
    const monthName = MONTHS_EN[month - 1];
    return `${monthName} ${day}`;
  } else {
    const monthName = MONTHS_GENITIVE_RU[month - 1];
    return `${day} ${monthName}`;
  }
}

/**
 * Заменяет все даты в формате YYYY-MM-DD в тексте на локализованный формат
 * 
 * @param text - Текст, в котором нужно заменить даты
 * @param language - Язык интерфейса ('ru' | 'en')
 * @returns Текст с замененными датами
 */
export function replaceDatesInText(text: string, language: Language = 'ru'): string {
  if (!text) return text;
  
  // Регулярное выражение для поиска дат в формате YYYY-MM-DD
  const dateRegex = /\b(\d{4}-\d{2}-\d{2})\b/g;
  
  return text.replace(dateRegex, (match) => {
    return formatDate(match, language);
  });
}

