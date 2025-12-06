'use client';

import { useEffect, useRef } from 'react';
import { Message } from '@/types/chat';
import { ChatMessageCarRental } from './ChatMessageCarRental';
import { TypingIndicatorCarRental } from './TypingIndicatorCarRental';
import { preventUnwantedSwipes } from '@/lib/touchUtils';

interface MessageListCarRentalProps {
  messages: Message[];
  isTyping: boolean;
}

export function MessageListCarRental({ messages, isTyping }: MessageListCarRentalProps) {
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
      <div className="sticky top-0 z-10 h-8 bg-gradient-to-b from-black/20 to-transparent pointer-events-none" />

      <div className="px-4 sm:px-6 pt-4 sm:pt-6 pb-2 sm:pb-6 space-y-4">
        {messages.map((message) => (
          <ChatMessageCarRental key={message.id} message={message} />
        ))}
        {isTyping && <TypingIndicatorCarRental />}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}





