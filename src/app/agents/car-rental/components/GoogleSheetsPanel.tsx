'use client';

import { GoogleSheetEmbed } from './GoogleSheetEmbed';

export function GoogleSheetsPanel() {
  const sheetId = process.env.NEXT_PUBLIC_CAR_RENTAL_SHEET_ID || '';

  // Формируем ссылки на полную версию для каждого листа
  const getEditUrl = (gid: string) => 
    `https://docs.google.com/spreadsheets/d/${sheetId}/edit#gid=${gid}`;

  return (
    // Контейнер: Вертикальный скролл, отступы, скрытый скроллбар для красоты
    <div className="flex flex-col gap-6 overflow-y-auto h-full pr-2 scrollbar-hide">
      
      {/* Виджет 1: Автопарк */}
      <GoogleSheetEmbed 
        sheetId={sheetId} 
        gid="0" 
        scale={0.7} // Масштаб, чтобы влезло больше колонок
        className="h-[320px] shrink-0" // Жесткая высота, запрет на сжатие
        href={getEditUrl('0')}
        title="CarPark"
      />

      {/* Виджет 2: Записи */}
      <GoogleSheetEmbed 
        sheetId={sheetId} 
        gid="337777908" 
        scale={0.7}
        className="h-[320px] shrink-0"
        href={getEditUrl('337777908')}
        title="Bookings"
      />

      {/* Виджет 3: Календарь */}
      <GoogleSheetEmbed 
        sheetId={sheetId} 
        gid="667953082" 
        scale={0.7}
        className="h-[320px] shrink-0"
        href={getEditUrl('667953082')}
        title="Availability"
      />
      
      {/* Нижний отступ, чтобы было удобно скроллить до конца */}
      <div className="h-4 shrink-0" />
    </div>
  );
}

