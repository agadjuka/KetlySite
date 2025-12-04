'use client';

import { useRef } from 'react';
import { QuickActionButton } from './QuickActionButton';
import { useLanguage } from '@/context/LanguageContext';
import { cardBaseStyles } from '@/lib/cardStyles';
import { useScrollIndicators } from '@/hooks/useScrollIndicators';
import { ScrollArrows } from '@/components/ui/ScrollArrows';
import type { Capability } from '@/config/capabilities';

interface QuickActionsPanelProps {
  onSendMessage: (message: string) => void;
  items?: Capability[];
}

export function QuickActionsPanel({ onSendMessage, items = [] }: QuickActionsPanelProps) {
  const { t } = useLanguage();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { showTop, showBottom } = useScrollIndicators(scrollContainerRef);

  // Если нет элементов, скрываем панель
  if (items.length === 0) {
    return null;
  }

  return (
    <div className={`${cardBaseStyles} overflow-hidden flex flex-col p-5 shadow-xl min-h-0 relative`}>
      <h3 className="text-sm font-medium text-zinc-400 mb-4 shrink-0" suppressHydrationWarning>{t.chat.quickActionsTitle}</h3>
      <div 
        ref={scrollContainerRef}
        className="space-y-1.5 overflow-y-auto scrollbar-hide flex-1 min-h-0 pb-1"
      >
        {items.map((capability) => (
          <QuickActionButton
            key={capability.id}
            capability={capability}
            onClick={onSendMessage}
          />
        ))}
      </div>
      <ScrollArrows 
        containerRef={scrollContainerRef}
        showTop={showTop}
        showBottom={showBottom}
      />
    </div>
  );
}
