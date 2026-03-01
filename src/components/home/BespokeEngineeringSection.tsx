import Link from 'next/link';
import { FeatureItemWithLine } from './FeatureItemWithLine';
import { UseCasesPanel } from './UseCasesPanel';

export function BespokeEngineeringSection() {
  return (
    <section id="custom-logic" className="relative py-32 w-full border-t border-neutral-900/50" aria-label="Custom integrations">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          <div className="flex flex-col justify-center order-1 max-w-3xl" data-scroll-trigger>
            <h2 className="text-4xl md:text-6xl font-display font-light tracking-tight mb-6 text-white">
              <span className="scroll-title-mask block">
                <span className="scroll-title-slide-up block text-amber-200/80 text-3xl md:text-4xl font-serif italic">
                  Custom Logic &amp; Bespoke Engineering.
                </span>
              </span>
            </h2>
            <div className="scroll-content-fade-up">
              <p className="text-neutral-400 text-lg font-light leading-relaxed mb-10 max-w-lg">
                Beyond out-of-the-box software. We architect unique AI ecosystems designed specifically for your operational bottlenecks. Turn your most complex manual routines into autonomous, error-free workflows.
              </p>
              <div className="relative pl-8 border-l border-neutral-800 mb-12 scroll-divider-draw-target">
                <div className="mb-12 scroll-stagger-item">
                  <FeatureItemWithLine
                    variant="compact"
                    title="Tailored Architecture"
                    description="Custom-built engines that integrate flawlessly with your legacy software and CRM."
                    icon="memory"
                  />
                </div>
                <div className="mb-12 scroll-stagger-item">
                  <FeatureItemWithLine
                    variant="compact"
                    title="Cognitive Automation"
                    description="Delegation of repetitive, high-volume analytical tasks to mathematical algorithms."
                    icon="autorenew"
                  />
                </div>
                <div className="scroll-stagger-item">
                  <FeatureItemWithLine
                    variant="compact"
                    title="Scalable Infrastructure"
                    description="Systems designed to handle infinite loads as your enterprise expands."
                    icon="trending_up"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-4 items-start">
                <Link
                  href="#contact"
                  className="group relative px-8 py-4 bg-white/5 backdrop-blur-md border border-amber-500/30 text-white font-display text-sm tracking-[0.2em] uppercase rounded-full overflow-hidden transition-all duration-300 hover:border-amber-500 hover:bg-white/10 btn-gold-pulse hover:shadow-[0_0_20px_rgba(217,119,6,0.3)]"
                >
                  <span className="relative z-10">Request Custom Architecture</span>
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-gradient-to-r from-transparent via-amber-500/10 to-transparent transition-transform duration-500 ease-out" />
                </Link>
                <span className="text-[10px] uppercase tracking-widest text-neutral-600 pl-4 font-mono flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                  By invitation only. Limited development slots.
                </span>
              </div>
            </div>
          </div>
          <div className="order-2 w-full relative" data-scroll-trigger>
            <div className="scroll-content-fade-up">
              <UseCasesPanel />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
