/**
 * Утилиты для обработки сообщений в демо-режиме
 */

const DEMO_START_REGEX = /\[\[DEMO_START::(.*?)\]\]/;
const MESSAGE_DELIMITER = '|||';
const DEMO_START_DELAY = 1700;

export interface DemoStartResult {
  isDemoStart: boolean;
  niche?: string;
  mainText: string;
}

/**
 * Проверяет, является ли сообщение стоп-словом
 */
export function isStopMessage(text: string, stopKeyword: string): boolean {
  const normalizedText = text.toLowerCase().trim();
  const stopWords = Array.from(
    new Set(['стоп', 'stop', stopKeyword.toLowerCase()])
  );
  return stopWords.includes(normalizedText);
}

/**
 * Парсит ответ на наличие тега DEMO_START
 */
export function parseDemoStart(responseText: string): DemoStartResult {
  const demoMatch = responseText.match(DEMO_START_REGEX);
  
  if (demoMatch) {
    const niche = demoMatch[1].trim();
    const mainText = responseText.replace(DEMO_START_REGEX, '').trim();
    return {
      isDemoStart: true,
      niche,
      mainText,
    };
  }
  
  return {
    isDemoStart: false,
    mainText: responseText,
  };
}

/**
 * Разделяет ответ на массив сообщений
 */
export function splitMessages(responseText: string): string[] {
  return responseText
    .split(MESSAGE_DELIMITER)
    .map((part) => part.trim())
    .filter(Boolean);
}

/**
 * Задержка после начала демо-режима
 */
export const DEMO_START_DELAY_MS = DEMO_START_DELAY;








