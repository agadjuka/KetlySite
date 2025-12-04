'use client';

interface GoogleSheetEmbedProps {
  sheetId: string;   // ID самой таблицы
  gid?: string;      // ID конкретного листа (вкладки). Опционально.
  className?: string;
}

export function GoogleSheetEmbed({ sheetId, gid, className }: GoogleSheetEmbedProps) {
  if (!sheetId) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-black/20 rounded-lg border border-white/5">
        <p className="text-white/40 text-sm">Google Таблица не настроена</p>
      </div>
    );
  }

  const targetGid = gid || '0'; 

  // Используем htmlembed + single=true, чтобы показать ТОЛЬКО этот лист
  const src = `https://docs.google.com/spreadsheets/d/${sheetId}/htmlembed?gid=${targetGid}&single=true&widget=false&headers=false&chrome=false`;

  return (
    <div className={`w-full min-h-0 bg-white rounded-lg overflow-hidden border border-white/10 ${className || 'flex-1'}`}>
      <iframe
        src={src}
        width="100%"
        height="100%"
        frameBorder="0"
        className="bg-white"
        style={{ minHeight: 0 }}
      />
    </div>
  );
}

