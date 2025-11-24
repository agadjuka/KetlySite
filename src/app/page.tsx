'use client';

import { useChat } from '@/hooks/useChat';
import { MessageList, ChatInput } from '@/components/chat';

export default function Home() {
  const { messages, isLoading, handleSendMessage } = useChat();

  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Ambient Background - Градиентные пятна */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-1/4 right-1/4 w-[32rem] h-[32rem] bg-purple-900/20 rounded-full blur-3xl opacity-30" />
        <div className="absolute top-1/2 right-1/3 w-80 h-80 bg-blue-900/20 rounded-full blur-3xl opacity-20" />
      </div>

      {/* Центральная панель чата */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full h-full md:max-w-2xl md:h-[85vh] flex flex-col bg-zinc-900/40 backdrop-blur-2xl border border-white/10 rounded-none md:rounded-2xl shadow-2xl shadow-black/50">
          {/* Header */}
          <header className="p-4 border-b border-white/5">
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-semibold text-white">AI Assistant</h1>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                <span className="text-sm text-white/60">Online</span>
              </div>
            </div>
          </header>

          {/* MessageList */}
          <MessageList messages={messages} isLoading={isLoading} />

          {/* ChatInput */}
          <div className="p-4 border-t border-white/5">
            <ChatInput onSend={handleSendMessage} disabled={isLoading} />
          </div>
        </div>
      </div>
    </main>
  );
}

