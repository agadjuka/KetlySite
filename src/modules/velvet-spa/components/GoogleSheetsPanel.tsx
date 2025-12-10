'use client';

import { GoogleSheetEmbed } from './GoogleSheetEmbed';
import { velvetSpaConfig } from '../config';

export function GoogleSheetsPanel() {
  const sheetId = process.env[velvetSpaConfig.env.sheetId] || '';

  // Generate edit URLs for each sheet
  const getEditUrl = (gid: string) => 
    `https://docs.google.com/spreadsheets/d/${sheetId}/edit#gid=${gid}`;

  return (
    // Container: Widgets with spacing, scroll inside this area
    <div id="tour-widgets-desktop" className="flex flex-col gap-6 overflow-y-auto h-full scrollbar-custom pr-3">
      {velvetSpaConfig.sheets.widgets.map((widget) => (
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
