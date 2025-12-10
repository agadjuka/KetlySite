'use client';

import { useState, useEffect, useMemo } from 'react';
import { ExternalLink, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';
import googleSheetsIcon from './google-sheets.png';

interface GoogleSheetEmbedProps {
  sheetId: string;
  gid?: string;
  className?: string;
  scale?: number;
  href?: string;
  title: string; // Sheet name for tab display
  useCrmIcon?: boolean; // Использовать иконку CRM вместо Google Sheets
}

export function GoogleSheetEmbed({ 
  sheetId, 
  gid, 
  className,
  scale = 0.65,
  href,
  title,
  useCrmIcon = false
}: GoogleSheetEmbedProps) {
  const targetGid = gid || '0';
  const baseUrl = useMemo(
    () => `https://docs.google.com/spreadsheets/d/${sheetId}/htmlembed?gid=${targetGid}&single=true&widget=false&headers=false&chrome=false`,
    [sheetId, targetGid]
  );

  // Double buffer states
  const [activeBuffer, setActiveBuffer] = useState<'A' | 'B'>('A');
  const [urlA, setUrlA] = useState(baseUrl);
  const [urlB, setUrlB] = useState(baseUrl);
  const [isLoading, setIsLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Initialize URL only on client to avoid hydration mismatch
  useEffect(() => {
    setIsMounted(true);
    const initialTimestamp = Date.now();
    setUrlA(`${baseUrl}&t=${initialTimestamp}`);
    setUrlB(`${baseUrl}&t=${initialTimestamp}`);
  }, [baseUrl]);

  // SMART REFRESH (Update on agent event)
  useEffect(() => {
    const handleRefresh = () => {
      // Generate new URL with timestamp
      const newUrl = `${baseUrl}&t=${Date.now()}`;
      
      // Determine hidden buffer
      const hiddenBuffer = activeBuffer === 'A' ? 'B' : 'A';
      
      // Set new URL for hidden buffer
      if (hiddenBuffer === 'A') {
        setUrlA(newUrl);
      } else {
        setUrlB(newUrl);
      }
      
      setIsLoading(true);
    };

    window.addEventListener('google-sheet-refresh', handleRefresh);
    return () => window.removeEventListener('google-sheet-refresh', handleRefresh);
  }, [activeBuffer, baseUrl]);

  // Iframe load handler
  const handleFrameLoad = (bufferName: 'A' | 'B') => {
    // If hidden buffer loaded (the one we updated) and loading is in progress
    if (bufferName !== activeBuffer && isLoading) {
      // Switch active buffer
      setActiveBuffer(bufferName);
      setIsLoading(false);
    }
  };

  if (!sheetId) return null;

  const editHref = href || `https://docs.google.com/spreadsheets/d/${sheetId}/edit#gid=${targetGid}`;

  // Don't render iframe until mounted on client
  if (!isMounted) {
    return (
      <div className={cn(
        "flex flex-col rounded-md overflow-hidden border border-gray-300 bg-white shadow-sm",
        className
      )}>
        <div className="h-8 bg-white border-b border-gray-300 flex items-center justify-between px-3">
          <div className="flex items-center gap-2">
            {useCrmIcon ? (
              <Calendar className="w-4 h-4 text-gray-600" />
            ) : (
              <img 
                src={googleSheetsIcon.src} 
                alt="Google Sheets" 
                className="w-4 h-4 object-contain"
              />
            )}
            <span className="text-xs text-gray-500">{useCrmIcon ? 'CRM' : 'Google Sheets'}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-gray-700 px-2 py-0.5 bg-gray-100 rounded">
              {title}
            </span>
            <a
              href={editHref}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1 hover:bg-gray-100 rounded transition-colors"
              title="Open in Google Sheets"
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
      
      {/* HEADER (Top panel - Decorative) */}
      <div className="h-8 bg-white border-b border-gray-300 flex items-center justify-between px-3">
        <div className="flex items-center gap-2">
          {useCrmIcon ? (
            <Calendar className="w-4 h-4 text-gray-600" />
          ) : (
            <img 
              src={googleSheetsIcon.src} 
              alt="Google Sheets" 
              className="w-4 h-4 object-contain"
            />
          )}
          <span className="text-xs text-gray-500">{useCrmIcon ? 'CRM' : 'Google Sheets'}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-gray-700 px-2 py-0.5 bg-gray-100 rounded">
            {title}
          </span>
          <a
            href={editHref}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1 hover:bg-gray-100 rounded transition-colors"
            title="Open in Google Sheets"
          >
            <ExternalLink className="w-4 h-4 text-gray-600 hover:text-[#0f9d58] transition-colors" />
          </a>
        </div>
      </div>

      {/* IFRAME CONTAINER (Center section) */}
      <div className="flex-1 relative bg-white w-full overflow-auto touch-pan-y">
        {/* Iframe layer A */}
        <iframe
          src={urlA}
          onLoad={() => handleFrameLoad('A')}
          className={cn(
            "absolute inset-0 border-0 bg-white w-full h-full",
            activeBuffer === 'A' ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
          )}
          style={{
            width: `${100 / scale}%`,
            height: `${100 / scale}%`,
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
            pointerEvents: activeBuffer === 'A' ? 'auto' : 'none'
          }}
        />

        {/* Iframe layer B */}
        <iframe
          src={urlB}
          onLoad={() => handleFrameLoad('B')}
          className={cn(
            "absolute inset-0 border-0 bg-white w-full h-full",
            activeBuffer === 'B' ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
          )}
          style={{
            width: `${100 / scale}%`,
            height: `${100 / scale}%`,
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
            pointerEvents: activeBuffer === 'B' ? 'auto' : 'none'
          }}
        />
      </div>
    </div>
  );
}






