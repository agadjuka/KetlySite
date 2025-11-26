'use client';

import { capabilities } from '@/config/capabilities';
import { QuickActionButton } from './QuickActionButton';

interface QuickActionsPanelProps {
  onSendMessage: (message: string) => void;
}

export function QuickActionsPanel({ onSendMessage }: QuickActionsPanelProps) {
  return (
    <div className="bg-black/40 backdrop-blur-xl border border-white/5 ring-1 ring-white/5 rounded-2xl overflow-hidden flex flex-col p-5 shadow-xl min-h-0">
      <h3 className="text-sm font-medium text-zinc-400 mb-4 shrink-0">Быстрые сообщения</h3>
      <div className="space-y-1.5 overflow-y-auto scrollbar-hide">
        {capabilities.map((capability, index) => (
          <QuickActionButton
            key={index}
            capability={capability}
            onClick={onSendMessage}
          />
        ))}
      </div>
    </div>
  );
}



