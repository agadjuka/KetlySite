'use client';

import { Message } from '@/types/chat';
import { formatMessageText } from '@/lib/textFormatter';
import carableIcon from '../assets/logos/carable-icon.png';

interface ChatMessageCarRentalProps {
  message: Message;
}

export function ChatMessageCarRental({ message }: ChatMessageCarRentalProps) {
  const isUser = message.role === 'user';
  const messageWasInDemoMode = message.isDemoMode === true;

  return (
    <div className={`flex gap-3 items-center ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center">
          <img src={carableIcon.src} alt="AI" className="w-full h-full object-contain" />
        </div>
      )}

      <div
        className={`max-w-[85%] sm:max-w-[80%] rounded-2xl px-3 sm:px-4 py-2.5 sm:py-3 transition-colors duration-700 ease-in-out ${isUser
          ? 'bg-zinc-800/40 text-white border border-white/10'
          : messageWasInDemoMode
            ? 'bg-yellow-500/8 text-zinc-200 border border-yellow-400/60'
            : 'bg-zinc-900/40 text-zinc-200 border border-white/5'
          }`}
      >
        <p className="text-sm leading-relaxed whitespace-pre-wrap break-words select-text" style={{ WebkitUserSelect: 'text', userSelect: 'text' }}>
          {formatMessageText(message.content)}
        </p>
      </div>
    </div>
  );
}




