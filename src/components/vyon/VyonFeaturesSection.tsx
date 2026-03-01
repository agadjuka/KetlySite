'use client';

const FEATURES = [
  {
    tag: '[ VISUAL_CONFIDENCE ]',
    icon: 'verified_user',
    title: 'Absolute Visual Trust',
    text: "Replace standard mannequins with the buyer's own reflection. Our engine instantly adapts your garments to the user's photo, breaking down the main barrier of online shopping and radically reducing return rates.",
  },
  {
    tag: '[ ALGORITHMIC_UPSELL ]',
    icon: 'layers',
    title: 'Complete Look Generation',
    text: 'Shift the focus from single items to entire outfits. The AI seamlessly layers tops, bottoms, and accessories onto a single portrait, empowering clients to buy the full look and dramatically increasing your AOV.',
  },
  {
    tag: '[ ASSET_GENERATION ]',
    icon: 'auto_awesome',
    title: 'Zero-Shoot Catalog',
    text: 'Eliminate the need for expensive photo shoots and models. Use the VYON backend to instantly generate your seasonal catalog on diverse virtual models. Launch new collections faster with zero production overhead.',
  },
] as const;

export function VyonFeaturesSection() {
  return (
    <section className="relative py-24 px-6 md:px-12 max-w-[1600px] mx-auto z-20">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-32 manifesto-reveal" data-scroll-trigger>
        {FEATURES.map((item) => (
          <div
            key={item.title}
            className="p-8 border border-white/10 bg-neutral-900/70 backdrop-blur-sm rounded-sm hover:border-accent-gold/30 transition-colors duration-500 group"
          >
            <div className="flex justify-between items-start mb-6">
              <span className="material-symbols-outlined text-accent-gold/70 text-2xl font-light">
                {item.icon}
              </span>
              <span className="text-[9px] font-mono text-neutral-600 group-hover:text-accent-gold/50 transition-colors">
                {item.tag}
              </span>
            </div>
            <h3 className="text-xl font-display font-light text-alabaster mb-3">{item.title}</h3>
            <p className="text-neutral-500 text-sm font-light leading-relaxed">{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
