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
  {
    tag: '[ UX_SIMPLICITY ]',
    icon: 'touch_app',
    title: 'One-Click Experience',
    text: 'No apps to download, no complex 3D body scans or confusing size charts. A single selfie is all the engine needs to place the user inside your garments, keeping them engaged entirely within your sales funnel.',
  },
  {
    tag: '[ NATIVE_DEPLOYMENT ]',
    icon: 'extension',
    title: 'Zero-Friction Integration',
    text: 'Deploy the technology without engineering overhead. The VYON architecture plugs directly into Shopify Plus or any custom tech stack, activating instantly on your existing product pages.',
  },
  {
    tag: '[ WHITE_LABEL_UI ]',
    icon: 'palette',
    title: 'Brand-Native Aesthetics',
    text: "Your store, your rules. The try-on interface strictly inherits your exact typography, color palette, and design language. It operates invisibly, feeling like your brand's own exclusive, in-house innovation.",
  },
] as const;

export function VyonFeaturesSection() {
  return (
    <section className="relative pt-6 pb-24 px-6 md:px-12 max-w-[1600px] mx-auto z-20">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-serif-vyon text-alabaster mb-4">
          Engineered for High-Value Commerce.
        </h2>
        <p className="text-neutral-400 font-light text-sm md:text-base tracking-wide max-w-2xl mx-auto leading-relaxed">
          We designed the VYON architecture to solve the core bottlenecks of fashion retail: reducing return logistics, accelerating catalog production, and multiplying average order value.
        </p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8 mb-32 manifesto-reveal" data-scroll-trigger>
        {FEATURES.map((item) => (
          <div
            key={item.title}
            className="p-4 lg:p-8 min-h-0 border border-white/10 bg-neutral-900/70 backdrop-blur-sm rounded-sm transition-all duration-300 ease-out hover:border-accent-gold/30 hover:bg-neutral-900/95 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/30 group flex flex-col"
          >
            <div className="flex justify-between items-start mb-3 lg:mb-6 shrink-0">
              <span className="material-symbols-outlined text-accent-gold/70 text-xl lg:text-2xl font-light">
                {item.icon}
              </span>
              <span className="text-[8px] lg:text-[9px] font-mono text-neutral-600 group-hover:text-accent-gold/50 transition-colors leading-tight">
                {item.tag}
              </span>
            </div>
            <h3 className="text-base lg:text-xl font-display font-light text-alabaster mb-2 lg:mb-3 shrink-0">
              {item.title}
            </h3>
            <p className="text-neutral-500 text-xs lg:text-sm font-light leading-relaxed break-words flex-1 min-h-0">
              {item.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
