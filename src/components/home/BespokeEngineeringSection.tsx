import Link from 'next/link';
import { FeatureItemWithLine } from './FeatureItemWithLine';
import { UseCasesPanel } from './UseCasesPanel';
import { RequestCustomArchitectureButton } from './RequestCustomArchitectureButton';

export function BespokeEngineeringSection() {
  return (
    <section id="custom-logic" className="relative py-12 md:py-16 lg:py-20 w-full overflow-hidden" aria-label="Custom integrations">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 md:px-12">
        <div className="core-tech-block-substrate relative px-6 py-10 md:px-10 md:py-14 lg:px-14 lg:py-16 border-t-0">
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
              <div className="hidden lg:flex flex-col gap-4 items-start">
                <RequestCustomArchitectureButton />
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
          <div className="flex lg:hidden flex-col gap-4 items-start order-3 pt-4">
            <RequestCustomArchitectureButton />
            <span className="text-[10px] uppercase tracking-widest text-neutral-600 pl-4 font-mono flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
              By invitation only. Limited development slots.
            </span>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}
