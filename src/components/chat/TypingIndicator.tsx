'use client';

import { motion } from 'framer-motion';

export function TypingIndicator() {
  const dots = [0, 1, 2];

  return (
    <div className="flex gap-3 justify-start items-center">
      <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center">
        <img src="/android-chrome-512x512.png" alt="AI" className="w-full h-full object-contain" />
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


