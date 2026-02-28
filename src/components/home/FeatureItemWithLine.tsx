import type { ReactNode } from 'react';

interface FeatureItemWithLineProps {
  title: string;
  description: string;
  icon: string;
  children?: ReactNode;
  variant?: 'default' | 'compact';
  /** Вариант: compact (top-1, line h-12) или default (top-4, line h-20) */
  variant?: 'default' | 'compact';
}

export function FeatureItemWithLine({
  title,
  description,
  icon,
  children,
  variant = 'default',
}: FeatureItemWithLineProps) {
  const dotTop = variant === 'compact' ? 'top-1' : 'top-4';
  const lineHover = variant === 'compact' ? 'group-hover:h-12' : 'group-hover:h-20';
  const lineBottom = variant === 'compact' ? '-bottom-12' : '-bottom-20';

  return (
    <div className="group relative">
      <div className={`absolute -left-[37px] ${dotTop} size-4 flex items-center justify-center`}>
        <div className="w-2 h-2 rounded-full bg-neutral-800 border border-neutral-600 group-hover:bg-amber-500 group-hover:border-amber-400 transition-all duration-500 shadow-[0_0_0_0_rgba(217,119,6,0)] group-hover:shadow-[0_0_15px_1px_rgba(217,119,6,0.4)]" />
        <div className={`absolute w-[1px] h-0 bg-amber-500/50 ${lineBottom} left-1/2 -translate-x-1/2 ${lineHover} transition-all duration-700 delay-100`} />
      </div>
      <div className="flex flex-col md:flex-row gap-8 items-start pl-4">
        <div className="flex-1">
          <h3 className="text-2xl font-display font-light mb-3 group-hover:text-amber-100 transition-colors flex items-center gap-3">
            {title}
            <span className="material-symbols-outlined text-amber-500 text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {icon}
            </span>
          </h3>
          <p className="text-neutral-500 font-light text-base leading-relaxed max-w-lg group-hover:text-neutral-400 transition-colors">
            {description}
          </p>
          {children}
        </div>
      </div>
    </div>
  );
}
