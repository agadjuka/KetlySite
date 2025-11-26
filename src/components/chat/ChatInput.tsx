'use client';

import { useState, KeyboardEvent } from 'react';
import { Send } from 'lucide-react';
import { useDemoMode } from '@/context/DemoContext';
import { useLanguage } from '@/context/LanguageContext';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
  onToggleMenu?: () => void;
}

export function ChatInput({ onSend, disabled = false, onToggleMenu }: ChatInputProps) {
  const [inputValue, setInputValue] = useState('');
  const { isDemoMode } = useDemoMode();
  const { t } = useLanguage();

  const isInputEmpty = !inputValue.trim();

  const handleSend = () => {
    if (!isInputEmpty && !disabled) {
      onSend(inputValue.trim());
      setInputValue('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
    const target = e.target as HTMLTextAreaElement;
    target.style.height = 'auto';
    target.style.height = `${Math.min(target.scrollHeight, 128)}px`;
  };

  return (
    <div className="w-full">
      <div className={`relative flex items-center gap-0.5 bg-black/20 border rounded-2xl px-3 py-3 transition-all duration-700 ease-in-out ${isDemoMode ? 'border-yellow-400/50 focus-within:border-yellow-400/70' : 'border-white/10 focus-within:border-white/20'}`}>
        {onToggleMenu && (
          <>
            <button
              onClick={onToggleMenu}
              className="flex-shrink-0 p-1.5 rounded-lg bg-white/5 border border-white/5 text-zinc-400 hover:text-sky-400 hover:border-sky-500/20 transition-colors duration-300 lg:hidden group flex items-center justify-center"
            >
              <span className="text-base">✨</span>
            </button>
            <div className="w-px h-5 bg-white/10 mb-1.5 mx-1 lg:hidden" />
          </>
        )}
        <textarea
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder={t.chat.inputPlaceholder}
          rows={1}
          className="flex-1 bg-transparent text-white placeholder:text-white/40 text-sm resize-none outline-none overflow-hidden max-h-32 py-2.5"
          suppressHydrationWarning
          style={{ 
            touchAction: 'manipulation',
            fontSize: '16px',
          }}
        />
        <button
          onClick={handleSend}
          disabled={isInputEmpty || disabled}
          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 mb-1 ${isInputEmpty || disabled ? 'opacity-50 cursor-not-allowed' : 'opacity-100 hover:bg-white/10 active:scale-95'}`}
        >
          <Send className={`w-4 h-4 transition-colors duration-700 ease-in-out ${isInputEmpty || disabled 
            ? isDemoMode ? 'text-yellow-400/70' : 'text-white/50'
            : isDemoMode ? 'text-yellow-300 hover:text-yellow-200' : 'text-white/70 hover:text-white'
          }`} />
        </button>
      </div>
    </div>
  );
}
