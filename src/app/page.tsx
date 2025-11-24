'use client';

import { useChat } from '@/hooks/useChat';
import { MessageList, ChatInput } from '@/components/chat';

export default function Home() {
  const { messages, isLoading, handleSendMessage } = useChat();

  return (
    <main className="relative min-h-screen bg-[#050505] text-white p-4 md:p-8 overflow-hidden bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,3fr)_minmax(0,1fr)] grid-rows-[auto_auto_auto] gap-4 lg:gap-6 h-[calc(100vh-4rem)]">
          {/* Карточка 1: ЧАТ - центральный блок */}
          <div className="lg:row-span-3 bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 ring-1 ring-white/5 rounded-[32px] overflow-hidden flex flex-col shadow-[inset_0_0_20px_rgba(255,255,255,0.02)]">
            {/* Хедер чата */}
            <header className="px-6 py-4 border-b border-white/10">
              <p className="text-[11px] font-mono tracking-[0.35em] uppercase text-emerald-300">
                AI_AGENT_V1.0
              </p>
            </header>

            {/* MessageList */}
            <MessageList messages={messages} isLoading={isLoading} />

            {/* ChatInput - отдельный блок */}
            <div className="border-t border-white/5 p-4">
              <div className="bg-black/50 border border-white/10 rounded-xl p-3">
                <ChatInput onSend={handleSendMessage} disabled={isLoading} />
              </div>
            </div>
          </div>

          {/* Правая колонка со стеком карточек */}
          <div className="lg:row-span-3 flex flex-col gap-4">
            {/* Карточка: СТАТУС */}
            <div className="bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 ring-1 ring-white/5 rounded-[32px] overflow-hidden flex flex-col p-6 shadow-[inset_0_0_20px_rgba(255,255,255,0.02)]">
              <p className="text-xs font-mono tracking-[0.4em] uppercase text-zinc-400 mb-4">
                SYSTEM STATUS
              </p>
              
              {/* Индикатор Online */}
              <div className="flex items-center gap-3 mb-6">
                <div className="relative">
                  <div className="w-3.5 h-3.5 bg-emerald-400 rounded-full animate-ping absolute inset-0 opacity-70" />
                  <div className="w-3.5 h-3.5 bg-emerald-400 rounded-full shadow-[0_0_20px_rgba(16,185,129,0.6)] relative" />
                </div>
                <span className="text-sm text-white font-medium">Online</span>
              </div>

              {/* SVG График (волнистая линия) */}
              <div className="flex-1 flex items-end">
                <svg
                  width="100%"
                  height="60"
                  viewBox="0 0 200 60"
                  className="overflow-visible"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M 0 40 Q 25 20, 50 30 T 100 25 T 150 35 T 200 20"
                    fill="none"
                    stroke="rgb(16, 185, 129)"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>

            {/* Карточка: ANALYTICS */}
            <div className="bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 ring-1 ring-white/5 rounded-[32px] overflow-hidden flex flex-col p-6 shadow-[inset_0_0_20px_rgba(255,255,255,0.02)]">
              <p className="text-xs font-mono tracking-[0.4em] uppercase text-zinc-400 mb-4">
                ANALYTICS
              </p>
              <div className="flex-1 flex items-end">
                <div className="grid grid-cols-4 gap-3 w-full items-end h-28">
                  <div className="h-12 bg-zinc-800 rounded-xl border border-white/5" />
                  <div className="h-20 bg-zinc-800 rounded-xl border border-white/5" />
                  <div className="h-16 bg-zinc-800 rounded-xl border border-white/5" />
                  <div className="h-24 bg-zinc-800 rounded-xl border border-white/5" />
                </div>
              </div>
            </div>

            {/* Карточка: ВОЗМОЖНОСТИ */}
            <div className="bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 ring-1 ring-white/5 rounded-[32px] overflow-hidden flex flex-col p-6 shadow-[inset_0_0_20px_rgba(255,255,255,0.02)]">
              <p className="text-xs font-mono tracking-[0.4em] uppercase text-zinc-400 mb-4">
                CAPABILITIES
              </p>
              
              {/* Список тегов */}
              <div className="flex flex-col gap-3">
                <span className="border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 rounded-full px-3 py-1 text-xs font-medium inline-block w-fit">
                  CRM Sync
                </span>
                <span className="border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 rounded-full px-3 py-1 text-xs font-medium inline-block w-fit">
                  Google Calendar
                </span>
                <span className="border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 rounded-full px-3 py-1 text-xs font-medium inline-block w-fit">
                  24/7 Support
                </span>
                <span className="border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 rounded-full px-3 py-1 text-xs font-medium inline-block w-fit">
                  Multi-language
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
