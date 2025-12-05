'use client';

import { useState, useEffect } from 'react';
import { ExternalLink, Loader2 } from 'lucide-react'; // Убедись, что иконки есть
import { cn } from '@/lib/utils'; // Или твой путь к утилите

interface GoogleSheetEmbedProps {
  sheetId: string;
  gid?: string;
  className?: string;
  scale?: number; // Коэффициент зума (например, 0.65)
  href?: string;
}

export function GoogleSheetEmbed({ 
  sheetId, 
  gid, 
  className,
  scale = 0.65, // Дефолтный зум, чтобы влезало больше данных
  href
}: GoogleSheetEmbedProps) {
  const [refreshKey, setRefreshKey] = useState(0);
  const [isSyncing, setIsSyncing] = useState(false);

  // 1. SMART REFRESH (Обновление по событию от агента)
  useEffect(() => {
    const handleRefresh = () => {
      setIsSyncing(true);
      // Небольшая задержка перед обновлением ключа, чтобы показать лоадер
      setTimeout(() => {
        setRefreshKey(prev => prev + 1);
        // Скрываем лоадер после загрузки (даем время iframe прогрузиться)
        setTimeout(() => setIsSyncing(false), 2500);
      }, 300);
    };

    window.addEventListener('google-sheet-refresh', handleRefresh);
    return () => window.removeEventListener('google-sheet-refresh', handleRefresh);
  }, []);

  if (!sheetId) return null;

  const targetGid = gid || '0';
  const editHref = href || `https://docs.google.com/spreadsheets/d/${sheetId}/edit#gid=${targetGid}`;
  
  // URL для встраивания: используем htmlembed + single=true для изоляции листа
  const src = `https://docs.google.com/spreadsheets/d/${sheetId}/htmlembed?gid=${targetGid}&single=true&widget=false&headers=false&chrome=false&t=${refreshKey}`;

  return (
    <div className={cn(
      "flex flex-col rounded-xl overflow-hidden border border-white/10 bg-white/5 relative group transition-all duration-300 hover:border-amber-500/50 hover:shadow-lg hover:shadow-amber-500/10",
      className
    )}>
      
      {/* 2. HEADER (Кликабельная зона для открытия) */}
      <a 
        href={editHref} 
        target="_blank" 
        rel="noopener noreferrer"
        className="h-7 bg-white/5 border-b border-white/5 flex items-center justify-between px-3 cursor-pointer hover:bg-white/10 transition-colors z-10"
        title="Открыть в Google Таблицах"
      >
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-[10px] uppercase tracking-wider font-medium text-white/50 group-hover:text-amber-400 transition-colors">
            Live Database
          </span>
        </div>
        <ExternalLink className="w-3 h-3 text-white/30 group-hover:text-white/80" />
      </a>

      {/* 3. IFRAME CONTAINER (Скроллируемая зона) */}
      <div className="flex-1 relative bg-white w-full overflow-hidden">
        {/* Оверлей загрузки */}
        <div 
          className={cn(
            "absolute inset-0 z-20 bg-zinc-900/80 backdrop-blur-sm flex items-center justify-center transition-opacity duration-500",
            isSyncing ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          )}
        >
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="w-6 h-6 text-amber-500 animate-spin" />
            <span className="text-xs text-amber-500/80 font-medium">Syncing...</span>
          </div>
        </div>

        {/* Iframe с Зумом */}
        <iframe
          src={src}
          className="absolute top-0 left-0 border-0 bg-white"
          style={{
            width: `${100 / scale}%`,
            height: `${100 / scale}%`,
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
            pointerEvents: 'auto' // ВАЖНО: Разрешаем скролл и клики внутри
          }}
        />
      </div>
    </div>
  );
}