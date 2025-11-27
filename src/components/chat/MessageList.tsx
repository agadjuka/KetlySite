'use client';

import { useEffect, useRef } from 'react';
import { Message } from '@/types/chat';
import { ChatMessage } from './ChatMessage';
import { TypingIndicator } from './TypingIndicator';
import { preventUnwantedSwipes } from '@/lib/touchUtils';

interface MessageListProps {
  messages: Message[];
  isTyping: boolean;
}

export function MessageList({ messages, isTyping }: MessageListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'nearest'
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Настройка touch-событий для предотвращения нежелательных свайпов
  useEffect(() => {
    if (!containerRef.current) return;

    const cleanup = preventUnwantedSwipes(containerRef.current, {
      allowHorizontal: false,
      allowVertical: true,
      threshold: 10,
    });

    return cleanup;
  }, []);

  return (
    <div 
      ref={containerRef}
      className="flex-1 overflow-y-auto relative scrollbar-hide scrollable-content"
      style={{ 
        WebkitOverflowScrolling: 'touch',
        overscrollBehavior: 'contain',
      }}
    >
      {/* Blur Fade Effect под хедером */}
      <div className="sticky top-0 z-10 h-8 bg-gradient-to-b from-black/20 to-transparent pointer-events-none" />

      <div className="px-4 sm:px-6 pt-4 sm:pt-6 pb-2 sm:pb-6 space-y-4">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        {isTyping && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}
