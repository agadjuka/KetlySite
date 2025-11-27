import React from 'react';

/**
 * Контактная информация для замены плейсхолдера [[contact]]
 */
const CONTACT_INFO = `WhatsApp: +62-812-3922-8332

Telegram:  @ketly_ai

EMAIL: agadjuka@gmail.com`;

/**
 * Заменяет плейсхолдер [[contact]] на контактную информацию
 * Если перед плейсхолдером есть текст, добавляет перенос строки
 */
function replaceContactPlaceholder(text: string): string {
  return text.replace(/\[\[contact\]\]/gi, (match, offset, string) => {
    // Проверяем, есть ли непробельные символы перед плейсхолдером
    const beforeMatch = string.substring(0, offset);
    const hasTextBefore = /\S/.test(beforeMatch);
    
    // Если есть текст перед плейсхолдером, добавляем перенос строки
    return hasTextBefore ? `\n\n${CONTACT_INFO}` : CONTACT_INFO;
  });
}

/**
 * Форматирует текст сообщения:
 * - Плейсхолдер [[contact]] заменяется на контактную информацию
 * - Одна звездочка (*) заменяется на тире (—)
 * - Две звездочки (**текст**) делают текст жирным
 */
export function formatMessageText(text: string): React.ReactNode {
  if (!text) return text;

  // Сначала заменяем плейсхолдер контактов
  text = replaceContactPlaceholder(text);

  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let key = 0;

  // Регулярное выражение для поиска **текст** (захватывает любой текст между **, включая одиночные звездочки)
  const boldRegex = /\*\*((?:[^*]|\*(?!\*))+?)\*\*/g;
  let match;

  while ((match = boldRegex.exec(text)) !== null) {
    // Добавляем текст до совпадения (обрабатываем одиночные звездочки)
    if (match.index > lastIndex) {
      const beforeText = text.substring(lastIndex, match.index);
      const formattedBefore = formatSingleAsterisks(beforeText);
      if (formattedBefore.length > 0) {
        parts.push(...formattedBefore);
      }
    }

    // Добавляем жирный текст (внутри жирного текста одиночные звездочки тоже заменяются)
    const boldContent = formatSingleAsterisks(match[1]);
    parts.push(
      <strong key={`bold-${key}`} className="font-semibold">
        {boldContent}
      </strong>
    );
    key++;
    lastIndex = match.index + match[0].length;
  }

  // Добавляем оставшийся текст
  if (lastIndex < text.length) {
    const remainingText = text.substring(lastIndex);
    const formattedRemaining = formatSingleAsterisks(remainingText);
    if (formattedRemaining.length > 0) {
      parts.push(...formattedRemaining);
    }
  }

  return parts.length > 0 ? parts : formatSingleAsterisks(text);
}

/**
 * Заменяет одиночные звездочки на тире
 */
function formatSingleAsterisks(text: string): React.ReactNode[] {
  if (!text) return [text];

  const parts: React.ReactNode[] = [];
  let lastIndex = 0;

  // Регулярное выражение для поиска одиночных звездочек (не двойных)
  // Ищем * только если перед ним нет * и после него тоже нет *
  const singleAsteriskRegex = /(?<!\*)\*(?!\*)/g;
  let match;

  while ((match = singleAsteriskRegex.exec(text)) !== null) {
    // Добавляем текст до звездочки
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }

    // Добавляем тире вместо звездочки
    parts.push('—');
    lastIndex = match.index + 1;
  }

  // Добавляем оставшийся текст
  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts.length > 0 ? parts : [text];
}







