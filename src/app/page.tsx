'use client';

import { useState } from 'react';
import { useChat } from '@/hooks/useChat';
import { MessageList, ChatInput, MobileQuickActions } from '@/components/chat';
import { Sparkles, Database, ShieldCheck, Coins, TrendingUp, Briefcase, Monitor, AlertTriangle, Rocket, Sliders, Bot, Calendar, Globe, Zap, Shield, X } from 'lucide-react';

export default function Home() {
  const { messages, isLoading, handleSendMessage } = useChat();
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const capabilities = [
    { title: "Преимущества внедрения", icon: TrendingUp, payload: "В чем твои главные преимущества перед живыми сотрудниками? Зачем мне это внедрять?" },
    { title: "Кому это подходит", icon: Briefcase, payload: "Для каких сфер бизнеса подходят ваши агенты? Есть ли ниши, с которыми вы не работаете, и подойдет ли это мне?" },
    { title: "Индивидуальная настройка", icon: Sliders, payload: "Можно ли настроить твой стиль общения?" },
    { title: "Интеграции и CRM", icon: Database, payload: "Расскажи, как ты работаешь с CRM, базами данных, таблицами?" },
    { title: "Контроль за агентом", icon: Monitor, payload: "Расскажи, как я могу следить за твоей работой и брать контроль в случае необходимости?" },
    { title: "Нестандартные ситуации", icon: AlertTriangle, payload: "А если ты не знаешь ответ или клиент начнет ругаться? Что ты будешь делать?" },
    { title: "Запустить Тест-Драйв", icon: Sparkles, payload: "Я хочу посмотреть демонстрацию. Покажи, как ты мог бы работать в моём бизнесе." },
    { title: "Хочу обсудить детали", icon: Rocket, payload: "Мне бы хотелось обсудить детали подробнее." },
  ];

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
      <div className="absolute top-0 left-0 w-[400px] h-[400px] lg:w-[800px] lg:h-[800px] bg-blue-600/10 blur-[80px] lg:blur-[120px] rounded-full pointer-events-none -translate-x-1/2 -translate-y-3/4 lg:-translate-y-1/2 mix-blend-screen" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] lg:w-[800px] lg:h-[800px] bg-blue-600/20 blur-[80px] lg:blur-[120px] rounded-full pointer-events-none translate-x-1/3 translate-y-0 lg:translate-y-1/3 mix-blend-screen" />

      <div className="relative z-10 flex-1 min-h-0 p-0 lg:p-4">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,3fr)_minmax(0,1fr)] gap-4 lg:gap-6 h-full">
          {/* Карточка 1: ЧАТ - центральный блок */}
          <div className="bg-black/40 backdrop-blur-xl border-0 lg:border lg:border-white/5 ring-0 lg:ring-1 lg:ring-white/5 rounded-none lg:rounded-2xl overflow-hidden flex flex-col shadow-2xl h-full">
            {/* Хедер чата */}
            <header className="px-4 sm:px-6 py-4 sm:py-5 border-b border-white/5 flex items-center justify-between shrink-0">
              <div className="h-5 flex items-center gap-2">
                <img src="/logo-text-black.png" alt="Logo" className="h-full w-auto object-contain" />
                <img src="/android-chrome-512x512.png" alt="Logo" className="h-5 w-5 object-contain lg:hidden" />
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-sky-400 shadow-[0_0_10px_rgba(56,189,248,0.5)]"></span>
                <span className="text-xs text-zinc-500">Online 24/7</span>
              </div>
            </header>

            {/* MessageList */}
            <MessageList messages={messages} isLoading={isLoading} />

            {/* ChatInput - отдельный блок */}
            <div className="border-t border-white/5 p-3 sm:p-4 bg-transparent shrink-0">
              <div className="bg-zinc-900/50 border border-white/5 rounded-xl p-1 transition-colors focus-within:bg-zinc-900 focus-within:border-white/10 relative">
                <ChatInput
                  onSend={handleSendMessage}
                  disabled={isLoading}
                  onToggleMenu={() => setIsMobileMenuOpen(prev => !prev)}
                />
                <MobileQuickActions
                  isOpen={isMobileMenuOpen}
                  onClose={() => setIsMobileMenuOpen(false)}
                  onSelect={handleSendMessage}
                  capabilities={capabilities}
                />
              </div>
            </div>
          </div>

          {/* Правая колонка со стеком карточек */}
          <div className="hidden lg:flex flex-col gap-4 h-full min-h-0">
            {/* Карточка: Agent Profile */}
            <div className="bg-black/40 backdrop-blur-xl border border-white/5 ring-1 ring-white/5 rounded-2xl overflow-hidden flex flex-col p-5 shadow-xl shrink-0">
              <div className="flex items-center gap-4 mb-1">
                <div className="w-12 h-12 flex items-center justify-center">
                  <img src="/android-chrome-512x512.png" alt="Logo" className="w-full h-full object-contain" />
                </div>
                <div>
                  <h3 className="text-white font-medium">KETLY</h3>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs text-zinc-500">ИИ Администратор для вашего бизнеса</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Карточка: Быстрые сообщения */}
            <div className="bg-black/40 backdrop-blur-xl border border-white/5 ring-1 ring-white/5 rounded-2xl overflow-hidden flex flex-col p-5 shadow-xl min-h-0">
              <h3 className="text-sm font-medium text-zinc-400 mb-4 shrink-0">Быстрые сообщения</h3>
              <div className="space-y-1.5 overflow-y-auto scrollbar-hide">

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

            {/* Карточка: Связаться с нами (Интерактивная) */}
            <div
              className="bg-black/40 backdrop-blur-xl border border-white/5 ring-1 ring-white/5 rounded-2xl overflow-hidden shadow-xl shrink-0 self-end mt-auto w-48 h-12 flex items-center justify-center transition-all duration-300 ease-out"
            >
              {isContactOpen ? (
                <div className="animate-in fade-in zoom-in duration-300 flex items-center justify-center gap-6 w-full h-full">
                  {/* Telegram */}
                  <a
                    href="https://t.me/your_telegram"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 flex items-center justify-center text-zinc-400 hover:text-[#229ED9] transition-all duration-300 hover:scale-110"
                  >
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.16.16-.295.293-.605.293l.214-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.942z" />
                    </svg>
                  </a>

                  {/* WhatsApp */}
                  <a
                    href="https://wa.me/your_whatsapp"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 flex items-center justify-center text-zinc-400 hover:text-[#25D366] transition-all duration-300 hover:scale-110"
                  >
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                    </svg>
                  </a>
                </div>
              ) : (
                <button
                  onClick={() => setIsContactOpen(true)}
                  className="w-full h-full flex items-center justify-center text-sm font-medium text-zinc-400 hover:text-zinc-200 hover:bg-white/5 transition-all duration-300"
                >
                  <span>Связаться с нами</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
