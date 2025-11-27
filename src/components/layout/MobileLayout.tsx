'use client';

import { useState } from 'react';
import { MessageList, ChatInput, MobileQuickActions } from '@/components/chat';
import { ChatHeader, MobileContactButton } from '@/components/widgets';
import { StopDemoButton } from '@/components/ui/StopDemoButton';
import { useLanguage } from '@/context/LanguageContext';
import { Message } from '@/types/chat';

interface MobileLayoutProps {
  messages: Message[];
  isTyping: boolean;
  onSendMessage: (message: string) => void;
  onQuickMessage: (message: string) => void;
}

export function MobileLayout({ messages, isTyping, onSendMessage, onQuickMessage }: MobileLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <div className="lg:hidden flex flex-col flex-1 h-full overflow-hidden relative">
      {/* 1. HEADER (Фиксированная высота, не сжимается) */}
      <header 
        className="flex-none h-16 z-50 bg-black/40 backdrop-blur-xl border-b border-white/5"
        style={{ paddingTop: 'env(safe-area-inset-top)' }}
      >
        <ChatHeader />
      </header>

      {/* 2. CHAT (Занимает все место, скроллится) */}
      <div className="flex-1 overflow-y-auto overscroll-contain touch-pan-y scrollable-content relative">
        <MessageList 
          messages={messages} 
          isTyping={isTyping}
        />
        
        <StopDemoButton 
          onStop={() => onSendMessage(t.chat.stopKeyword)}
          position="mobile"
        />
      </div>

      {/* 3. FOOTER (Прижат к низу потока) */}
      <footer 
        className="flex-none z-50 backdrop-blur-xl pb-[env(safe-area-inset-bottom)]" 
        style={{ transform: 'translateY(-28px)' }}
      >
        <div className="px-2 pt-0 pb-0 relative">
          <ChatInput
            onSend={onSendMessage}
            onToggleMenu={() => setIsMobileMenuOpen(prev => !prev)}
          />
          <MobileQuickActions
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
            onSelect={onQuickMessage}
          />
        </div>
      </footer>

      {/* Кнопка контактов */}
      <MobileContactButton />
    </div>
  );
}

