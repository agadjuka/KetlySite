'use client';

import { useState, useEffect, useMemo } from 'react';
import { ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import googleSheetsIcon from './google-sheets.png';

interface GoogleScriptWidgetProps {
  scriptUrl: string;
  className?: string;
  title: string;
  scale?: number;
}

export function GoogleScriptWidget({ 
  scriptUrl, 
  className,
  title,
  scale = 1
}: GoogleScriptWidgetProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize only on client to avoid hydration mismatch
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Generate URL with current date parameter
  const urlWithDate = useMemo(() => {
    if (!isMounted) return scriptUrl;
    try {
      const url = new URL(scriptUrl);
      const today = new Date().toISOString().split('T')[0];
      // Заменяем date, если он уже есть, или добавляем новый
      url.searchParams.set('date', today);
      return url.toString();
    } catch (e) {
      // Если не удалось создать URL объект, обрабатываем строку вручную
      const today = new Date().toISOString().split('T')[0];
      // Проверяем, есть ли уже параметр date
      if (scriptUrl.includes('date=')) {
        // Заменяем существующий параметр date
        return scriptUrl.replace(/date=[^&]*/, `date=${today}`);
      }
      // Добавляем новый параметр date
      const separator = scriptUrl.includes('?') ? '&' : '?';
      return `${scriptUrl}${separator}date=${today}`;
    }
  }, [scriptUrl, isMounted]);

  const handleLoad = () => {
    setIsLoading(false);
    setError(null);
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
            <img 
              src={googleSheetsIcon.src} 
              alt="Google Sheets" 
              className="w-4 h-4 object-contain"
            />
            <span className="text-xs text-gray-500">Google Apps Script</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-gray-700 px-2 py-0.5 bg-gray-100 rounded">
              {title}
            </span>
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
          <img 
            src={googleSheetsIcon.src} 
            alt="Google Sheets" 
            className="w-4 h-4 object-contain"
          />
          <span className="text-xs text-gray-500">Google Apps Script</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-gray-700 px-2 py-0.5 bg-gray-100 rounded">
            {title}
          </span>
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
      <div className="flex-1 relative bg-white w-full overflow-hidden">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
            <div className="text-sm text-gray-500">Загрузка...</div>
          </div>
        )}
        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
            <div className="text-sm text-red-500">{error}</div>
          </div>
        )}
        <iframe
          src={urlWithDate}
          onLoad={handleLoad}
          onError={handleError}
          className={cn(
            "absolute inset-0 border-0 bg-white",
            isLoading || error ? "opacity-0" : "opacity-100"
          )}
          style={{
            width: `${100 / scale}%`,
            height: `${100 / scale}%`,
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
            minHeight: '200px'
          }}
        />
      </div>
    </div>
  );
}

