import Link from 'next/link';
import { FeatureItemWithLine } from './FeatureItemWithLine';

export function BespokeEngineeringSection() {
  return (
    <section className="relative py-32 w-full border-t border-neutral-900/50 bg-gradient-to-b from-black to-neutral-900/40">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className="flex flex-col justify-center order-1" data-scroll-trigger>
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
          <div className="order-2 relative h-full min-h-[500px] w-full flex items-center justify-center scroll-content-fade-up" style={{ transitionDelay: '0.2s' }} data-scroll-trigger>
            <div className="absolute inset-0 bg-neutral-900/50 rounded-2xl border border-neutral-800/50 backdrop-blur-sm overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(17,17,17,0)_0%,_rgba(5,5,5,1)_100%)] z-10 pointer-events-none" />
              <div className="w-full h-full relative z-0 flex items-center justify-center opacity-80">
                <div className="absolute w-[400px] h-[400px] border border-amber-500/10 rounded-full animate-[spin_60s_linear_infinite]" />
                <div className="absolute w-[300px] h-[300px] border border-amber-500/20 rounded-full animate-[spin_40s_linear_infinite_reverse]" />
                <div className="absolute w-[200px] h-[200px] border border-amber-500/30 rounded-full animate-[spin_20s_linear_infinite]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-amber-500 rounded-full shadow-[0_0_20px_5px_rgba(217,119,6,0.5)] z-20" />
                <svg
                  className="absolute inset-0 w-full h-full"
                  viewBox="0 0 600 600"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g
                    className="animate-pulse-network"
                    stroke="#d97706"
                    strokeOpacity="0.3"
                    strokeWidth="0.5"
                  >
                    <line x1="300" x2="450" y1="300" y2="150" />
                    <line x1="300" x2="150" y1="300" y2="150" />
                    <line x1="300" x2="450" y1="300" y2="450" />
                    <line x1="300" x2="150" y1="300" y2="450" />
                    <line x1="300" x2="300" y1="300" y2="100" />
                    <line x1="300" x2="300" y1="300" y2="500" />
                    <line x1="300" x2="500" y1="300" y2="300" />
                    <line x1="300" x2="100" y1="300" y2="300" />
                    <line x1="450" x2="500" y1="150" y2="100" />
                    <line x1="150" x2="100" y1="150" y2="100" />
                    <circle className="fill-amber-500/20" cx="300" cy="300" r="4" />
                    <circle className="fill-amber-500/20 node-glow" cx="450" cy="150" r="3" />
                    <circle className="fill-amber-500/20 node-glow" cx="150" cy="150" r="3" />
                    <circle className="fill-amber-500/20 node-glow" cx="450" cy="450" r="3" />
                    <circle className="fill-amber-500/20 node-glow" cx="150" cy="450" r="3" />
                    <circle className="fill-amber-500/20 node-glow" cx="300" cy="100" r="3" />
                    <circle className="fill-amber-500/20 node-glow" cx="300" cy="500" r="3" />
                    <circle className="fill-amber-500/20 node-glow" cx="500" cy="300" r="3" />
                    <circle className="fill-amber-500/20 node-glow" cx="100" cy="300" r="3" />
                  </g>
                </svg>
                <div className="absolute top-8 right-8 font-mono text-[10px] text-amber-500/50 tracking-widest uppercase">
                  Neural Map v.4.0
                </div>
                <div className="absolute bottom-8 left-8 font-mono text-[10px] text-neutral-600 tracking-widest uppercase text-left">
                  Node: Active
                  <br />
                  Status: Optimizing
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
