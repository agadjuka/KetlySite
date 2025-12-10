'use client';

import { useState, useEffect, useMemo } from 'react';
import { ExternalLink, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

interface GoogleScriptWidgetProps {
  scriptUrl: string;
  className?: string;
  title: string;
  scale?: number;
  isFirstScriptWidget?: boolean; // Флаг для определения первого виджета CRM
}

export function GoogleScriptWidget({ 
  scriptUrl, 
  className,
  title,
  scale = 1,
  isFirstScriptWidget = false
}: GoogleScriptWidgetProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [targetDate, setTargetDate] = useState<string | null>(null);

  // Initialize only on client to avoid hydration mismatch
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Слушаем событие для открытия виджета с указанной датой (только для первого виджета CRM)
  useEffect(() => {
    if (!isFirstScriptWidget) return;

    const handleOpenDate = (event: Event) => {
      const customEvent = event as CustomEvent<{ date: string }>;
      if (customEvent.detail && customEvent.detail.date) {
        setTargetDate(customEvent.detail.date);
        setIsLoading(true);
      }
    };

    // Сбрасываем targetDate при обычном обновлении (DATA_UPDATED без даты)
    const handleRefresh = () => {
      setTargetDate((currentDate) => {
        if (currentDate) {
          setIsLoading(true);
          return null;
        }
        return currentDate;
      });
    };

    window.addEventListener('google-script-widget-open-date', handleOpenDate as EventListener);
    window.addEventListener('google-sheet-refresh', handleRefresh);
    return () => {
      window.removeEventListener('google-script-widget-open-date', handleOpenDate as EventListener);
      window.removeEventListener('google-sheet-refresh', handleRefresh);
    };
  }, [isFirstScriptWidget]);

  // Generate URL with date parameter (current date or target date from event)
  const urlWithDate = useMemo(() => {
    if (!isMounted) return scriptUrl;
    
    const dateToUse = targetDate || new Date().toISOString().split('T')[0];
    
    try {
      const url = new URL(scriptUrl);
      // Заменяем date, если он уже есть, или добавляем новый
      url.searchParams.set('date', dateToUse);
      return url.toString();
    } catch (e) {
      // Если не удалось создать URL объект, обрабатываем строку вручную
      // Проверяем, есть ли уже параметр date
      if (scriptUrl.includes('date=')) {
        // Заменяем существующий параметр date
        return scriptUrl.replace(/date=[^&]*/, `date=${dateToUse}`);
      }
      // Добавляем новый параметр date
      const separator = scriptUrl.includes('?') ? '&' : '?';
      return `${scriptUrl}${separator}date=${dateToUse}`;
    }
  }, [scriptUrl, isMounted, targetDate]);

  const handleLoad = () => {
    setIsLoading(false);
    setError(null);
    // Не сбрасываем targetDate здесь, чтобы виджет оставался на указанной дате
    // Дата будет сброшена только при следующем событии обновления без даты
  };

  const handleError = () => {
    setIsLoading(false);
    setError('Не удалось загрузить виджет');
  };

  if (!isMounted) {
    return (
      <div className={cn(
        "flex flex-col rounded-md overflow-hidden border border-gray-300 bg-white shadow-sm",
        className
      )}>
        <div className="h-8 bg-white border-b border-gray-300 flex items-center justify-between px-3">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-600" />
            <span className="text-xs text-gray-500">CRM</span>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={scriptUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1 hover:bg-gray-100 rounded transition-colors"
              title="Open script"
            >
              <ExternalLink className="w-4 h-4 text-gray-600 hover:text-[#0f9d58] transition-colors" />
            </a>
          </div>
        </div>
        <div className="flex-1 relative bg-white w-full overflow-hidden" style={{ minHeight: '200px' }} />
      </div>
    );
  }

  return (
    <div className={cn(
      "flex flex-col rounded-md overflow-hidden border border-gray-300 bg-white shadow-sm",
      className
    )}>
      
      {/* HEADER */}
      <div className="h-8 bg-white border-b border-gray-300 flex items-center justify-between px-3">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-gray-600" />
          <span className="text-xs text-gray-500">CRM</span>
        </div>
        <div className="flex items-center gap-2">
          <a
            href={scriptUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1 hover:bg-gray-100 rounded transition-colors"
            title="Open script"
          >
            <ExternalLink className="w-4 h-4 text-gray-600 hover:text-[#0f9d58] transition-colors" />
          </a>
        </div>
      </div>

      {/* IFRAME CONTAINER */}
      <div className="flex-1 relative bg-white w-full overflow-auto touch-pan-y">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50 z-10">
            <div className="text-sm text-gray-500">Загрузка...</div>
          </div>
        )}
        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50 z-10">
            <div className="text-sm text-red-500">{error}</div>
          </div>
        )}
        <iframe
          src={urlWithDate}
          onLoad={handleLoad}
          onError={handleError}
          className={cn(
            "absolute inset-0 border-0 bg-white w-full h-full",
            isLoading || error ? "opacity-0" : "opacity-100"
          )}
          style={{
            width: `${100 / scale}%`,
            height: `${100 / scale}%`,
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
            minHeight: '200px',
            pointerEvents: 'auto'
          }}
        />
      </div>
    </div>
  );
}

