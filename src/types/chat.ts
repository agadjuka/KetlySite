export type MessageRole = 'user' | 'assistant';

export interface Message {
  id: string;
  role: MessageRole;
  content: string;
  createdAt: Date;
  isDemoMode?: boolean; // Флаг, указывающий, был ли активен демо-режим при создании сообщения
}

export interface ChatResponse {
  response?: string;
  content?: string;
}

