'use client';

const FEATURES = [
  {
    title: '[ ZERO CODE REQUIRED ]',
    text: 'Installs directly via the Shopify ecosystem. Your IT team doesn’t need to write a single line of code.',
  },
  {
    title: '[ MULTI-POINT CONVERSION ]',
    text: 'Cart & Catalog Ready. Embeds the "Try-On" experience exactly where decisions are made. Customers can visualize single garments on product pages, or combine multiple items directly in their shopping cart to see the complete look before checkout.',
  },
  {
    title: '[ BRAND PRESERVATION ]',
    text: 'Absolute Visual Harmony. Zero design disruption. The interface automatically inherits your store\'s exact typography, color palette, and button styling, maintaining your premium aesthetic.',
  },
  {
    title: '[ BESPOKE ENGINEERING ]',
    text: 'Tailored Functionality. Beyond the standard widget. As a boutique laboratory, we can engineer custom features, unique user flows, or advanced logic tailored entirely to your brand\'s specific requirements.',
  },
] as const;

const CARD_IMAGE = '/images/Camel_Wool_Coat.jpg';

export function VyonShopifySection() {
  const handleTryOnClick = () => {
    if (typeof document === 'undefined') return;
    const sandbox = document.getElementById('vyon-now-sandbox');
    sandbox?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section
      className="relative pt-8 pb-6 lg:pt-10 lg:pb-8 border-t border-white/5 manifesto-reveal"
      data-scroll-trigger
    >
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
        <div className="order-1 lg:order-1 mb-10 lg:mb-0">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif-vyon text-alabaster mb-6">
            Native Shopify <i className="text-accent-gold">Deployment</i>
          </h2>
          <p className="text-neutral-400 font-light text-lg leading-relaxed mb-10 max-w-xl">
            No complex development. No broken themes. The VYON architecture integrates seamlessly into
            your Shopify or Shopify Plus store, acting as a natural extension of your brand.
          </p>
          <ul className="space-y-8">
            {FEATURES.map((item) => (
              <li key={item.title} className="flex gap-6 group">
                <span
                  className="flex-shrink-0 w-px h-16 bg-gradient-to-b from-accent-gold to-transparent opacity-40"
                  aria-hidden
                />
                <div>
                  <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-accent-gold mb-2">
                    {item.title}
                  </h3>
                  <p className="text-white text-base font-light leading-relaxed max-w-md">
                    {item.text}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="relative order-2 lg:order-2 flex justify-center">
          <div className="relative w-full max-w-[400px] bg-neutral-900 border border-white/10 rounded-sm overflow-hidden shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.05)]">
            <div className="relative aspect-[4/5] bg-neutral-900">
              <img
                src={CARD_IMAGE}
                alt="Camel Wool Coat"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4">
                <span
                  className="material-symbols-outlined text-white/40 font-light cursor-pointer hover:text-white transition-colors"
                  aria-hidden
                >
                  favorite
                </span>
              </div>
            </div>
            <div className="p-6 md:p-8">
              <div className="flex justify-between items-baseline mb-4">
                <h3 className="font-serif-vyon text-xl md:text-2xl text-white">Camel Wool Coat</h3>
                <span className="font-mono text-sm text-neutral-400">$1,200</span>
              </div>
              <div className="space-y-3">
                <button
                  type="button"
                  className="w-full py-4 bg-white text-black font-display text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-neutral-200 transition-colors"
                >
                  Add to Cart
                </button>
                <button
                  type="button"
                  onClick={handleTryOnClick}
                  className="w-full py-4 bg-white text-black font-display text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-sm">view_in_ar</span>
                  Try on with VYON
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
