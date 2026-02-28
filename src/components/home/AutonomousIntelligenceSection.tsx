import Link from 'next/link';
import { FeatureItemWithLine } from './FeatureItemWithLine';

export function AutonomousIntelligenceSection() {
  return (
    <section className="relative py-32 px-6 md:px-12 max-w-[1600px] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        <div className="lg:col-span-5 sticky top-32 h-fit">
          <h2 className="text-4xl md:text-5xl font-display font-light mb-6 tracking-tight leading-tight">
            AI Receptionist
          </h2>
          <p className="text-neutral-400 font-light leading-relaxed mb-10 text-lg">
            The AI Administrator is not a tool; it is a permanent member of your leadership team.
            Operating with zero latency and mathematical certainty, it manages workflows,
            orchestrates data, and ensures your system reaches peak performance while you sleep.
          </p>
          <div className="flex flex-col gap-4 items-start">
            <Link
              href="/chat"
              className="group relative px-8 py-4 bg-white/5 backdrop-blur-md border border-amber-500/30 text-white font-display text-sm tracking-[0.2em] uppercase rounded-full overflow-hidden transition-all duration-300 hover:border-amber-500 hover:bg-white/10 btn-gold-pulse"
            >
              <span className="relative z-10">Enter the Dialogue</span>
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-gradient-to-r from-transparent via-amber-500/10 to-transparent transition-transform duration-500 ease-out" />
            </Link>
            <span className="text-[10px] uppercase tracking-widest text-neutral-600 pl-4 font-mono">
              Experience the logic firsthand.
            </span>
          </div>
        </div>
        <div className="lg:col-span-7 relative pl-8 border-l border-neutral-800">
          <div className="mb-20">
            <FeatureItemWithLine
              title="Absolute Precision"
              description="Zero errors, flawless execution of complex logic. Every decision is calculated against millions of parameters instantaneously."
              icon="check_circle"
            />
          </div>
          <div className="mb-20">
            <FeatureItemWithLine
              title="Infinite Scale"
              description="Handling thousands of simultaneous operational goals. The architecture expands elastically as your enterprise demands grow."
              icon="all_inclusive"
            />
          </div>
          <div>
            <FeatureItemWithLine
              title="Silent Performance"
              description="Deep integration into your existing tech stack. It operates invisibly in the background, surfacing only when strategy is required."
              icon="graphic_eq"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
