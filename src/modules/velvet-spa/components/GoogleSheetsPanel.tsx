'use client';

import { GoogleSheetEmbed } from './GoogleSheetEmbed';
import { GoogleScriptWidget } from './GoogleScriptWidget';
import { velvetSpaConfig } from '../config';
import { useLanguage } from '@/context/LanguageContext';

export function GoogleSheetsPanel() {
  const { language } = useLanguage();
  // Прямой доступ к переменной окружения
  const sheetId = process.env.NEXT_PUBLIC_VELVET_SPA_SHEET_ID || '';

  // Получаем виджеты в зависимости от языка
  const widgets = velvetSpaConfig.sheets.widgets[language] || velvetSpaConfig.sheets.widgets.ru;

  // Generate edit URLs for each sheet
  const getEditUrl = (gid: string) => 
    `https://docs.google.com/spreadsheets/d/${sheetId}/edit#gid=${gid}`;

  return (
    // Container: Widgets with spacing, scroll inside this area
    <div id="tour-widgets-desktop" className="flex flex-col gap-6 overflow-y-auto h-full scrollbar-custom pr-3">
      {widgets.map((widget, index) => {
        if (widget.type === 'script' && 'scriptUrl' in widget) {
          return (
            <GoogleScriptWidget
              key={`script-${index}`}
              scriptUrl={widget.scriptUrl}
              scale={0.5}
              className="h-[220px] shrink-0 w-full"
              title={widget.title}
            />
          );
        } else if (widget.type === 'sheet' && 'gid' in widget) {
          return (
            <GoogleSheetEmbed 
              key={widget.gid}
              sheetId={sheetId} 
              gid={widget.gid} 
              scale={0.7}
              className="h-[220px] shrink-0 w-full"
              href={getEditUrl(widget.gid)}
              title={widget.title}
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
