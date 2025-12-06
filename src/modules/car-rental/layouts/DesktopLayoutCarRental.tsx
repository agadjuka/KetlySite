'use client';

import Link from 'next/link';
import { ChatInput, MessageList } from '@/components/chat';
import { ContactButton } from '@/components/widgets';
import { AgentProfileCarRental } from '../widgets/AgentProfileCarRental';
import { ChatHeaderCarRental } from '../widgets/ChatHeaderCarRental';
import { useLanguage } from '@/context/LanguageContext';
import { Message } from '@/types/chat';
import { GoogleSheetsPanel } from '../components/GoogleSheetsPanel';
import carableIcon from '../assets/logos/carable-icon.png';

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
        <div className="w-[500px] shrink-0 hidden md:flex flex-col h-full border-r border-white/5 bg-black/20 overflow-hidden" style={{
          paddingLeft: 'clamp(0.75rem, 1.5vh, 1rem)',
          paddingRight: 'clamp(0.75rem, 1.5vh, 1rem)',
          paddingBottom: 'clamp(0.75rem, 1.5vh, 1rem)',
          paddingTop: 0
        }}>
          <Link href="/" className="block cursor-pointer hover:opacity-90 transition-opacity shrink-0 w-full">
            <AgentProfileCarRental />
          </Link>
          <div className="w-full flex-1 min-h-0" style={{
            marginTop: 'clamp(0.5rem, 1vh, 1rem)'
          }}>
            <GoogleSheetsPanel />
          </div>
          <div className="shrink-0" style={{
            marginTop: 'clamp(0.5rem, 1vh, 1.5rem)'
          }}>
            <ContactButton />
          </div>
        </div>

        {/* Карточка 2: ЧАТ - центральный блок */}
        <div 
          data-chat-container
          className="flex-1 bg-black/40 backdrop-blur-xl border border-white/5 ring-1 ring-white/5 rounded-2xl overflow-hidden flex flex-col shadow-2xl h-full relative"
        >
          <ChatHeaderCarRental />
          <MessageList 
            messages={messages} 
            isTyping={isTyping}
            iconSrc={carableIcon.src}
          />
          <div className="p-3 sm:p-4 bg-transparent shrink-0 relative">
            <ChatInput
              onSend={onSendMessage}
              tourId="tour-chat-input-desktop-car-rental"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

