'use client';

const IMAGE_BASE = '/images/vyon/complete-looks';

const BASE_ITEM = {
  label: 'Dark Gray T-Shirt',
  price: '$75',
  image: `${IMAGE_BASE}/1.jpg`,
  size: 'w-36 h-36 lg:w-44 lg:h-44 xl:w-52 xl:h-52',
} as const;

const RECOMMENDATIONS = [
  { label: 'Red Plaid Shirt', price: '$95', image: `${IMAGE_BASE}/2.jpg` },
  { label: 'Classic Red Sneakers', price: '$120', image: `${IMAGE_BASE}/3.jpg` },
] as const;

const FULL_LOOK = {
  label: 'The Full Look',
  basePrice: '$75',
  totalPrice: '$290',
  image: `${IMAGE_BASE}/4.jpg`,
} as const;

function CircleImage({
  src,
  alt,
  size,
  className = '',
}: {
  src: string;
  alt: string;
  size: string;
  className?: string;
}) {
  return (
    <div
      className={`rounded-full border border-white/10 bg-neutral-800 overflow-hidden relative flex items-center justify-center ${size} ${className}`}
    >
      <span className="material-symbols-outlined text-neutral-600 text-2xl lg:text-3xl pointer-events-none absolute" aria-hidden>
        image
      </span>
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover relative z-10"
        onError={(e) => {
          e.currentTarget.style.display = 'none';
        }}
      />
    </div>
  );
}

export function VyonCompleteLooksSection() {
  return (
    <section className="relative py-24 border-t border-b border-white/5 bg-neutral-900/20 pt-8 lg:pt-12 mb-32 manifesto-reveal" data-scroll-trigger>
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 box-border">
        <div className="text-center mb-16 lg:mb-20">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-vyon text-alabaster mb-4">
            Sell Complete Looks, <i className="text-accent-gold">Not Single Items.</i>
          </h2>
          <p className="text-neutral-400 font-light text-sm sm:text-base tracking-wide max-w-xl mx-auto">
          The VYON engine goes beyond single-garment try-ons. If a client selects a blazer, the AI autonomously pulls matching trousers, shoes, and accessories from your catalog, generating a flawless, shoppable full-body look.
          </p>
        </div>
        <div className="relative flex flex-col min-w-0">
          {/* Desktop: три блока, каждый с hover-масштабом */}
          <div className="hidden lg:grid lg:grid-cols-[1fr_auto_1fr_auto_1fr] lg:items-start lg:gap-x-8 xl:gap-x-12">
            {/* Блок 1: базовый товар */}
            <div className="flex flex-col items-center flex-shrink-0 min-w-0 transition-transform duration-300 ease-out hover:scale-105 origin-center cursor-default">
              <p className="text-neutral-400 font-light text-xs sm:text-sm tracking-wide text-center max-w-[200px] lg:max-w-[220px] leading-relaxed mb-4 lg:mb-6">
                The customer selects a single base garment
              </p>
              <div className="relative shadow-2xl z-10 mb-4 lg:mb-6 group-hover:border-accent-gold transition-colors duration-500">
                <CircleImage src={BASE_ITEM.image} alt={BASE_ITEM.label} size={BASE_ITEM.size} />
              </div>
              <span className="text-[10px] sm:text-xs lg:text-sm uppercase tracking-widest text-neutral-500 font-mono text-center">{BASE_ITEM.label}</span>
              <span className="text-base lg:text-lg xl:text-xl text-white font-serif-vyon mt-0.5">{BASE_ITEM.price}</span>
            </div>

            <div className="w-12 h-12 xl:w-14 xl:h-14 rounded-full border border-accent-gold/20 bg-black/40 backdrop-blur-sm flex items-center justify-center flex-shrink-0 self-center" aria-hidden>
              <span className="material-symbols-outlined text-accent-gold text-xl xl:text-2xl">add</span>
            </div>

            {/* Блок 2: AI Recommendations */}
            <div className="flex flex-col items-center gap-4 lg:gap-6 flex-shrink-0 min-w-0 transition-transform duration-300 ease-out hover:scale-105 origin-center cursor-default">
              <p className="text-neutral-400 font-light text-xs sm:text-sm tracking-wide text-center max-w-[260px] lg:max-w-[280px] leading-relaxed mb-2">
                VYON autonomously suggests items, or follows your pre-set styling rules
              </p>
              <div className="text-[10px] sm:text-xs lg:text-sm font-mono text-accent-gold uppercase tracking-widest border border-accent-gold/20 px-3 py-1.5 lg:px-4 lg:py-2 rounded-full">
                AI Recommendations
              </div>
              <div className="flex gap-4 lg:gap-6">
                {RECOMMENDATIONS.map((item) => (
                  <div key={item.label} className="group relative flex flex-col items-center flex-shrink-0 min-w-0">
                    <div className="mb-2 lg:mb-3 group-hover:border-accent-gold/60 transition-colors duration-500">
                      <CircleImage src={item.image} alt={item.label} size="w-28 h-28 lg:w-36 lg:h-36 xl:w-44 xl:h-44" />
                    </div>
                    <span className="text-[9px] sm:text-xs uppercase tracking-wider text-neutral-500 font-mono text-center">{item.label}</span>
                    <span className="text-sm lg:text-base xl:text-lg text-neutral-300 font-serif-vyon mt-0.5">{item.price}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-center flex-shrink-0 w-12 xl:w-14 self-center" aria-hidden>
              <span className="material-symbols-outlined text-accent-gold/60 text-2xl xl:text-4xl">arrow_forward</span>
            </div>

            {/* Блок 3: Full Look */}
            <div className="group relative flex flex-col items-center flex-shrink-0 min-w-0 transition-transform duration-300 ease-out hover:scale-105 origin-center cursor-default">
              <p className="text-neutral-400 font-light text-xs sm:text-sm tracking-wide text-center max-w-[240px] leading-relaxed mb-4 lg:mb-6">
                A hyper-realistic visualization that drives the full-look purchase
              </p>
              <div className="absolute inset-0 bg-accent-gold/10 blur-xl rounded-full animate-pulse pointer-events-none" />
              <div className="mb-4 lg:mb-6 z-10 relative shadow-[0_0_30px_rgba(191,161,95,0.3)] border-2 border-accent-gold rounded-full overflow-hidden w-44 h-44 lg:w-52 lg:h-52 xl:w-60 xl:h-60 2xl:w-64 2xl:h-64">
                <CircleImage src={FULL_LOOK.image} alt={FULL_LOOK.label} size="w-full h-full" />
              </div>
              <span className="text-[10px] sm:text-xs lg:text-sm uppercase tracking-widest text-black font-bold font-mono bg-accent-gold px-3 py-1.5 lg:px-4 lg:py-2 rounded-full mb-1">{FULL_LOOK.label}</span>
              <div className="flex flex-col items-center gap-0 leading-none">
                <span className="text-[10px] sm:text-sm text-neutral-500 line-through">Base: {FULL_LOOK.basePrice}</span>
                <span className="text-xl lg:text-2xl xl:text-3xl text-accent-gold font-serif-vyon italic">{FULL_LOOK.totalPrice}</span>
              </div>
            </div>
          </div>

          {/* Mobile */}
          <div className="flex lg:hidden flex-col items-center gap-2">
            <p className="text-neutral-400 font-light text-xs sm:text-sm tracking-wide text-center mb-1 max-w-[200px]">The customer selects a single base garment</p>
            <div className="relative shadow-2xl z-10 group-hover:border-accent-gold transition-colors duration-500">
              <CircleImage src={BASE_ITEM.image} alt={BASE_ITEM.label} size="w-36 h-36" />
            </div>
            <div className="flex flex-col items-center gap-0.5 leading-none">
              <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-mono text-center">{BASE_ITEM.label}</span>
              <span className="text-base text-white font-serif-vyon text-center">{BASE_ITEM.price}</span>
            </div>

            <div className="w-8 h-8 rounded-full border border-accent-gold/30 bg-black flex items-center justify-center">
              <span className="material-symbols-outlined text-accent-gold text-sm">add</span>
            </div>

            <p className="text-neutral-400 font-light text-xs sm:text-sm tracking-wide text-center mb-1 max-w-[240px]">AI autonomously suggests items, or follows your pre-set styling rules</p>
            <div className="text-[10px] font-mono text-accent-gold uppercase tracking-widest border border-accent-gold/20 px-3 py-1 rounded-full mb-1">AI Recommendations</div>
            <div className="flex gap-4">
              {RECOMMENDATIONS.map((item) => (
                <div key={item.label} className="flex flex-col items-center leading-none">
                  <div className="mb-1 group-hover:border-accent-gold/60 transition-colors">
                    <CircleImage src={item.image} alt={item.label} size="w-28 h-28" />
                  </div>
                  <span className="text-[9px] uppercase tracking-wider text-neutral-500 font-mono text-center">{item.label}</span>
                  <span className="text-sm text-neutral-300 font-serif-vyon mt-0.5">{item.price}</span>
                </div>
              ))}
            </div>

            <div className="w-8 h-8 rounded-full border border-accent-gold/30 bg-black flex items-center justify-center">
              <span className="material-symbols-outlined text-accent-gold text-sm">arrow_downward</span>
            </div>

            <p className="text-neutral-400 font-light text-xs sm:text-sm tracking-wide text-center mb-1 max-w-[240px]">A hyper-realistic visualization that drives the full-look purchase</p>
            <div className="relative mb-2 z-10 border-2 border-accent-gold rounded-full overflow-hidden w-44 h-44">
              <CircleImage src={FULL_LOOK.image} alt={FULL_LOOK.label} size="w-full h-full" />
            </div>
            <span className="text-[10px] uppercase tracking-widest text-black font-bold font-mono bg-accent-gold px-3 py-1.5 rounded-full mb-1">{FULL_LOOK.label}</span>
            <div className="flex flex-col items-center gap-0 leading-none">
              <span className="text-[10px] text-neutral-500 line-through">Base: {FULL_LOOK.basePrice}</span>
              <span className="text-xl text-accent-gold font-serif-vyon italic">{FULL_LOOK.totalPrice}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
