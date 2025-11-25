'use client';

import { useState, KeyboardEvent } from 'react';
import { Send, Sparkles } from 'lucide-react';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
  onToggleMenu?: () => void;
}

export function ChatInput({ onSend, disabled = false, onToggleMenu }: ChatInputProps) {
  const [inputValue, setInputValue] = useState('');

  const handleSend = () => {
    if (inputValue.trim() && !disabled) {
      onSend(inputValue.trim());
      setInputValue('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const isInputEmpty = !inputValue.trim();

  return (
    <div className="w-full">
      <div className="relative flex items-end gap-2 bg-black/20 border border-white/10 focus-within:border-white/20 transition-all duration-300 rounded-2xl px-3 py-3">
        {onToggleMenu && (
          <button
            onClick={onToggleMenu}
            className="flex-shrink-0 w-10 h-10 -ml-1 rounded-xl flex items-center justify-center text-zinc-400 hover:text-indigo-400 hover:bg-white/5 transition-all duration-300"
          >
            <Sparkles className="w-5 h-5" />
          </button>
        )}

        <textarea
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder="Введите сообщение..."
          rows={1}
          className="flex-1 bg-transparent text-white placeholder:text-white/40 text-sm resize-none outline-none overflow-hidden max-h-32 py-2.5"
          style={{
            height: 'auto',
            minHeight: '24px',
          }}
          onInput={(e) => {
            const target = e.target as HTMLTextAreaElement;
            target.style.height = 'auto';
            target.style.height = `${Math.min(target.scrollHeight, 128)}px`;
          }}
        />

        <button
          onClick={handleSend}
          disabled={isInputEmpty || disabled}
          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 mb-1 ${isInputEmpty || disabled
            ? 'opacity-50 cursor-not-allowed'
            : 'opacity-100 hover:bg-white/10 active:scale-95'
            }`}
        >
          <Send className={`w-4 h-4 ${isInputEmpty || disabled ? 'text-white/50' : 'text-white/70 hover:text-white'}`} />
        </button>
      </div>
    </div>
  );
}


