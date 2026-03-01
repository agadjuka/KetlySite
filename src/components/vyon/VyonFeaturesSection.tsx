'use client';

const FEATURES = [
  {
    tag: '[ FABRIC_PHYSICS_SYNC ]',
    icon: 'architecture',
    title: 'Hyper-Real Drape',
    text: 'Simulating the weight, tension, and texture of luxury fabrics on the human form with 99.8% physical accuracy.',
  },
  {
    tag: '[ IDENTITY_PRESERVATION ]',
    icon: 'fingerprint',
    title: 'Identity First',
    text: "Our engine preserves the user's unique identity, skin tone, and body morphology, generating trust before the transaction.",
  },
  {
    tag: '[ LUXURY_ASSET_MGMT ]',
    icon: 'diamond',
    title: 'Atelier Grade',
    text: 'Designed for high-value garments. From silk chiffon to structured wool, every fiber is respected in the digital realm.',
  },
] as const;

export function VyonFeaturesSection() {
  return (
    <section className="relative py-24 px-6 md:px-12 max-w-[1600px] mx-auto z-20">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-32 manifesto-reveal" data-scroll-trigger>
        {FEATURES.map((item) => (
          <div
            key={item.title}
            className="p-8 border border-white/5 bg-white/5 backdrop-blur-sm rounded-sm hover:border-accent-gold/30 transition-colors duration-500 group"
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
