'use client';

import { LucideIcon } from 'lucide-react';
import { Capability } from '@/config/capabilities';

interface QuickActionButtonProps {
  capability: Capability;
  onClick: (payload: string) => void;
}

const colorClasses: Record<string, string> = {
  violet: 'group-hover:bg-violet-500/10 group-hover:text-violet-400/70',
  indigo: 'group-hover:bg-indigo-500/10 group-hover:text-indigo-400/70',
  purple: 'group-hover:bg-purple-500/10 group-hover:text-purple-400/70',
  sky: 'group-hover:bg-sky-500/10 group-hover:text-sky-400/70',
  cyan: 'group-hover:bg-cyan-500/10 group-hover:text-cyan-400/70',
  orange: 'group-hover:bg-orange-500/10 group-hover:text-orange-400/70',
  blue: 'group-hover:bg-blue-500/10 group-hover:text-blue-400/70',
  emerald: 'group-hover:bg-emerald-500/10 group-hover:text-emerald-400/70',
};

export function QuickActionButton({ capability, onClick }: QuickActionButtonProps) {
  const colorClass = colorClasses[capability.color || 'violet'] || colorClasses.violet;

  return (
    <button
      onClick={() => onClick(capability.payload)}
      className="w-full text-left p-2.5 rounded-lg border border-transparent hover:bg-white/5 hover:border-white/5 transition-all duration-300 ease-out group cursor-pointer hover:-translate-y-0.5"
    >
      <div className="flex items-start gap-2.5">
        <div className={`p-1.5 rounded-md bg-transparent text-zinc-600 ${colorClass} transition-all duration-300 ease-out shrink-0`}>
          <capability.icon className="w-3.5 h-3.5" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-medium text-zinc-400 group-hover:text-zinc-300 transition-colors duration-300">
            {capability.title}
          </h4>
          <p className="text-xs text-zinc-600 leading-relaxed mt-0.5">
            {capability.description}
          </p>
        </div>
      </div>
    </button>
  );
}

