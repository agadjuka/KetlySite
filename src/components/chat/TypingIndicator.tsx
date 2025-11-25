'use client';

import { motion } from 'framer-motion';

export function TypingIndicator() {
  const dots = [0, 1, 2];

  return (
    <div className="flex gap-3 justify-start items-center">
      <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center">
        <img src="/android-chrome-512x512.png" alt="AI" className="w-full h-full object-contain" />
      </div>

      <div className="bg-white/5 backdrop-blur-md rounded-full px-4 py-2 border border-white/10 shadow-inner shadow-black/10">
        <div className="flex gap-1.5 items-center">
          {dots.map((index) => (
            <motion.span
              key={index}
              className="h-1.5 w-1.5 rounded-full bg-white/70"
              animate={{
                opacity: [0.2, 1, 0.2],
                scale: [0.6, 1.1, 0.6],
                y: [0, -2, 0],
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: index * 0.15,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}




