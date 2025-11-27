'use client';

import { useMemo } from 'react';
import { mapCapabilities } from '@/config/capabilities';
import { QuickActionButton } from './QuickActionButton';
import { useLanguage } from '@/context/LanguageContext';
import { cardBaseStyles } from '@/lib/cardStyles';

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
    <div className={`${cardBaseStyles} overflow-hidden flex flex-col p-5 shadow-xl min-h-0`}>
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

