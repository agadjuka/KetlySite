'use client';

import { useChat } from '@/hooks/useChat';
import { MessageList, ChatInput } from '@/components/chat';
import { Sparkles, Database, ShieldCheck, Coins, TrendingUp, Briefcase, Monitor, AlertTriangle, Rocket, Sliders, Calendar, Globe, Zap, Shield } from 'lucide-react';

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
              <div className="h-5 flex items-center">
                <img src="/Текст для черного.png" alt="Logo" className="h-full w-auto object-contain" />
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-sky-400 shadow-[0_0_10px_rgba(56,189,248,0.5)]"></span>
                <span className="text-xs text-zinc-500">Online 24/7</span>
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
                <div className="w-12 h-12 flex items-center justify-center">
                  <img src="/android-chrome-512x512.png" alt="Logo" className="w-full h-full object-contain" />
                </div>
                <div>
                  <h3 className="text-white font-medium">Ketly</h3>
                  <div className="flex items-center gap-2 mt-0.5">
                    <div className="w-1.5 h-1.5 bg-sky-400 rounded-full shadow-[0_0_8px_rgba(56,189,248,0.5)]" />
                    <span className="text-xs text-zinc-500">Ready to help</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Карточка: Быстрые сообщения */}
            <div className="bg-black/40 backdrop-blur-xl border border-white/5 ring-1 ring-white/5 rounded-2xl overflow-hidden flex flex-col p-5 shadow-xl flex-1 min-h-0">
              <h3 className="text-sm font-medium text-zinc-400 mb-4 shrink-0">Быстрые сообщения</h3>
              <div className="space-y-1.5 overflow-y-auto scrollbar-hide flex-1">

                {/* Карточка 1: Преимущества внедрения */}
                <button
                  onClick={() => handleSendMessage("В чем твои главные преимущества перед живыми сотрудниками? Зачем мне это внедрять?")}
                  className="w-full text-left p-2.5 rounded-lg border border-transparent hover:bg-white/5 hover:border-white/5 transition-all duration-300 ease-out group cursor-pointer hover:-translate-y-0.5"
                >
                  <div className="flex items-start gap-2.5">
                    <div className="p-1.5 rounded-md bg-transparent text-zinc-600 group-hover:bg-violet-500/10 group-hover:text-violet-400/70 transition-all duration-300 ease-out shrink-0">
                      <TrendingUp className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-zinc-400 group-hover:text-zinc-300 transition-colors duration-300">Преимущества внедрения</h4>
                      <p className="text-xs text-zinc-600 leading-relaxed mt-0.5">Зачем моему бизнесу нужен AI-агент и в чем конкретная выгода?</p>
                    </div>
                  </div>
                </button>

                {/* Карточка 2: Кому это подходит */}
                <button
                  onClick={() => handleSendMessage("Для каких сфер бизнеса подходят ваши агенты? Есть ли ниши, с которыми вы не работаете, и подойдет ли это мне?")}
                  className="w-full text-left p-2.5 rounded-lg border border-transparent hover:bg-white/5 hover:border-white/5 transition-all duration-300 ease-out group cursor-pointer hover:-translate-y-0.5"
                >
                  <div className="flex items-start gap-2.5">
                    <div className="p-1.5 rounded-md bg-transparent text-zinc-600 group-hover:bg-indigo-500/10 group-hover:text-indigo-400/70 transition-all duration-300 ease-out shrink-0">
                      <Briefcase className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-zinc-400 group-hover:text-zinc-300 transition-colors duration-300">Кому это подходит</h4>
                      <p className="text-xs text-zinc-600 leading-relaxed mt-0.5">Подойдет ли автоматизация именно для моей ниши и специфики?</p>
                    </div>
                  </div>
                </button>

                {/* Карточка 3: Индивидуальная настройка */}
                <button
                  onClick={() => handleSendMessage("Можно ли настроить твой стиль общения?")}
                  className="w-full text-left p-2.5 rounded-lg border border-transparent hover:bg-white/5 hover:border-white/5 transition-all duration-300 ease-out group cursor-pointer hover:-translate-y-0.5"
                >
                  <div className="flex items-start gap-2.5">
                    <div className="p-1.5 rounded-md bg-transparent text-zinc-600 group-hover:bg-purple-500/10 group-hover:text-purple-400/70 transition-all duration-300 ease-out shrink-0">
                      <Sliders className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-zinc-400 group-hover:text-zinc-300 transition-colors duration-300">Индивидуальная настройка</h4>
                      <p className="text-xs text-zinc-600 leading-relaxed mt-0.5">Можешь ли ты общаться в нашем фирменном стиле?</p>
                    </div>
                  </div>
                </button>

                {/* Карточка 4: Интеграции и CRM */}
                <button
                  onClick={() => handleSendMessage("Расскажи, как ты работаешь с CRM, базами данных, таблицами?")}
                  className="w-full text-left p-2.5 rounded-lg border border-transparent hover:bg-white/5 hover:border-white/5 transition-all duration-300 ease-out group cursor-pointer hover:-translate-y-0.5"
                >
                  <div className="flex items-start gap-2.5">
                    <div className="p-1.5 rounded-md bg-transparent text-zinc-600 group-hover:bg-sky-500/10 group-hover:text-sky-400/70 transition-all duration-300 ease-out shrink-0">
                      <Database className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-zinc-400 group-hover:text-zinc-300 transition-colors duration-300">Интеграции и CRM</h4>
                      <p className="text-xs text-zinc-600 leading-relaxed mt-0.5">Запись в таблицы, календари и работа с CRM.</p>
                    </div>
                  </div>
                </button>

                {/* Карточка 5: Контроль за агентом */}
                <button
                  onClick={() => handleSendMessage("Расскажи, как я могу следить за твоей работой и брать контроль в случае необходимости?")}
                  className="w-full text-left p-2.5 rounded-lg border border-transparent hover:bg-white/5 hover:border-white/5 transition-all duration-300 ease-out group cursor-pointer hover:-translate-y-0.5"
                >
                  <div className="flex items-start gap-2.5">
                    <div className="p-1.5 rounded-md bg-transparent text-zinc-600 group-hover:bg-cyan-500/10 group-hover:text-cyan-400/70 transition-all duration-300 ease-out shrink-0">
                      <Monitor className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-zinc-400 group-hover:text-zinc-300 transition-colors duration-300">Контроль за агентом</h4>
                      <p className="text-xs text-zinc-600 leading-relaxed mt-0.5">Каким образом я могу отслеживать твою работу?</p>
                    </div>
                  </div>
                </button>

                {/* Карточка 6: Нестандартные ситуации */}
                <button
                  onClick={() => handleSendMessage("А если ты не знаешь ответ или клиент начнет ругаться? Что ты будешь делать?")}
                  className="w-full text-left p-2.5 rounded-lg border border-transparent hover:bg-white/5 hover:border-white/5 transition-all duration-300 ease-out group cursor-pointer hover:-translate-y-0.5"
                >
                  <div className="flex items-start gap-2.5">
                    <div className="p-1.5 rounded-md bg-transparent text-zinc-600 group-hover:bg-orange-500/10 group-hover:text-orange-400/70 transition-all duration-300 ease-out shrink-0">
                      <AlertTriangle className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-zinc-400 group-hover:text-zinc-300 transition-colors duration-300">Нестандартные ситуации</h4>
                      <p className="text-xs text-zinc-600 leading-relaxed mt-0.5">Что делает бот, если не знает ответа или клиент настроен негативно?</p>
                    </div>
                  </div>
                </button>

                {/* Карточка 7: Запустить Тест-Драйв */}
                <button
                  onClick={() => handleSendMessage("Я хочу посмотреть демонстрацию. Покажи, как ты мог бы работать в моём бизнесе.")}
                  className="w-full text-left p-2.5 rounded-lg border border-transparent hover:bg-white/5 hover:border-white/5 transition-all duration-300 ease-out group cursor-pointer hover:-translate-y-0.5"
                >
                  <div className="flex items-start gap-2.5">
                    <div className="p-1.5 rounded-md bg-transparent text-zinc-600 group-hover:bg-blue-500/10 group-hover:text-blue-400/70 transition-all duration-300 ease-out shrink-0">
                      <Sparkles className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-zinc-400 group-hover:text-zinc-300 transition-colors duration-300">Запустить Тест-Драйв</h4>
                      <p className="text-xs text-zinc-600 leading-relaxed mt-0.5">Превратите меня в сотрудника вашего бизнеса прямо сейчас.</p>
                    </div>
                  </div>
                </button>

                {/* Карточка 8: Хочу обсудить детали или оформить заказ */}
                <button
                  onClick={() => handleSendMessage("Мне бы хотелось обсудить детали подробнее.")}
                  className="w-full text-left p-2.5 rounded-lg border border-transparent hover:bg-white/5 hover:border-white/5 transition-all duration-300 ease-out group cursor-pointer hover:-translate-y-0.5"
                >
                  <div className="flex items-start gap-2.5">
                    <div className="p-1.5 rounded-md bg-transparent text-zinc-600 group-hover:bg-emerald-500/10 group-hover:text-emerald-400/70 transition-all duration-300 ease-out shrink-0">
                      <Rocket className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-zinc-400 group-hover:text-zinc-300 transition-colors duration-300">Хочу обсудить детали или оформить заказ</h4>
                      <p className="text-xs text-zinc-600 leading-relaxed mt-0.5">Связаться с нами чтобы обсудить детали.</p>
                    </div>
                  </div>
                </button>

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
