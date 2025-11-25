'use client';

import { useChat } from '@/hooks/useChat';
import { MessageList, ChatInput } from '@/components/chat';
import { Check, Calendar, Activity, Globe, Zap, Shield } from 'lucide-react';

export default function Home() {
  const { messages, isLoading, handleSendMessage } = useChat();

  return (
    <main className="h-full w-full bg-[#050505] text-white p-2 md:p-4 overflow-hidden flex flex-col relative">
      {/* Ambient Mesh Gradients */}
      <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 mix-blend-screen" />
      <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none translate-x-1/3 translate-y-1/3 mix-blend-screen" />

      <div className="relative z-10 flex-1 min-h-0">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,3fr)_minmax(0,1fr)] gap-4 lg:gap-6 h-full">
          {/* Карточка 1: ЧАТ - центральный блок */}
          <div className="bg-black/40 backdrop-blur-xl border border-white/5 ring-1 ring-white/5 rounded-2xl overflow-hidden flex flex-col shadow-2xl h-full">
            {/* Хедер чата */}
            <header className="px-6 py-4 border-b border-white/5 flex items-center justify-between shrink-0">
              <h2 className="text-sm font-medium text-zinc-400">Demo Session</h2>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-sky-400 shadow-[0_0_10px_rgba(56,189,248,0.5)]"></span>
                <span className="text-xs text-zinc-500">Live</span>
              </div>
            </header>

            {/* MessageList */}
            <MessageList messages={messages} isLoading={isLoading} />

            {/* ChatInput - отдельный блок */}
            <div className="border-t border-white/5 p-4 bg-transparent shrink-0">
              <div className="bg-zinc-900/50 border border-white/5 rounded-xl p-1 transition-colors focus-within:bg-zinc-900 focus-within:border-white/10">
                <ChatInput onSend={handleSendMessage} disabled={isLoading} />
              </div>
            </div>
          </div>

          {/* Правая колонка со стеком карточек */}
          <div className="flex flex-col gap-4 h-full min-h-0">
            {/* Карточка: Agent Profile */}
            <div className="bg-black/40 backdrop-blur-xl border border-white/5 ring-1 ring-white/5 rounded-2xl overflow-hidden flex flex-col p-5 shadow-xl shrink-0">
              <div className="flex items-center gap-4 mb-1">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center text-white font-medium text-lg shadow-lg shadow-sky-500/20">
                  E
                </div>
                <div>
                  <h3 className="text-white font-medium">Eva AI</h3>
                  <div className="flex items-center gap-2 mt-0.5">
                    <div className="w-1.5 h-1.5 bg-sky-400 rounded-full shadow-[0_0_8px_rgba(56,189,248,0.5)]" />
                    <span className="text-xs text-zinc-500">Ready to help</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Карточка: Activity Log */}
            <div className="bg-black/40 backdrop-blur-xl border border-white/5 ring-1 ring-white/5 rounded-2xl overflow-hidden flex flex-col p-5 shadow-xl flex-1 min-h-0">
              <h3 className="text-sm font-medium text-zinc-400 mb-4 shrink-0">Activity Log</h3>
              <div className="space-y-4 overflow-y-auto scrollbar-hide flex-1">
                <div className="flex items-start gap-3 group">
                  <div className="p-2 rounded-lg bg-zinc-900/50 text-zinc-400 group-hover:text-sky-400 group-hover:bg-sky-500/10 transition-colors">
                    <Check className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm text-zinc-300">Connected to CRM</p>
                    <p className="text-xs text-zinc-600 mt-0.5">Just now</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 group">
                  <div className="p-2 rounded-lg bg-zinc-900/50 text-zinc-400 group-hover:text-blue-400 group-hover:bg-blue-500/10 transition-colors">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm text-zinc-300">Calendar Synced</p>
                    <p className="text-xs text-zinc-600 mt-0.5">2 mins ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 group">
                  <div className="p-2 rounded-lg bg-zinc-900/50 text-zinc-400 group-hover:text-blue-400 group-hover:bg-blue-500/10 transition-colors">
                    <Activity className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm text-zinc-300">System Optimized</p>
                    <p className="text-xs text-zinc-600 mt-0.5">1 hour ago</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Карточка: Integrations */}
            <div className="bg-black/40 backdrop-blur-xl border border-white/5 ring-1 ring-white/5 rounded-2xl overflow-hidden flex flex-col p-5 shadow-xl shrink-0">
              <h3 className="text-sm font-medium text-zinc-400 mb-4">Integrations</h3>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1.5 rounded-md bg-zinc-900 border border-white/5 text-xs text-zinc-400 hover:text-zinc-200 hover:border-white/10 transition-colors cursor-default flex items-center gap-1.5">
                  <Globe className="w-3 h-3" /> CRM
                </span>
                <span className="px-3 py-1.5 rounded-md bg-zinc-900 border border-white/5 text-xs text-zinc-400 hover:text-zinc-200 hover:border-white/10 transition-colors cursor-default flex items-center gap-1.5">
                  <Calendar className="w-3 h-3" /> Calendar
                </span>
                <span className="px-3 py-1.5 rounded-md bg-zinc-900 border border-white/5 text-xs text-zinc-400 hover:text-zinc-200 hover:border-white/10 transition-colors cursor-default flex items-center gap-1.5">
                  <Zap className="w-3 h-3" /> Support
                </span>
                <span className="px-3 py-1.5 rounded-md bg-zinc-900 border border-white/5 text-xs text-zinc-400 hover:text-zinc-200 hover:border-white/10 transition-colors cursor-default flex items-center gap-1.5">
                  <Shield className="w-3 h-3" /> Security
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

