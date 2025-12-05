'use client';

import Link from 'next/link';
import { ChatInput } from '@/components/chat';
import { QuickActionsPanel, ContactButton, AgentProfile } from '@/components/widgets';
import { ChatHeaderCarRental } from '@/components/widgets/ChatHeaderCarRental';
import { MessageListCarRental } from '@/app/agents/car-rental/car.random/MessageListCarRental';
import { useLanguage } from '@/context/LanguageContext';
import { Message } from '@/types/chat';
import { GoogleSheetsPanel } from '@/app/agents/car-rental/components/GoogleSheetsPanel';

interface DesktopLayoutCarRentalProps {
  messages: Message[];
  isTyping: boolean;
  onSendMessage: (message: string) => void;
  onQuickMessage: (message: string) => void;
}

export function DesktopLayoutCarRental({ messages, isTyping, onSendMessage, onQuickMessage }: DesktopLayoutCarRentalProps) {
  const { t } = useLanguage();

  return (
    <div className="hidden lg:block relative z-10 flex-1 min-h-0 p-4 h-full">
      <div className="flex gap-6 h-full">
        {/* Левая колонка со стеком карточек */}
        <div className="w-[500px] shrink-0 flex flex-col h-full border-r border-white/5 bg-black/20 p-4 overflow-y-auto scrollbar-hide">
          <Link href="/" className="block cursor-pointer hover:opacity-90 transition-opacity shrink-0 w-full">
            <AgentProfile />
          </Link>
          <div className="mt-4 w-full">
            <GoogleSheetsPanel />
          </div>
          <ContactButton className="mt-4 shrink-0" />
        </div>

        {/* Карточка 2: ЧАТ - центральный блок */}
        <div 
          data-chat-container
          className="flex-1 bg-black/40 backdrop-blur-xl border border-white/5 ring-1 ring-white/5 rounded-2xl overflow-hidden flex flex-col shadow-2xl h-full relative"
        >
          <ChatHeaderCarRental />
          <MessageListCarRental 
            messages={messages} 
            isTyping={isTyping}
          />
          <div className="p-3 sm:p-4 bg-transparent shrink-0 relative">
            <ChatInput
              onSend={onSendMessage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

