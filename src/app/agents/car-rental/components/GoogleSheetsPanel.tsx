'use client';

import { GoogleSheetEmbed } from './GoogleSheetEmbed';

export function GoogleSheetsPanel() {
  const sheetId = process.env.NEXT_PUBLIC_CAR_RENTAL_SHEET_ID || '';

  // Формируем ссылки на полную версию для каждого листа
  const getEditUrl = (gid: string) => 
    `https://docs.google.com/spreadsheets/d/${sheetId}/edit#gid=${gid}`;

  return (
    <div className="flex flex-col gap-4 flex-1 min-h-0">
      {/* Лист 1: Автопарк (обычно gid=0) */}
      <GoogleSheetEmbed 
        sheetId={sheetId} 
        gid="0" 
        className="flex-1"
        scale={0.75}
        href={getEditUrl('0')}
        title="CarPark"
      />

      {/* Лист 2: Записи (gid=337777908) */}
      <GoogleSheetEmbed 
        sheetId={sheetId} 
        gid="337777908" 
        className="flex-1"
        scale={0.75}
        href={getEditUrl('337777908')}
        title="Bookings"
      />

      {/* Лист 3: Календарь (gid=667953082) */}
      <GoogleSheetEmbed 
        sheetId={sheetId} 
        gid="667953082" 
        className="flex-1"
        scale={0.75}
        href={getEditUrl('667953082')}
        title="Availability"
      />
    </div>
  );
}

