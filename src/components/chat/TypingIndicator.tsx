'use client';

import { motion } from 'framer-motion';
import { Bot } from 'lucide-react';

export function TypingIndicator() {
  const dots = [0, 1, 2];

  return (
    <div className="flex gap-3 justify-start">
      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-white/10 flex items-center justify-center mt-1">
        <Bot className="w-4 h-4 text-white" />
      </div>

      <div className="bg-white/5 backdrop-blur-md rounded-2xl px-4 py-3 border border-white/10">
        <div className="flex gap-1.5 items-center">
          {dots.map((index) => (
            <motion.div
              key={index}
              className="w-2 h-2 rounded-full bg-white/60"
              animate={{
                y: [0, -8, 0],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: index * 0.2,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}


