'use client';

import { useState } from 'react';
import { useChat } from '@/hooks/useChat';
import { useDemoMode } from '@/context/DemoContext';
import { MessageList, ChatInput, MobileQuickActions } from '@/components/chat';
import { ChatHeader, AgentProfile, QuickActionsPanel, ContactButton } from '@/components/widgets';
import { DevModeToggle } from '@/components/ui/DevModeToggle';

export default function Home() {
  const { messages, isTyping, isProcessing, handleSendMessage } = useChat();
  const { isDemoMode } = useDemoMode();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
          <div className="bg-black/40 backdrop-blur-xl border-0 lg:border lg:border-white/5 ring-0 lg:ring-1 lg:ring-white/5 rounded-none lg:rounded-2xl overflow-hidden flex flex-col shadow-2xl h-full">
            <ChatHeader />

            {/* MessageList */}
            <MessageList 
              messages={messages} 
              isTyping={isTyping}
            />

            {/* ChatInput - отдельный блок */}
            <div className="p-3 sm:p-4 bg-transparent shrink-0">
              {/* Кнопка остановки демо-режима */}
              <div 
                className={`mb-3 flex justify-center transition-all duration-700 ease-in-out overflow-hidden ${
                  isDemoMode 
                    ? 'opacity-100 max-h-20' 
                    : 'opacity-0 max-h-0 mb-0'
                }`}
              >
                <button
                  onClick={() => handleSendMessage('Стоп')}
                  className="px-4 py-1.5 text-white/80 hover:text-white text-xs font-medium rounded-lg border border-yellow-400/30 hover:border-yellow-400/50 bg-transparent hover:bg-yellow-400/5 transition-all duration-200"
                >
                  Остановить демонстрацию
                </button>
              </div>
              <div className={`bg-zinc-900/50 border rounded-xl p-1 transition-colors duration-700 ease-in-out focus-within:bg-zinc-900 relative ${isDemoMode ? 'border-yellow-400/50 focus-within:border-yellow-400/70' : 'border-white/5 focus-within:border-white/10'}`}>
                <ChatInput
                  onSend={handleSendMessage}
                  disabled={isProcessing}
                  onToggleMenu={() => setIsMobileMenuOpen(prev => !prev)}
                />
                <MobileQuickActions
                  isOpen={isMobileMenuOpen}
                  onClose={() => setIsMobileMenuOpen(false)}
                  onSelect={handleSendMessage}
                />
              </div>
            </div>
          </div>

          {/* Правая колонка со стеком карточек */}
          <div className="hidden lg:flex flex-col gap-4 h-full min-h-0">
            <AgentProfile />
            <QuickActionsPanel onSendMessage={handleSendMessage} />
            <ContactButton />
          </div>
        </div>
      </div>

      {/* Dev Tool: Toggle Demo Mode */}
      <DevModeToggle />
    </main>
  );
}
