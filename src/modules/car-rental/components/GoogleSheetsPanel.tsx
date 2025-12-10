'use client';

import { GoogleSheetEmbed } from './GoogleSheetEmbed';
import { carRentalConfig } from '../config';

export function GoogleSheetsPanel() {
  // Прямой доступ к переменной окружения
  const sheetId = process.env.NEXT_PUBLIC_CAR_RENTAL_SHEET_ID || '';

  // Generate edit URLs for each sheet
  const getEditUrl = (gid: string) => 
    `https://docs.google.com/spreadsheets/d/${sheetId}/edit#gid=${gid}`;

  return (
    // Container: Widgets with spacing, scroll inside this area
    <div id="tour-widgets-desktop" className="flex flex-col gap-6 overflow-y-auto h-full scrollbar-custom pr-3">
      {carRentalConfig.sheets.widgets.map((widget) => (
        <GoogleSheetEmbed 
          key={widget.gid}
          sheetId={sheetId} 
          gid={widget.gid} 
          scale={0.7}
          className="h-[220px] shrink-0 w-full"
          href={getEditUrl(widget.gid)}
          title={widget.title}
        />
      ))}
      
      {/* Bottom padding for comfortable scrolling to the end */}
      <div className="h-4 shrink-0" />
    </div>
  );
}
