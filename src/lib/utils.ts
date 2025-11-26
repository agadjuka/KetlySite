import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Удаляет префиксы "[Демонстрация]" и "[DEMO_END]" из начала сообщения
 * @param message - исходное сообщение
 * @returns сообщение без префиксов "[Демонстрация]" и "[DEMO_END]"
 */
export function removeDemoPrefix(message: string): string {
  return message
    .replace(/^\[Демонстрация\]\s*/i, '')
    .replace(/^\[DEMO_END\]\s*/i, '')
    .trim();
}

