import Link from 'next/link';
import { FeatureItemWithLine } from './FeatureItemWithLine';
import { VirtualTryOnPanel } from './VirtualTryOnPanel';

export function DigitalAtelierSection() {
  return (
    <section className="relative py-32 w-full overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          <div className="relative">
            <VirtualTryOnPanel />
          </div>
          <div className="flex flex-col justify-center" data-scroll-trigger>
            <h2 className="text-4xl md:text-5xl font-display font-light tracking-tight mb-6">
              <span className="scroll-title-mask block">
                <span className="scroll-title-slide-up block">Virtual Try-On.</span>
              </span>
            </h2>
            <div className="scroll-content-fade-up">
              <p className="text-neutral-400 text-lg font-light leading-relaxed mb-10 max-w-lg">
                Bridge the gap between curiosity and confidence. Let your customers visualize themselves in your garments instantly. Eliminate the &quot;will it fit?&quot; hesitation, drastically reduce return rates, and increase your Average Order Value (AOV).
              </p>
              <div className="relative pl-8 border-l border-neutral-800 mb-12 scroll-divider-draw-target">
                <div className="mb-12 scroll-stagger-item">
                  <FeatureItemWithLine
                    variant="compact"
                    title="Zero-Code Integration"
                    description="Native implementation into Shopify or custom stores. It blends perfectly with your existing product pages."
                    icon="check_circle"
                  />
                </div>
                <div className="mb-12 scroll-stagger-item">
                  <FeatureItemWithLine
                    variant="compact"
                    title="Complete Look Simulation"
                    description="Customers can visualize multiple items (up to 5+) on their own photo simultaneously."
                    icon="all_inclusive"
                  />
                </div>
                <div className="scroll-stagger-item">
                  <FeatureItemWithLine
                    variant="compact"
                    title="Algorithmic Upsell"
                    description="Automatically suggests and visualizes matching accessories to complete the outfit, driving cross-sales."
                    icon="graphic_eq"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-4 items-start">
                <Link
                  href="#contact"
                  className="group relative px-8 py-4 bg-white/5 backdrop-blur-md border border-amber-500/30 text-white font-display text-sm tracking-[0.2em] uppercase rounded-full overflow-hidden transition-all duration-300 hover:border-amber-500 hover:bg-white/10 btn-gold-pulse"
                >
                  <span className="relative z-10">DISCOVER THE TECHNOLOGY</span>
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-gradient-to-r from-transparent via-amber-500/10 to-transparent transition-transform duration-500 ease-out" />
                </Link>
                <span className="text-[10px] uppercase tracking-widest text-neutral-600 pl-4 font-mono">
                  Zero technical debt. Fully white-labeled.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
