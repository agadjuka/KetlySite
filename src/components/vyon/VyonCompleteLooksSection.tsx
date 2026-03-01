'use client';

import { Fragment } from 'react';

const LOOKS = [
  { label: 'Blazer', price: '$1,200' },
  { label: 'Complete Look', price: '$3,450', highlight: true },
  { label: 'Trousers', price: '$850' },
] as const;

export function VyonCompleteLooksSection() {
  return (
    <section className="relative py-20 border-t border-b border-white/5 bg-neutral-900/20 mb-32 manifesto-reveal" data-scroll-trigger>
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif-vyon text-alabaster mb-4">
            Sell Complete Looks, <i className="text-accent-gold">Not Single Items.</i>
          </h2>
          <p className="text-neutral-400 font-light text-sm tracking-wide max-w-xl mx-auto">
            Increase AOV by visualizing how separate pieces unite into a coherent aesthetic.
          </p>
        </div>
        <div className="relative flex flex-col md:flex-row items-center justify-center gap-4 md:gap-12">
          {LOOKS.map((item, i) => (
            <Fragment key={item.label}>
              <div
                className={`group relative flex flex-col items-center ${item.highlight ? 'scale-110' : ''}`}
              >
                {item.highlight && (
                  <div className="absolute inset-0 bg-accent-gold/10 blur-xl rounded-full" />
                )}
                <div
                  className={`rounded-full border bg-neutral-800 overflow-hidden mb-4 z-10 relative flex items-center justify-center transition-colors duration-500 ${
                    item.highlight
                      ? 'w-32 h-32 border-accent-gold shadow-[0_0_20px_rgba(191,161,95,0.2)]'
                      : 'w-24 h-24 border-white/10 group-hover:border-accent-gold'
                  }`}
                >
                  <span className="material-symbols-outlined text-neutral-500 text-3xl">
                    checkroom
                  </span>
                </div>
                <span
                  className={`text-[10px] uppercase tracking-widest font-mono ${
                    item.highlight
                      ? 'text-alabaster bg-black/50 px-3 py-1 rounded-full border border-accent-gold/30'
                      : 'text-neutral-500'
                  }`}
                >
                  {item.label}
                </span>
                <span
                  className={`mt-1 ${item.highlight ? 'text-sm text-accent-gold font-bold' : 'text-xs text-accent-gold'}`}
                >
                  {item.price}
                </span>
              </div>
              {i < LOOKS.length - 1 && (
                <div className="hidden md:flex h-[1px] w-24 bg-accent-gold/30 relative self-center shrink-0">
                  <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 border-t border-r border-accent-gold" />
                </div>
              )}
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
