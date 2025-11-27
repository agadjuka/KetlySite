'use client';

import { MessageList, ChatInput } from '@/components/chat';
import { ChatHeader, AgentProfile, QuickActionsPanel, ContactButton } from '@/components/widgets';
import { StopDemoButton } from '@/components/ui/StopDemoButton';
import { useLanguage } from '@/context/LanguageContext';
import { Message } from '@/types/chat';

interface DesktopLayoutProps {
  messages: Message[];
  isTyping: boolean;
  onSendMessage: (message: string) => void;
  onQuickMessage: (message: string) => void;
}

export function DesktopLayout({ messages, isTyping, onSendMessage, onQuickMessage }: DesktopLayoutProps) {
  const { t } = useLanguage();

  return (
    <div className="hidden lg:block relative z-10 flex-1 min-h-0 p-4 h-full">
      <div className="grid grid-cols-[minmax(0,3fr)_minmax(0,1fr)] gap-6 h-full">
        {/* Карточка 1: ЧАТ - центральный блок */}
        <div className="bg-black/40 backdrop-blur-xl border border-white/5 ring-1 ring-white/5 rounded-2xl overflow-hidden flex flex-col shadow-2xl h-full relative">
          <ChatHeader />
          <MessageList 
            messages={messages} 
            isTyping={isTyping}
          />
          <StopDemoButton 
            onStop={() => onSendMessage(t.chat.stopKeyword)}
            position="desktop"
          />
          <div className="p-3 sm:p-4 bg-transparent shrink-0">
            <ChatInput
              onSend={onSendMessage}
            />
          </div>
        </div>

        {/* Правая колонка со стеком карточек */}
        <div className="flex flex-col gap-4 h-full min-h-0">
          <AgentProfile />
          <QuickActionsPanel onSendMessage={onQuickMessage} />
          <ContactButton />
        </div>
      </div>
    </div>
  );
}

