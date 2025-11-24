'use client';

import { useState, KeyboardEvent } from 'react';
import { Send } from 'lucide-react';
import { motion } from 'framer-motion';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export function ChatInput({ onSend, disabled = false }: ChatInputProps) {
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="sticky bottom-0 w-full pb-4 pt-2"
    >
      <div className="relative flex items-end gap-3 bg-black/50 backdrop-blur-xl rounded-full border border-white/10 focus-within:border-white/30 transition-all duration-300 px-4 py-3">
        <textarea
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder="Введите сообщение..."
          rows={1}
          className="flex-1 bg-transparent text-white placeholder:text-white/40 text-sm resize-none outline-none overflow-hidden max-h-32"
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

        <motion.button
          onClick={handleSend}
          disabled={isInputEmpty || disabled}
          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
            isInputEmpty || disabled
              ? 'opacity-50 cursor-not-allowed'
              : 'opacity-100 hover:bg-white/10 active:scale-95'
          }`}
          whileHover={!isInputEmpty && !disabled ? { scale: 1.05 } : {}}
          whileTap={!isInputEmpty && !disabled ? { scale: 0.95 } : {}}
        >
          <Send className="w-4 h-4 text-white" />
        </motion.button>
      </div>
    </motion.div>
  );
}


