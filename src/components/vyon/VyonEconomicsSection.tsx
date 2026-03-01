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
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        <div className="text-center mb-16 lg:mb-24">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif-vyon text-alabaster mb-6">
            The Economics of <i className="text-accent-gold">Visual Trust.</i>
          </h2>
          <p className="text-neutral-400 font-light text-lg tracking-wide max-w-2xl mx-auto">
            Empowering your buyers to see themselves in your garments eliminates purchase anxiety and
            fundamentally shifts your unit economics.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-24 mb-16">
          {STATS.map((item) => (
            <div
              key={item.label}
              className="flex flex-col items-center text-center p-6 md:p-8 border-l border-white/5"
            >
              <span className="text-5xl md:text-6xl lg:text-7xl font-serif-vyon text-accent-gold mb-4 block">
                {item.value}
              </span>
              <h3 className="text-xs font-mono uppercase tracking-[0.3em] text-white mb-4">
                {item.label}
              </h3>
              <p className="text-xs text-neutral-500 font-light leading-relaxed max-w-[200px]">
                {item.description}
              </p>
            </div>
          ))}
        </div>
        <div className="text-center">
          <p className="text-[9px] font-mono text-neutral-600 uppercase tracking-widest italic">
            * PROJECTED PERFORMANCE METRICS BASED ON INDUSTRY BENCHMARKS FOR AI VIRTUAL TRY-ON
            ENGAGEMENT.
          </p>
        </div>
      </div>
    </section>
  );
}
