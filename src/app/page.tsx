'use client';

import { useState } from 'react';
import { useChat } from '@/hooks/useChat';
import { useDemoMode } from '@/context/DemoContext';
import { MessageList, ChatInput, MobileQuickActions } from '@/components/chat';
import { ChatHeader, AgentProfile, QuickActionsPanel, ContactButton } from '@/components/widgets';
import { DevModeToggle } from '@/components/ui/DevModeToggle';
import { LanguageToggleButton } from '@/components/ui/LanguageToggleButton';
import { useLanguage } from '@/context/LanguageContext';

export default function Home() {
  const { messages, isTyping, isProcessing, handleSendMessage } = useChat();
  const { isDemoMode } = useDemoMode();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useLanguage();
  const stopKeyword = t.chat.stopKeyword;

  // Обработчик для быстрых сообщений
  const handleQuickMessage = (text: string) => {
    if (isDemoMode) {
      // Если демо-режим включен, сначала отправляем "Стоп" сразу
      handleSendMessage(stopKeyword);
      
      // Затем отправляем второе сообщение с задержкой 0.7 секунды
      setTimeout(() => {
        handleSendMessage(text);
      }, 700);
    } else {
      // В обычном режиме отправляем как обычно
      handleSendMessage(text);
    }
  };

  return (
    <main 
      className="h-[100dvh] w-full bg-[#050505] text-white overflow-hidden flex flex-col relative" 
      style={{ 
        minHeight: '-webkit-fill-available',
        paddingLeft: 'max(0px, env(safe-area-inset-left))',
        paddingRight: 'max(0px, env(safe-area-inset-right))',
        paddingTop: 'max(0px, env(safe-area-inset-top))',
        paddingBottom: 'max(0px, env(safe-area-inset-bottom))',
      }}
    >
      <LanguageToggleButton
        variant="desktop"
        className="hidden lg:flex absolute top-4 right-4 z-30"
      />

      {/* Ambient Mesh Gradients */}
      {/* Синие градиенты (обычный режим) */}
      <div 
        key="blue-gradient-1"
        className={`absolute top-0 left-0 w-[400px] h-[400px] lg:w-[800px] lg:h-[800px] blur-[80px] lg:blur-[120px] rounded-full pointer-events-none -translate-x-1/2 -translate-y-3/4 lg:-translate-y-1/2 mix-blend-screen transition-opacity duration-700 ease-in-out ${isDemoMode ? 'opacity-0' : 'opacity-100'}`}
        style={{
          backgroundColor: 'rgba(37, 99, 235, 0.1)'
        }}
      />
      <div 
        key="blue-gradient-2"
        className={`absolute bottom-0 right-0 w-[400px] h-[400px] lg:w-[800px] lg:h-[800px] blur-[80px] lg:blur-[120px] rounded-full pointer-events-none translate-x-1/3 translate-y-0 lg:translate-y-1/3 mix-blend-screen transition-opacity duration-700 ease-in-out ${isDemoMode ? 'opacity-0' : 'opacity-100'}`}
        style={{
          backgroundColor: 'rgba(37, 99, 235, 0.2)'
        }}
      />
      {/* Желтые градиенты (демо-режим) */}
      <div 
        key="yellow-gradient-1"
        className={`absolute top-0 left-0 w-[400px] h-[400px] lg:w-[800px] lg:h-[800px] blur-[80px] lg:blur-[120px] rounded-full pointer-events-none -translate-x-1/2 -translate-y-3/4 lg:-translate-y-1/2 mix-blend-screen transition-opacity duration-700 ease-in-out ${isDemoMode ? 'opacity-100' : 'opacity-0'}`}
        style={{
          backgroundColor: 'rgba(250, 204, 21, 0.2)'
        }}
      />
      <div 
        key="yellow-gradient-2"
        className={`absolute bottom-0 right-0 w-[400px] h-[400px] lg:w-[800px] lg:h-[800px] blur-[80px] lg:blur-[120px] rounded-full pointer-events-none translate-x-1/3 translate-y-0 lg:translate-y-1/3 mix-blend-screen transition-opacity duration-700 ease-in-out ${isDemoMode ? 'opacity-100' : 'opacity-0'}`}
        style={{
          backgroundColor: 'rgba(250, 204, 21, 0.3)'
        }}
      />

      <div className="relative z-10 flex-1 min-h-0 p-0 lg:p-4">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,3fr)_minmax(0,1fr)] gap-4 lg:gap-6 h-full">
          {/* Карточка 1: ЧАТ - центральный блок */}
          <div className="bg-black/40 backdrop-blur-xl border-0 lg:border lg:border-white/5 ring-0 lg:ring-1 lg:ring-white/5 rounded-none lg:rounded-2xl overflow-hidden flex flex-col shadow-2xl h-full relative">
            <ChatHeader />

            {/* MessageList */}
            <MessageList 
              messages={messages} 
              isTyping={isTyping}
            />

            {/* Кнопка остановки демо-режима - абсолютно позиционирована */}
            <div 
              className={`absolute bottom-28 lg:bottom-[108px] left-0 right-0 flex justify-center transition-all duration-700 ease-in-out z-20 px-3 sm:px-4 ${
                isDemoMode 
                  ? 'opacity-100 translate-y-0 pointer-events-auto' 
                  : 'opacity-0 translate-y-2 pointer-events-none'
              }`}
            >
              <button
                onClick={() => handleSendMessage(stopKeyword)}
                className="px-4 py-1.5 text-white/80 hover:text-white text-xs font-medium rounded-lg border border-yellow-400/30 hover:border-yellow-400/50 bg-black/60 backdrop-blur-sm hover:bg-black/80 transition-all duration-200"
              >
                {t.chat.stopButton}
              </button>
            </div>

            {/* ChatInput - отдельный блок */}
            <div className="p-3 sm:p-4 bg-transparent shrink-0">
              <div className={`bg-zinc-900/50 border rounded-xl p-1 transition-colors duration-700 ease-in-out focus-within:bg-zinc-900 relative ${isDemoMode ? 'border-yellow-400/50 focus-within:border-yellow-400/70' : 'border-white/5 focus-within:border-white/10'}`}>
                <ChatInput
                  onSend={handleSendMessage}
                  disabled={isProcessing}
                  onToggleMenu={() => setIsMobileMenuOpen(prev => !prev)}
                />
                <MobileQuickActions
                  isOpen={isMobileMenuOpen}
                  onClose={() => setIsMobileMenuOpen(false)}
                  onSelect={handleQuickMessage}
                />
              </div>
            </div>
          </div>

          {/* Правая колонка со стеком карточек */}
          <div className="hidden lg:flex flex-col gap-4 h-full min-h-0">
            <AgentProfile />
            <QuickActionsPanel onSendMessage={handleQuickMessage} />
            <ContactButton />
          </div>
        </div>
      </div>

      {/* Dev Tool: Toggle Demo Mode */}
      <DevModeToggle />
    </main>
  );
}
