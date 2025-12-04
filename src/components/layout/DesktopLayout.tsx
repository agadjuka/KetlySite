'use client';

import { useMemo } from 'react';
import { MessageList, ChatInput } from '@/components/chat';
import { ChatHeader, AgentProfile, QuickActionsPanel, ContactButton } from '@/components/widgets';
import { useLanguage } from '@/context/LanguageContext';
import { mapCapabilities } from '@/config/capabilities';
import { Message } from '@/types/chat';

interface DesktopLayoutProps {
  messages: Message[];
  isTyping: boolean;
  onSendMessage: (message: string) => void;
  onQuickMessage: (message: string) => void;
}

export function DesktopLayout({ messages, isTyping, onSendMessage, onQuickMessage }: DesktopLayoutProps) {
  const { t } = useLanguage();
  
  const ketlyCapabilities = useMemo(
    () => mapCapabilities(t.capabilities),
    [t],
  );

  return (
    <div className="hidden lg:block relative z-10 flex-1 min-h-0 p-4 h-full">
      <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,3fr)] gap-6 h-full">
        {/* Левая колонка со стеком карточек */}
        <div className="flex flex-col gap-4 h-full min-h-0">
          <AgentProfile />
          <QuickActionsPanel onSendMessage={onQuickMessage} items={ketlyCapabilities} />
          <ContactButton />
        </div>

        {/* Карточка 2: ЧАТ - центральный блок */}
        <div 
          data-chat-container
          className="bg-black/40 backdrop-blur-xl border border-white/5 ring-1 ring-white/5 rounded-2xl overflow-hidden flex flex-col shadow-2xl h-full relative"
        >
          <ChatHeader />
          <MessageList 
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

