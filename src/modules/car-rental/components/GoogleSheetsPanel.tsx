'use client';

import { GoogleSheetEmbed } from './GoogleSheetEmbed';

export function GoogleSheetsPanel() {
  const sheetId = process.env.NEXT_PUBLIC_CAR_RENTAL_SHEET_ID || '';

  // Generate edit URLs for each sheet
  const getEditUrl = (gid: string) => 
    `https://docs.google.com/spreadsheets/d/${sheetId}/edit#gid=${gid}`;

  return (
    // Container: Widgets with spacing, scroll inside this area
    <div id="tour-widgets-desktop" className="flex flex-col gap-6 overflow-y-auto h-full scrollbar-custom pr-3">
      
      {/* Виджет 1: Availability */}
      <GoogleSheetEmbed 
        sheetId={sheetId} 
        gid="667953082" 
        scale={0.7}
        className="h-[220px] shrink-0 w-full"
        href={getEditUrl('667953082')}
        title="Availability"
      />

      {/* Виджет 2: Bookings */}
      <GoogleSheetEmbed 
        sheetId={sheetId} 
        gid="337777908" 
        scale={0.7}
        className="h-[220px] shrink-0 w-full"
        href={getEditUrl('337777908')}
        title="Bookings"
      />

      {/* Виджет 3: Car Park */}
      <GoogleSheetEmbed 
        sheetId={sheetId} 
        gid="0" 
        scale={0.7} // Scale to fit more columns
        className="h-[220px] shrink-0 w-full" // Fixed height, no shrink, full width
        href={getEditUrl('0')}
        title="CarPark"
      />
      
      {/* Bottom padding for comfortable scrolling to the end */}
      <div className="h-4 shrink-0" />
    </div>
  );
}
