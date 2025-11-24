'use client';

import { Zap } from 'lucide-react';

export function Performance() {
  return (
    <div className="h-full flex flex-col justify-between p-6">
      <div>
        <p className="text-xs font-bold tracking-widest uppercase text-zinc-500 mb-6">
          PERFORMANCE
        </p>
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-4xl font-bold text-white">0.4s</span>
          <span className="text-sm text-zinc-500">latency</span>
        </div>
        <p className="text-xs text-zinc-400 mb-6">Average response time</p>
      </div>
      <div className="flex items-center gap-2 text-zinc-500">
        <Zap className="w-4 h-4" />
        <span className="text-xs">Optimized</span>
      </div>
    </div>
  );
}

