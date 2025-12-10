'use client';

import { ChatInput, MobileWidgetCarousel, MessageList } from '@/components/chat';
import { MobileContactButton } from '@/components/widgets';
import { ChatHeaderCarRental } from '../widgets/ChatHeaderCarRental';
import { Message } from '@/types/chat';
import carableIcon from '../assets/logos/carable-icon.png';
import { carRentalConfig } from '../config';

interface MobileLayoutCarRentalProps {
  messages: Message[];
  isTyping: boolean;
  onSendMessage: (message: string) => void;
  onQuickMessage: (message: string) => void;
}

export function MobileLayoutCarRental({ messages, isTyping, onSendMessage, onQuickMessage }: MobileLayoutCarRentalProps) {
  // Прямой доступ к переменной окружения
  const sheetId = process.env.NEXT_PUBLIC_CAR_RENTAL_SHEET_ID || '';

  return (
    <div className="lg:hidden flex flex-col flex-1 h-full overflow-hidden relative">
      {/* 1. HEADER (Фиксированная высота, не сжимается) */}
      <header 
        className="flex-none h-16 z-50 bg-black/40 backdrop-blur-xl border-b border-white/5"
        style={{ paddingTop: 'env(safe-area-inset-top)' }}
      >
        <ChatHeaderCarRental />
      </header>

      {/* 2. MOBILE WIDGET CAROUSEL (Карусель виджетов) */}
      <MobileWidgetCarousel sheetId={sheetId} />

      {/* 3. CHAT (Занимает все место, скроллится) */}
      <div className="flex-1 overflow-y-auto overscroll-contain touch-pan-y scrollable-content relative pb-32">
        <MessageList 
          messages={messages} 
          isTyping={isTyping}
          iconSrc={carableIcon.src}
        />
      </div>

      {/* 4. FOOTER (Прижат к низу потока) */}
      <footer 
        className="flex-none z-50 backdrop-blur-xl pb-[env(safe-area-inset-bottom)]" 
        style={{ transform: 'translateY(-12px)' }}
      >
        <div className="px-2 pt-0 pb-0 relative">
          <ChatInput
            onSend={onSendMessage}
            tourId={carRentalConfig.tourIds.mobile}
          />
        </div>
      </footer>

      {/* Кнопка контактов */}
      <MobileContactButton />
    </div>
  );
}






