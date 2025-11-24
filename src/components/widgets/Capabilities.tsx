'use client';

import { MessageSquare, Database, FileSpreadsheet } from 'lucide-react';

const integrations = [
  { icon: MessageSquare, name: 'Telegram', status: 'Connected' },
  { icon: Database, name: 'CRM', status: 'Connected' },
  { icon: FileSpreadsheet, name: 'Sheets', status: 'Connected' },
];

export function Capabilities() {
  return (
    <div className="h-full flex flex-col p-6">
      <p className="text-xs font-bold tracking-widest uppercase text-zinc-500 mb-6">
        INTEGRATIONS
      </p>
      <div className="space-y-4">
        {integrations.map((integration, index) => {
          const Icon = integration.icon;
          return (
            <div key={index} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                <Icon className="w-5 h-5 text-zinc-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-white font-medium">{integration.name}</p>
                <p className="text-xs text-zinc-500">{integration.status}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

