'use client';

import { useState, useEffect } from 'react';
import { Loader2, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import googleSheetsIcon from './google-sheets.png';

interface GoogleSheetEmbedProps {
  sheetId: string;
  gid?: string;
  className?: string;
  scale?: number;
  href?: string;
  title: string; // Название листа для отображения на вкладке
}

export function GoogleSheetEmbed({ 
  sheetId, 
  gid, 
  className,
  scale = 0.65,
  href,
  title
}: GoogleSheetEmbedProps) {
  const [refreshKey, setRefreshKey] = useState(0);
  const [isSyncing, setIsSyncing] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);

  // SMART REFRESH (Обновление по событию от агента)
  useEffect(() => {
    const handleRefresh = () => {
      setIsSyncing(true); // Показываем лоадер
      setIframeLoaded(false); // Сбрасываем состояние загрузки iframe
      setRefreshKey(prev => prev + 1); // Обновляем iframe
      
      // Скрываем лоадер через 2 секунды (даем время прогрузиться)
      setTimeout(() => setIsSyncing(false), 2000);
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
      "flex flex-col rounded-md overflow-hidden border border-gray-300 bg-white shadow-sm",
      className
    )}>
      
      {/* HEADER (Верхняя панель - Декоративная) */}
      <div className="h-8 bg-white border-b border-gray-300 flex items-center justify-between px-3">
        <div className="flex items-center gap-2">
          <img 
            src={googleSheetsIcon.src} 
            alt="Google Sheets" 
            className="w-4 h-4 object-contain"
          />
          <span className="text-xs text-gray-500">Google Sheets</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-gray-700 px-2 py-0.5 bg-gray-100 rounded">
            {title}
          </span>
          <a
            href={editHref}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1 hover:bg-gray-100 rounded transition-colors"
            title="Open in Google Sheets"
          >
            <ExternalLink className="w-4 h-4 text-gray-600 hover:text-[#0f9d58] transition-colors" />
          </a>
        </div>
      </div>

      {/* IFRAME CONTAINER (Центральная часть) */}
      <div className="flex-1 relative bg-white w-full overflow-hidden">
        {/* Оверлей загрузки (светлый стиль) */}
        <div 
          className={cn(
            "absolute inset-0 z-20 bg-white/90 backdrop-blur-sm flex items-center justify-center transition-opacity duration-500",
            isSyncing ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          )}
        >
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="w-6 h-6 text-[#0f9d58] animate-spin" />
            <span className="text-xs text-[#0f9d58] font-medium">Syncing...</span>
          </div>
        </div>

        {/* Skeleton Loader (темная заглушка) */}
        <div 
          className={cn(
            "absolute inset-0 z-10 bg-zinc-900/50 flex items-center justify-center transition-opacity duration-500",
            iframeLoaded ? "opacity-0 pointer-events-none" : "opacity-100 pointer-events-auto"
          )}
        >
          <div className="flex flex-col items-center gap-2 animate-pulse">
            <Loader2 className="w-6 h-6 text-zinc-400 animate-spin" />
          </div>
        </div>

        {/* Iframe с Зумом */}
        <iframe
          src={src}
          onLoad={() => {
            setIframeLoaded(true);
          }}
          className={cn(
            "absolute top-0 left-0 border-0 bg-white transition-opacity duration-500",
            iframeLoaded ? "opacity-100" : "opacity-0"
          )}
          style={{
            width: `${100 / scale}%`,
            height: `${100 / scale}%`,
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
            pointerEvents: 'auto'
          }}
        />
      </div>
    </div>
  );
}




