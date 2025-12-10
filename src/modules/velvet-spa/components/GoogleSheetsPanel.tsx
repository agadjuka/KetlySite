'use client';

import { GoogleSheetEmbed } from './GoogleSheetEmbed';
import { GoogleScriptWidget } from './GoogleScriptWidget';
import { velvetSpaConfig } from '../config';
import { useLanguage } from '@/context/LanguageContext';

export function GoogleSheetsPanel() {
  const { language } = useLanguage();
  // Для английской версии используем хардкод, для русской - переменную окружения
  const defaultSheetId = language === 'en' 
    ? '19foqfHL7k9znua1ll3PjYVlsiQ1xnMTdVo59MH2yUZI'
    : (process.env.NEXT_PUBLIC_VELVET_SPA_SHEET_ID || '');

  // Получаем виджеты в зависимости от языка
  const widgets = velvetSpaConfig.sheets.widgets[language] || velvetSpaConfig.sheets.widgets.ru;

  // Generate edit URLs for each sheet
  const getEditUrl = (gid: string, widgetSheetId?: string) => {
    const sheetId = widgetSheetId || defaultSheetId;
    return `https://docs.google.com/spreadsheets/d/${sheetId}/edit#gid=${gid}`;
  };

  return (
    // Container: Widgets with spacing, scroll inside this area
    <div id="tour-widgets-desktop" className="flex flex-col gap-6 overflow-y-auto h-full scrollbar-custom pr-3">
      {widgets.map((widget, index) => {
        // Первый виджет делаем квадратным (выше)
        const isFirstWidget = index === 0;
        const heightClass = isFirstWidget ? "h-[450px]" : "h-[220px]";
        
        // Определяем, является ли это первым виджетом типа script
        const isFirstScriptWidget = widget.type === 'script' && 
          widgets.slice(0, index).every(w => w.type !== 'script');
        
        if (widget.type === 'script' && 'scriptUrl' in widget) {
          return (
            <GoogleScriptWidget
              key={`script-${index}`}
              scriptUrl={widget.scriptUrl}
              scale={0.6}
              className={`${heightClass} shrink-0 w-full`}
              title={widget.title}
              isFirstScriptWidget={isFirstScriptWidget}
            />
          );
        } else if (widget.type === 'sheet' && 'gid' in widget) {
          // Используем sheetId из виджета, если он указан, иначе используем дефолтный
          const widgetSheetId = 'sheetId' in widget ? widget.sheetId : undefined;
          const actualSheetId = widgetSheetId || defaultSheetId;
          
          return (
            <GoogleSheetEmbed 
              key={widget.gid}
              sheetId={actualSheetId} 
              gid={widget.gid} 
              scale={0.7}
              className={`${heightClass} shrink-0 w-full`}
              href={getEditUrl(widget.gid, widgetSheetId)}
              title={widget.title}
              useCrmIcon={isFirstWidget}
            />
          );
        }
        return null;
      })}
      
      {/* Bottom padding for comfortable scrolling to the end */}
      <div className="h-4 shrink-0" />
    </div>
  );
}
