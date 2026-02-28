import Link from 'next/link';
import { FeatureItemWithLine } from './FeatureItemWithLine';

export function BespokeEngineeringSection() {
  return (
    <section id="custom-logic" className="relative py-32 w-full border-t border-neutral-900/50 bg-gradient-to-b from-black to-neutral-900/40" aria-label="Custom integrations">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        <div className="max-w-3xl">
          <div className="flex flex-col justify-center" data-scroll-trigger>
            <h2 className="text-4xl md:text-6xl font-display font-light tracking-tight mb-6 text-white">
              <span className="scroll-title-mask block">
                <span className="scroll-title-slide-up block text-amber-200/80 text-3xl md:text-4xl mb-3 font-serif italic">
                  Custom Logic.
                </span>
              </span>
              <span className="scroll-title-mask block">
                <span className="scroll-title-slide-up block" style={{ transitionDelay: '0.1s' }}>
                  Bespoke Engineering
                </span>
              </span>
            </h2>
            <div className="scroll-content-fade-up">
              <p className="text-neutral-400 text-lg font-light leading-relaxed mb-10 max-w-lg">
                Beyond the standard. We engineer unique neural architectures to solve your most
                complex operational friction. Turn routine manual tasks into autonomous streams of
                efficiency.
              </p>
              <div className="relative pl-8 border-l border-neutral-800 mb-12 scroll-divider-draw-target">
                <div className="mb-12 scroll-stagger-item">
                  <FeatureItemWithLine
                    variant="compact"
                    title="Bespoke Integration"
                    description="Custom-built engines tailored to your specific legacy data and workflow."
                    icon="memory"
                  />
                </div>
                <div className="mb-12 scroll-stagger-item">
                  <FeatureItemWithLine
                    variant="compact"
                    title="Routine Automation"
                    description="Identification and elimination of repetitive cognitive tasks."
                    icon="autorenew"
                  />
                </div>
                <div className="scroll-stagger-item">
                  <FeatureItemWithLine
                    variant="compact"
                    title="System Optimization"
                    description="Scalable logic that evolves with your business demands."
                    icon="trending_up"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-4 items-start">
                <Link
                  href="#contact"
                  className="group relative px-8 py-4 bg-white/5 backdrop-blur-md border border-amber-500/30 text-white font-display text-sm tracking-[0.2em] uppercase rounded-full overflow-hidden transition-all duration-300 hover:border-amber-500 hover:bg-white/10 btn-gold-pulse hover:shadow-[0_0_20px_rgba(217,119,6,0.3)]"
                >
                  <span className="relative z-10">REQUEST CUSTOM ARCHITECTURE</span>
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-gradient-to-r from-transparent via-amber-500/10 to-transparent transition-transform duration-500 ease-out" />
                </Link>
                <span className="text-[10px] uppercase tracking-widest text-neutral-600 pl-4 font-mono flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                  By invitation only. Limited development slots.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
