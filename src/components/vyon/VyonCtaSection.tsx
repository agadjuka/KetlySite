'use client';

import Link from 'next/link';

export function VyonCtaSection() {
  return (
    <section className="relative max-w-3xl mx-auto text-center manifesto-reveal mb-24" data-scroll-trigger>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-accent-gold/5 blur-[80px] rounded-full pointer-events-none" />
      <h2 className="relative text-4xl md:text-5xl font-serif-vyon text-alabaster mb-8">
        Initiate a Proof of Concept.
      </h2>
      <div className="relative flex flex-col sm:flex-row items-center justify-center gap-6">
        <Link
          href="#contact"
          className="w-full sm:w-auto px-10 py-4 bg-accent-gold text-black font-display text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 hover:bg-white hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]"
        >
          Request Integration
        </Link>
        <Link
          href="#telegram"
          className="w-full sm:w-auto px-10 py-4 border border-white/20 text-white font-display text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 hover:border-accent-gold hover:text-accent-gold backdrop-blur-sm bg-black/30 flex items-center justify-center gap-2"
        >
          Test in Telegram
          <span className="material-symbols-outlined text-sm">send</span>
        </Link>
      </div>
      <p className="relative mt-8 text-[10px] font-mono text-neutral-600 uppercase tracking-widest">
        Limited API Keys Available for Q4 2024
      </p>
    </section>
  );
}
