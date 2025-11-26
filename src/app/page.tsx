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
      <div className={`absolute top-0 left-0 w-[400px] h-[400px] lg:w-[800px] lg:h-[800px] blur-[80px] lg:blur-[120px] rounded-full pointer-events-none -translate-x-1/2 -translate-y-3/4 lg:-translate-y-1/2 mix-blend-screen transition-colors duration-700 ease-in-out ${isDemoMode ? 'bg-yellow-400/20' : 'bg-blue-600/10'}`} />
      <div className={`absolute bottom-0 right-0 w-[400px] h-[400px] lg:w-[800px] lg:h-[800px] blur-[80px] lg:blur-[120px] rounded-full pointer-events-none translate-x-1/3 translate-y-0 lg:translate-y-1/3 mix-blend-screen transition-colors duration-700 ease-in-out ${isDemoMode ? 'bg-yellow-400/30' : 'bg-blue-600/20'}`} />

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
            <div className={`border-t p-3 sm:p-4 bg-transparent shrink-0 transition-colors duration-700 ease-in-out ${isDemoMode ? 'border-yellow-400/50' : 'border-white/5'}`}>
              {/* Кнопка остановки демо-режима */}
              {isDemoMode && (
                <div className="mb-3 flex justify-center">
                  <button
                    onClick={() => handleSendMessage('Стоп')}
                    className="px-4 py-2 bg-yellow-400/95 hover:bg-yellow-400 text-black text-sm font-medium rounded-lg border border-yellow-300/60 shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Остановить демонстрацию
                  </button>
                </div>
              )}
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
