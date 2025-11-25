'use client';

import { Activity } from 'lucide-react';

export function SystemStatus() {
  return (
    <div className="h-full flex flex-col justify-between p-6">
      <div>
        <p className="text-xs font-bold tracking-widest uppercase text-zinc-500 mb-4">
          SYSTEM STATUS
        </p>
        <div className="flex items-center gap-3 mb-6">
          <div className="relative">
            <Activity className="w-5 h-5 text-emerald-400" />
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
          </div>
          <div>
            <p className="text-white font-medium">All systems operational</p>
            <p className="text-xs text-zinc-500 mt-0.5">99.9% uptime</p>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 bg-emerald-500 rounded-full" />
        <span className="text-xs text-zinc-400">Online</span>
      </div>
    </div>
  );
}


