'use client';

import { useMemo } from 'react';
import { mapCapabilities } from '@/config/capabilities';
import { QuickActionButton } from './QuickActionButton';
import { useLanguage } from '@/context/LanguageContext';

interface QuickActionsPanelProps {
  onSendMessage: (message: string) => void;
}

export function QuickActionsPanel({ onSendMessage }: QuickActionsPanelProps) {
  const { t } = useLanguage();
  const localizedCapabilities = useMemo(
    () => mapCapabilities(t.capabilities),
    [t],
  );

  return (
    <div className="bg-black/40 backdrop-blur-xl border border-white/5 ring-1 ring-white/5 rounded-2xl overflow-hidden flex flex-col p-5 shadow-xl min-h-0">
      <h3 className="text-sm font-medium text-zinc-400 mb-4 shrink-0" suppressHydrationWarning>{t.chat.quickActionsTitle}</h3>
      <div className="space-y-1.5 overflow-y-auto scrollbar-hide">
        {localizedCapabilities.map((capability) => (
          <QuickActionButton
            key={capability.id}
            capability={capability}
            onClick={onSendMessage}
          />
        ))}
      </div>
    </div>
  );
}

