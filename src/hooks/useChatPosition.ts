'use client';

import { useState, useEffect } from 'react';

interface ChatPosition {
  left: number;
  width: number;
  center: number;
}

export function useChatPosition() {
  const [position, setPosition] = useState<ChatPosition | null>(null);

  useEffect(() => {
    const updatePosition = () => {
      const chatContainer = document.querySelector('[data-chat-container]') as HTMLElement;
      if (!chatContainer) {
        setPosition(null);
        return;
      }

      const rect = chatContainer.getBoundingClientRect();
      setPosition({
        left: rect.left,
        width: rect.width,
        center: rect.left + rect.width / 2,
      });
    };

    // Обновляем позицию при загрузке и изменении размера
    updatePosition();
    window.addEventListener('resize', updatePosition);
    
    // Используем ResizeObserver для отслеживания изменений размера чата
    const chatContainer = document.querySelector('[data-chat-container]');
    if (chatContainer) {
      const resizeObserver = new ResizeObserver(updatePosition);
      resizeObserver.observe(chatContainer);
      
      return () => {
        window.removeEventListener('resize', updatePosition);
        resizeObserver.disconnect();
      };
    }

    return () => {
      window.removeEventListener('resize', updatePosition);
    };
  }, []);

  return position;
}

