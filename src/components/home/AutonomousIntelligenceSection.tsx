import Link from 'next/link';
import { FeatureItemWithLine } from './FeatureItemWithLine';

export function AutonomousIntelligenceSection() {
  return (
    <section id="solutions" className="relative py-32 px-6 md:px-12 max-w-[1600px] mx-auto" aria-label="Ready solutions">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        <div className="lg:col-span-5 sticky top-32 h-fit" data-scroll-trigger>
          <h2 className="text-4xl md:text-5xl font-display font-light mb-6 tracking-tight leading-tight">
            <span className="scroll-title-mask block">
              <span className="scroll-title-slide-up block">AI Receptionist.</span>
            </span>
          </h2>
          <div className="scroll-content-fade-up">
            <p className="text-neutral-400 font-light leading-relaxed mb-10 text-lg">
              Your business never sleeps, and neither should your sales process. The AI Receptionist is an intelligent conversational agent that lives inside your messengers. It captures every lead instantly, ensuring no high-ticket client is ever lost to a delayed response.
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
        </div>
        <div className="lg:col-span-7 relative pl-8 border-l border-neutral-800 scroll-divider-draw-target" data-scroll-trigger>
          <div className="mb-20 scroll-stagger-item">
            <FeatureItemWithLine
              title="Omnichannel Intercept"
              description="Seamlessly connects to WhatsApp, Telegram, Instagram, and your CRM. It meets your clients exactly where they are, instantly."
              icon="hub"
            />
          </div>
          <div className="mb-20 scroll-stagger-item">
            <FeatureItemWithLine
              title="Always-On Conversion (24/7)"
              description="Eliminates the &quot;after-hours&quot; drop-off. It handles objections, answers complex queries, and books appointments while your human team rests."
              icon="schedule"
            />
          </div>
          <div className="scroll-stagger-item">
            <FeatureItemWithLine
              title="Absolute Data Integrity"
              description="Zero hallucinations. The AI relies strictly on your company's verified knowledge base, providing accurate, brand-aligned answers with human-like empathy."
              icon="verified"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
