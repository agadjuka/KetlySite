'use client';

import { useState, useEffect } from 'react';

interface GoogleSheetEmbedProps {
  sheetId: string;   // ID самой таблицы
  gid?: string;      // ID конкретного листа (вкладки). Опционально.
  className?: string;
  scale?: number;    // Масштаб виджета (по умолчанию 1)
  refreshInterval?: number; // Интервал обновления в миллисекундах (по умолчанию 3000)
  href?: string;     // Ссылка для открытия полной версии при клике
}

export function GoogleSheetEmbed({ 
  sheetId, 
  gid, 
  className,
  scale = 1,
  refreshInterval = 3000,
  href
}: GoogleSheetEmbedProps) {
  const [timestamp, setTimestamp] = useState(Date.now());

  // Авто-обновление через заданный интервал
  useEffect(() => {
    if (refreshInterval <= 0) return;

    const interval = setInterval(() => {
      setTimestamp(Date.now());
    }, refreshInterval);

    return () => clearInterval(interval);
  }, [refreshInterval]);

  if (!sheetId) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-black/20 rounded-lg border border-white/5">
        <p className="text-white/40 text-sm">Google Таблица не настроена</p>
      </div>
    );
  }

  const targetGid = gid || '0'; 

  // Используем htmlembed + single=true, чтобы показать ТОЛЬКО этот лист
  // Добавляем timestamp для избежания кэширования
  const src = `https://docs.google.com/spreadsheets/d/${sheetId}/htmlembed?gid=${targetGid}&single=true&widget=false&headers=false&chrome=false&t=${timestamp}`;

  // Формируем href для открытия полной версии, если не передан явно
  const editHref = href || `https://docs.google.com/spreadsheets/d/${sheetId}/edit#gid=${targetGid}`;

  // Стили для трансформации зума
  const iframeStyle = {
    transform: `scale(${scale})`,
    width: `calc(100% / ${scale})`,
    height: `calc(100% / ${scale})`,
    transformOrigin: 'top left' as const,
  };

  return (
    <a
      href={editHref}
      target="_blank"
      rel="noopener noreferrer"
      className={`block overflow-hidden rounded-lg border border-white/10 bg-white relative group cursor-pointer transition-all duration-300 hover:border-amber-500/50 hover:shadow-lg hover:shadow-amber-500/10 hover:-translate-y-1 ${className || 'flex-1'}`}
    >
      <iframe
        src={src}
        width="100%"
        height="100%"
        frameBorder="0"
        className="bg-white pointer-events-none"
        style={iframeStyle}
      />
    </a>
  );
}

