'use client';

import { useState, useEffect, useRef } from 'react';

/** Сообщение для фоновой анимации чата */
export interface ChatMessage {
  role: 'client' | 'admin';
  time: string;
  text: string;
}

/** Список сообщений по порядку (как в мессенджере) */
export const CHAT_MESSAGES: ChatMessage[] = [
  { role: 'client', time: '10:42 AM', text: 'Hi, do you build houses turnkey?' },
  { role: 'admin', time: '10:42 AM', text: 'Hello! Yes, we design and build turnkey villas in Dubai — from concept and permits to finishing. May I ask, do you already own a plot?' },
  { role: 'client', time: '10:43 AM', text: 'Not yet, still choosing a location.' },
  { role: 'admin', time: '10:43 AM', text: 'No problem, we can also help evaluate plots before purchase. What area are you considering?' },
  { role: 'client', time: '10:44 AM', text: 'Maybe Dubailand or Al Furjan.' },
  { role: 'admin', time: '10:44 AM', text: 'Both are good options. Are you planning a family residence or an investment property?' },
  { role: 'client', time: '10:45 AM', text: 'Family, probably around 4 bedrooms.' },
  { role: 'admin', time: '10:45 AM', text: 'Great. Approximately what size are you thinking — around 250–350 m²?' },
  { role: 'client', time: '10:46 AM', text: 'Yes, about 300 m².' },
  { role: 'admin', time: '10:46 AM', text: 'Understood. Do you prefer a modern style or something more classic?' },
  { role: 'client', time: '10:47 AM', text: 'Modern, minimalistic.' },
  { role: 'admin', time: '10:47 AM', text: "Perfect, that's the most requested style now. Would you like a swimming pool included?" },
  { role: 'client', time: '10:48 AM', text: 'Yes, small pool.' },
  { role: 'admin', time: '10:48 AM', text: 'Noted. Do you also need landscaping and outdoor seating areas?' },
  { role: 'client', time: '10:49 AM', text: 'Yes, a garden area would be nice.' },
  { role: 'admin', time: '10:49 AM', text: 'Sure. May I know your approximate budget range so I can suggest suitable specifications?' },
  { role: 'client', time: '10:50 AM', text: 'Around 2.5–3 million AED.' },
  { role: 'admin', time: '10:50 AM', text: 'That works for a 300 m² modern villa with a pool. When are you planning to start construction?' },
  { role: 'client', time: '10:51 AM', text: 'Maybe this year.' },
  { role: 'admin', time: '10:51 AM', text: 'Good timing — permitting usually takes 4–6 weeks. Would you like me to arrange a free consultation call with our architect?' },
  { role: 'client', time: '10:52 AM', text: 'Yes.' },
  { role: 'admin', time: '10:52 AM', text: 'Perfect. Could you please share your preferred contact number and a convenient time today or tomorrow?' },
];

const PAUSE_BETWEEN_MESSAGES_MS = 5500;
const PAUSE_AFTER_ALL_MS = 6000;
const FIRST_MESSAGE_DELAY_MS = 3000;

function ChatBubble({ message }: { message: ChatMessage }) {
  const isClient = message.role === 'client';
  return (
    <div
      className={`chat-msg-pop-in max-w-[85%] ${isClient ? 'self-start' : 'self-end'}`}
      aria-hidden
    >
      <div
        className={
          isClient
            ? 'bg-black/60 backdrop-blur-[12px] border border-white/10 border-l-amber-500/20 p-5 rounded-2xl rounded-bl-sm shadow-2xl'
            : 'bg-neutral-900/80 backdrop-blur-[12px] border border-amber-500/30 p-5 rounded-2xl rounded-br-sm shadow-[0_0_30px_rgba(0,0,0,0.5)]'
        }
      >
        <div className={`flex items-center gap-2 mb-2 ${isClient ? 'opacity-60' : 'justify-end'}`}>
          <span
            className={`text-[9px] font-mono uppercase tracking-wider ${isClient ? 'text-neutral-400' : 'text-amber-500'}`}
          >
            {message.role === 'client' ? 'Client' : 'AI Administrator'} • {message.time}
          </span>
        </div>
        <p
          className={`font-mono text-xs leading-relaxed tracking-wide ${isClient ? 'text-neutral-200' : 'text-white text-right'}`}
        >
          {message.text}
        </p>
      </div>
    </div>
  );
}

/**
 * Фоновый чат для раздела AI: сообщения появляются по одному с паузой,
 * как в мессенджере (клиент слева, админ справа), затем цикл повторяется.
 */
export function AnimatedChatBackground() {
  const [visibleCount, setVisibleCount] = useState(0);
  const [cycle, setCycle] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (visibleCount === 0) {
      timerRef.current = setTimeout(() => setVisibleCount(1), FIRST_MESSAGE_DELAY_MS);
      return () => {
        if (timerRef.current) clearTimeout(timerRef.current);
      };
    }
    const isLastBatch = visibleCount >= CHAT_MESSAGES.length;
    const delay = isLastBatch ? PAUSE_AFTER_ALL_MS : PAUSE_BETWEEN_MESSAGES_MS;
    timerRef.current = setTimeout(() => {
      setVisibleCount((c) => {
        if (c < CHAT_MESSAGES.length) return c + 1;
        setCycle((cy) => cy + 1);
        return 0;
      });
    }, delay);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [visibleCount, cycle]);

  // Прокрутка вниз при появлении нового сообщения, чтобы оно всегда было видно
  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const scrollToBottom = () => {
      el.scrollTop = el.scrollHeight;
    };
    scrollToBottom();
    const t = setTimeout(scrollToBottom, 100);
    return () => clearTimeout(t);
  }, [visibleCount]);

  const visible = CHAT_MESSAGES.slice(0, visibleCount);

  return (
    <div
      className="absolute inset-0 z-0 hidden md:flex pointer-events-none select-none overflow-hidden h-full"
      aria-hidden
    >
      <div className="absolute inset-y-0 left-0 right-0 lg:left-[34%] lg:right-[38%] flex justify-center items-end pb-24">
        <div className="w-full max-w-[260px] md:max-w-[280px] lg:max-w-[300px] h-full chat-mask flex flex-col min-h-0">
        <div
          ref={scrollContainerRef}
          className="w-full flex-1 flex flex-col justify-end gap-4 md:gap-5 lg:gap-6 opacity-[0.12] md:opacity-20 lg:opacity-30 px-2 min-h-0 overflow-y-auto overflow-x-hidden scrollbar-hide"
        >
          {visible.map((msg, i) => (
            <ChatBubble key={`${cycle}-${i}`} message={msg} />
          ))}
        </div>
        </div>
      </div>
    </div>
  );
}
