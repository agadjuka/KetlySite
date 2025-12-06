/**
 * Названия месяцев в родительном падеже
 */
const MONTHS_GENITIVE = [
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
 * Преобразует дату из формата YYYY-MM-DD в формат "DD месяц"
 * Например: "2025-12-10" -> "10 декабря"
 * 
 * @param dateString - Дата в формате YYYY-MM-DD
 * @returns Отформатированная дата в формате "DD месяц" или исходная строка, если формат неверный
 */
export function formatDateToRussian(dateString: string): string {
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
  
  // Форматируем дату
  const monthName = MONTHS_GENITIVE[month - 1];
  return `${day} ${monthName}`;
}

/**
 * Заменяет все даты в формате YYYY-MM-DD в тексте на формат "DD месяц"
 * 
 * @param text - Текст, в котором нужно заменить даты
 * @returns Текст с замененными датами
 */
export function replaceDatesInText(text: string): string {
  if (!text) return text;
  
  // Регулярное выражение для поиска дат в формате YYYY-MM-DD
  const dateRegex = /\b(\d{4}-\d{2}-\d{2})\b/g;
  
  return text.replace(dateRegex, (match) => {
    return formatDateToRussian(match);
  });
}

