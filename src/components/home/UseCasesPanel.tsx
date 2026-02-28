const USE_CASES = [
  {
    category: 'Legal & Compliance',
    description:
      'We need an AI engine to extract, structure, and analyze clauses from multi-page PDF contracts in seconds.',
    icon: 'gavel',
  },
  {
    category: 'Luxury Real Estate',
    description:
      'We need a WhatsApp AI broker to qualify high-net-worth leads and schedule property viewings 24/7.',
    icon: 'apartment',
  },
  {
    category: 'Wealth Management',
    description:
      'We need an AI analyst to instantly parse complex financial reports and generate personalized portfolio summaries for our VIP clients.',
    icon: 'finance',
  },
  {
    category: 'Logistics & Wholesale',
    description:
      'We need an automated AI dispatcher to process unstructured email requests and instantly calculate freight quotes.',
    icon: 'local_shipping',
  },
] as const;

export function UseCasesPanel() {
  return (
    <div className="relative bg-neutral-900/30 border border-neutral-800/60 rounded-2xl overflow-hidden backdrop-blur-sm p-8 min-h-[600px] flex flex-col">
      <div className="absolute top-0 right-0 p-6 flex gap-2">
        <div className="w-2 h-2 bg-amber-500/20 rounded-full" />
        <div className="w-2 h-2 bg-amber-500/20 rounded-full" />
        <div className="w-2 h-2 bg-amber-500/40 rounded-full animate-pulse" />
      </div>
      <div className="mb-10">
        <h3 className="text-sm font-mono uppercase tracking-[0.2em] text-neutral-500 mb-2">
          Use Cases
        </h3>
        <div className="h-[1px] w-full bg-gradient-to-r from-amber-500/50 via-neutral-800 to-transparent" />
      </div>
      <div className="flex-1 overflow-y-auto bespoke-scroll pr-2 space-y-6">
        {USE_CASES.map((item, i) => (
          <div
            key={item.category}
            className="group relative bg-white/5 hover:bg-white/10 border border-white/5 hover:border-amber-500/30 p-6 rounded-lg transition-all duration-500"
            style={{ transitionDelay: `${i * 75}ms` }}
          >
            <div className="flex gap-4">
              <div className="w-[2px] bg-neutral-700 group-hover:bg-amber-500 transition-colors duration-500 self-stretch rounded-full" />
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[10px] font-mono text-amber-500 uppercase tracking-wider bg-amber-500/10 px-2 py-1 rounded">
                    {item.category}
                  </span>
                  <span className="material-symbols-outlined text-neutral-600 group-hover:text-amber-500 text-sm transition-colors">
                    {item.icon}
                  </span>
                </div>
                <p className="font-display text-neutral-300 text-sm font-light leading-relaxed group-hover:text-white transition-colors">
                  &ldquo;{item.description}&rdquo;
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 flex justify-between items-center text-[10px] text-neutral-500 font-mono">
        <span>SCROLL FOR MORE</span>
        <div className="h-8 w-[1px] bg-neutral-800" />
        <span className="text-amber-500/50">LIVE REQUEST LOG</span>
      </div>
    </div>
  );
}
