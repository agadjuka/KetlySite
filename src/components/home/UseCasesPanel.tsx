import Link from 'next/link';

const USE_CASES = [
  {
    category: 'Legal & Compliance',
    description:
      'We need an AI engine to extract, structure, and analyze clauses from multi-page PDF contracts in seconds.',
    icon: 'gavel',
    slug: 'legal-compliance-ai-contracts',
  },
  {
    category: 'Luxury Real Estate',
    description:
      'We need a WhatsApp AI broker to qualify high-net-worth leads and schedule property viewings 24/7.',
    icon: 'apartment',
    slug: 'luxury-real-estate-ai-broker',
  },
  {
    category: 'Wealth Management',
    description:
      'We need an AI analyst to instantly parse complex financial reports and generate personalized portfolio summaries for our VIP clients.',
    icon: 'finance',
    slug: 'wealth-management-ai-analyst',
  },
  {
    category: 'Logistics & Wholesale',
    description:
      'We need an automated AI dispatcher to process unstructured email requests and instantly calculate freight quotes.',
    icon: 'local_shipping',
    slug: 'logistics-wholesale-ai-dispatcher',
  },
] as const;

export function UseCasesPanel() {
  return (
    <div className="relative rounded-2xl overflow-hidden p-8 min-h-[600px] flex flex-col border border-white/10 bg-neutral-900/25">
      <div className="absolute top-0 right-0 p-6 flex gap-2 items-center">
        <span className="use-cases-dot w-2 h-2 rounded-full bg-amber-500/30" style={{ animationDelay: '0s' }} />
        <span className="use-cases-dot w-2 h-2 rounded-full bg-amber-500/40" style={{ animationDelay: '0.2s' }} />
        <span className="use-cases-dot w-2 h-2 rounded-full bg-amber-500/60" style={{ animationDelay: '0.4s' }} />
      </div>
      <div className="mb-10">
        <h3 className="text-sm font-mono uppercase tracking-[0.2em] text-neutral-500 mb-2">
          Use Cases
        </h3>
        <div className="h-[1px] w-full bg-gradient-to-r from-amber-500/40 via-white/10 to-transparent" />
      </div>
      <div className="flex-1 overflow-y-auto bespoke-scroll pr-2 space-y-6">
        {USE_CASES.map((item, i) => (
          <Link
            key={item.category}
            href={`/use-cases/${item.slug}`}
            className="block group"
          >
            <div
              className="relative p-6 rounded-lg transition-all duration-500 bg-white/[0.04] hover:bg-white/[0.08]"
              style={{ transitionDelay: `${i * 75}ms` }}
            >
              <div className="flex gap-4">
                <div className="w-[2px] bg-white/10 group-hover:bg-amber-500 transition-colors duration-500 self-stretch rounded-full" />
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] font-mono text-amber-500 uppercase tracking-wider px-0 py-0">
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
          </Link>
        ))}
      </div>
      <div className="mt-6 flex items-center justify-center gap-3 text-[9px] text-neutral-600 font-mono">
        <div className="h-4 w-[1px] bg-white/10" />
      </div>
    </div>
  );
}
