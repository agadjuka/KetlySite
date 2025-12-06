'use client';

import { useState, useEffect, useMemo } from 'react';
import { ExternalLink } from 'lucide-react';
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
  const targetGid = gid || '0';
  const baseUrl = useMemo(
    () => `https://docs.google.com/spreadsheets/d/${sheetId}/htmlembed?gid=${targetGid}&single=true&widget=false&headers=false&chrome=false`,
    [sheetId, targetGid]
  );

  // Состояния для двойного буфера
  const [activeBuffer, setActiveBuffer] = useState<'A' | 'B'>('A');
  const [urlA, setUrlA] = useState(() => `${baseUrl}&t=${Date.now()}`);
  const [urlB, setUrlB] = useState(() => `${baseUrl}&t=${Date.now()}`);
  const [isLoading, setIsLoading] = useState(false);

  // SMART REFRESH (Обновление по событию от агента)
  useEffect(() => {
    const handleRefresh = () => {
      // Генерируем новую ссылку с timestamp
      const newUrl = `${baseUrl}&t=${Date.now()}`;
      
      // Определяем скрытый буфер
      const hiddenBuffer = activeBuffer === 'A' ? 'B' : 'A';
      
      // Устанавливаем новую ссылку для скрытого буфера
      if (hiddenBuffer === 'A') {
        setUrlA(newUrl);
      } else {
        setUrlB(newUrl);
      }
      
      setIsLoading(true);
    };

    window.addEventListener('google-sheet-refresh', handleRefresh);
    return () => window.removeEventListener('google-sheet-refresh', handleRefresh);
  }, [activeBuffer, baseUrl]);

  // Обработчик загрузки iframe
  const handleFrameLoad = (bufferName: 'A' | 'B') => {
    // Если загрузился скрытый буфер (тот, который мы обновляли) и идет процесс загрузки
    if (bufferName !== activeBuffer && isLoading) {
      // Переключаем активный буфер
      setActiveBuffer(bufferName);
      setIsLoading(false);
    }
  };

  if (!sheetId) return null;

  const editHref = href || `https://docs.google.com/spreadsheets/d/${sheetId}/edit#gid=${targetGid}`;

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
        {/* Iframe слой A */}
        <iframe
          src={urlA}
          onLoad={() => handleFrameLoad('A')}
          className={cn(
            "absolute inset-0 border-0 bg-white",
            activeBuffer === 'A' ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
          )}
          style={{
            width: `${100 / scale}%`,
            height: `${100 / scale}%`,
            transform: `scale(${scale})`,
            transformOrigin: 'top left'
          }}
        />

        {/* Iframe слой B */}
        <iframe
          src={urlB}
          onLoad={() => handleFrameLoad('B')}
          className={cn(
            "absolute inset-0 border-0 bg-white",
            activeBuffer === 'B' ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
          )}
          style={{
            width: `${100 / scale}%`,
            height: `${100 / scale}%`,
            transform: `scale(${scale})`,
            transformOrigin: 'top left'
          }}
        />
      </div>
    </div>
  );
}






