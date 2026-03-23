'use client';

const INTEGRATIONS = [
  'Shopify Plus Native App',
  'Salesforce Commerce Cloud Ready',
  'Headless React/Next.js Components',
] as const;

const STATS = [
  { value: '+42%', label: 'Conversion Rate' },
  { value: '-18%', label: 'RMA Reduction' },
  { value: '35%', label: 'Production Savings' },
] as const;

export function VyonEcosystemSection() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-32 manifesto-reveal border-b border-white/5 pb-24" data-scroll-trigger>
      <div className="relative pr-8">
        <div className="absolute -left-6 -top-6 w-12 h-12 border-t border-l border-accent-gold/30" />
        <h2 className="text-3xl md:text-4xl font-serif-vyon text-alabaster mb-6">
          Flawless Ecosystem <i className="text-accent-gold/80">Integration</i>
        </h2>
        <p className="text-neutral-400 font-light leading-relaxed mb-8 text-lg max-w-md">
          The VYON engine is designed as a headless API, allowing it to exist invisibly within your
          current e-commerce stack. No heavy iframes, no brand dilution. Deployed natively via
          Shopify Plus or any headless React framework.
        </p>
        <ul className="space-y-4 border-l border-white/10 pl-6">
          {INTEGRATIONS.map((item) => (
            <li key={item} className="flex items-center gap-4 text-sm text-neutral-300 font-light group">
              <span className="material-symbols-outlined text-accent-gold text-lg group-hover:scale-110 transition-transform">
                check_circle
              </span>
              <span className="group-hover:text-white transition-colors">{item}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="relative">
        <div className="flex items-center gap-2 mb-6">
          <span className="w-2 h-2 bg-accent-gold rounded-full animate-pulse" />
          <h3 className="text-sm font-mono uppercase tracking-widest text-neutral-500">
            The Economics of Confidence
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10 border border-white/10 overflow-hidden rounded-sm">
          {STATS.map((item) => (
            <div
              key={item.label}
              className="bg-neutral-950 p-6 flex flex-col items-center text-center group hover:bg-neutral-900 transition-colors"
            >
              <span className="text-3xl md:text-4xl font-serif-vyon text-accent-gold mb-2 group-hover:scale-110 transition-transform block">
                {item.value}
              </span>
              <span className="text-[9px] uppercase tracking-widest text-neutral-400 font-mono">
                {item.label}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-6 flex justify-between text-[10px] text-neutral-600 font-mono">
          <span>* BASED ON Q3 2023 CLIENT DATA</span>
          <span>[ VERIFIED ANALYTICS ]</span>
        </div>
      </div>
    </section>
  );
}
