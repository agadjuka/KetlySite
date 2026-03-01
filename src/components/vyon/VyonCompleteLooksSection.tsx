'use client';

const IMAGE_BASE = '/images/vyon/complete-looks';

const BASE_ITEM = {
  label: 'The Base: Silk Shirt',
  price: '$450',
  image: `${IMAGE_BASE}/1.jpg`,
  size: 'w-32 h-32',
} as const;

const RECOMMENDATIONS = [
  { label: 'Slim Trousers', price: '$600', image: `${IMAGE_BASE}/2.jpg` },
  { label: 'Leather Sneakers', price: '$850', image: `${IMAGE_BASE}/3.jpg` },
] as const;

const FULL_LOOK = {
  label: 'The Full Look',
  basePrice: '$450',
  totalPrice: '$1,900',
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
      <span className="material-symbols-outlined text-neutral-600 text-3xl pointer-events-none absolute" aria-hidden>
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
    <section className="relative py-20 border-t border-b border-white/5 bg-neutral-900/20 mb-32 manifesto-reveal" data-scroll-trigger>
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif-vyon text-alabaster mb-4">
            Sell Complete Looks, <i className="text-accent-gold">Not Single Items.</i>
          </h2>
          <p className="text-neutral-400 font-light text-sm tracking-wide max-w-xl mx-auto">
            Increase AOV by 42% through autonomous styling.
          </p>
        </div>
        <div className="relative flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16">
          {/* Base */}
          <div className="group relative flex flex-col items-center flex-shrink-0">
            <div className="relative shadow-2xl z-10 mb-6 group-hover:border-accent-gold transition-colors duration-500">
              <CircleImage src={BASE_ITEM.image} alt={BASE_ITEM.label} size={BASE_ITEM.size} />
            </div>
            <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-mono">
              {BASE_ITEM.label}
            </span>
            <span className="text-sm text-white font-serif-vyon mt-1">{BASE_ITEM.price}</span>
          </div>

          {/* Plus */}
          <div className="hidden lg:flex items-center justify-center w-12 h-12 rounded-full border border-accent-gold/20 bg-black/40 backdrop-blur-sm flex-shrink-0">
            <span className="material-symbols-outlined text-accent-gold text-lg">add</span>
          </div>

          {/* AI Recommendations */}
          <div className="flex flex-col items-center gap-6 flex-shrink-0">
            <div className="text-[9px] font-mono text-accent-gold uppercase tracking-widest border border-accent-gold/20 px-3 py-1 rounded-full">
              AI Recommendations
            </div>
            <div className="flex gap-6">
              {RECOMMENDATIONS.map((item) => (
                <div key={item.label} className="group relative flex flex-col items-center">
                  <div className="mb-3 group-hover:border-accent-gold/60 transition-colors duration-500">
                    <CircleImage src={item.image} alt={item.label} size="w-24 h-24" />
                  </div>
                  <span className="text-[9px] uppercase tracking-wider text-neutral-500 font-mono">
                    {item.label}
                  </span>
                  <span className="text-xs text-neutral-300 font-serif-vyon">{item.price}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Arrow */}
          <div className="hidden lg:flex items-center justify-center flex-shrink-0">
            <span className="material-symbols-outlined text-accent-gold/60 text-3xl">
              arrow_forward
            </span>
          </div>

          {/* Full Look */}
          <div className="group relative flex flex-col items-center scale-110 lg:ml-4 flex-shrink-0">
            <div className="absolute inset-0 bg-accent-gold/10 blur-xl rounded-full animate-pulse" />
            <div className="mb-6 z-10 relative shadow-[0_0_30px_rgba(191,161,95,0.3)] border-2 border-accent-gold rounded-full overflow-hidden w-40 h-40">
              <CircleImage src={FULL_LOOK.image} alt={FULL_LOOK.label} size="w-full h-full" />
            </div>
            <span className="text-[10px] uppercase tracking-widest text-black font-bold font-mono bg-accent-gold px-3 py-1 rounded-full mb-2">
              {FULL_LOOK.label}
            </span>
            <div className="flex flex-col items-center">
              <span className="text-[10px] text-neutral-500 line-through">Base: {FULL_LOOK.basePrice}</span>
              <span className="text-xl text-accent-gold font-serif-vyon italic">{FULL_LOOK.totalPrice}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
