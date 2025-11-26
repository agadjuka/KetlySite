'use client';

import { Message } from '@/types/chat';
import { formatMessageText } from '@/lib/textFormatter';
import { useDemoMode } from '@/context/DemoContext';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';
  const { isDemoMode } = useDemoMode();

  return (
    <div className={`flex gap-3 items-center ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className={`flex-shrink-0 w-8 h-8 flex items-center justify-center transition-colors duration-700 ease-in-out ${isDemoMode ? 'ring-2 ring-amber-500/30 rounded-full' : ''}`}>
          <img src="/android-chrome-512x512.png" alt="AI" className="w-full h-full object-contain" />
        </div>
      )}

      <div
        className={`max-w-[85%] sm:max-w-[80%] rounded-2xl px-3 sm:px-4 py-2.5 sm:py-3 transition-colors duration-700 ease-in-out ${isUser
          ? 'bg-zinc-800 text-white border border-white/10'
          : isDemoMode
            ? 'bg-amber-950/40 text-amber-100 border border-amber-500/30'
            : 'bg-zinc-900/80 text-zinc-200 border border-white/5'
          }`}
      >
        <p className="text-sm leading-relaxed whitespace-pre-wrap break-words select-text" style={{ WebkitUserSelect: 'text', userSelect: 'text' }}>
          {formatMessageText(message.content)}
        </p>
      </div>
    </div>
  );
}


