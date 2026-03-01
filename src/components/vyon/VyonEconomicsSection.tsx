'use client';

const STATS = [
  {
    value: '+25%',
    label: 'CONVERSION UPLIFT',
    description: 'For users who engage with the neural try-on widget.',
  },
  {
    value: '-15%',
    label: 'ESTIMATED RMA REDUCTION',
    description: 'Buyers know the exact fit and look before the transaction.',
  },
  {
    value: '1.5x',
    label: 'HIGHER CART VALUE',
    description: 'Driven by autonomous full-outfit recommendations.',
  },
] as const;

export function VyonEconomicsSection() {
  return (
    <section
      className="relative py-24 lg:py-32 border-t border-white/5 manifesto-reveal"
      data-scroll-trigger
    >
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 md:px-12">
        <div className="text-center mb-16 lg:mb-24">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif-vyon text-alabaster mb-6">
            The Economics of <i className="text-accent-gold">Visual Trust.</i>
          </h2>
          <p className="text-neutral-400 font-light text-lg tracking-wide max-w-2xl mx-auto">
            Empowering your buyers to see themselves in your garments eliminates purchase anxiety and
            fundamentally shifts your unit economics.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-8 mb-8">
          {STATS.map((item) => (
            <div
              key={item.label}
              className="p-4 lg:p-8 min-h-0 border border-white/10 bg-neutral-900/70 backdrop-blur-sm rounded-sm transition-all duration-300 ease-out hover:border-accent-gold/30 hover:bg-neutral-900/95 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/30 group flex flex-col"
            >
              <span className="text-4xl lg:text-5xl xl:text-6xl font-serif-vyon text-accent-gold mb-3 lg:mb-4 block group-hover:scale-105 transition-transform duration-300">
                {item.value}
              </span>
              <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-white mb-2 lg:mb-3 shrink-0">
                {item.label}
              </h3>
              <p className="text-neutral-500 text-xs lg:text-sm font-light leading-relaxed flex-1 min-h-0">
                {item.description}
              </p>
            </div>
          ))}
        </div>
        <div className="text-center">
          <p className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest italic">
            * PROJECTED PERFORMANCE METRICS BASED ON INDUSTRY BENCHMARKS FOR AI VIRTUAL TRY-ON
            ENGAGEMENT.
          </p>
        </div>
      </div>
    </section>
  );
}
