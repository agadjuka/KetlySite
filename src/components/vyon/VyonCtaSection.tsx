'use client';

import Link from 'next/link';
import { usePartnershipModal } from '@/context/PartnershipModalContext';

export function VyonCtaSection() {
  const { openModal } = usePartnershipModal();

  return (
    <section className="relative max-w-3xl mx-auto text-center manifesto-reveal mb-24" data-scroll-trigger>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-accent-gold/5 blur-[80px] rounded-full pointer-events-none" />
      <h2 className="relative text-4xl md:text-5xl font-serif-vyon text-alabaster mb-8">
        Initiate a Proof of Concept.
      </h2>
      <div className="relative flex flex-col sm:flex-row items-center justify-center gap-6">
        <button
          type="button"
          onClick={openModal}
          className="w-full sm:w-auto px-10 py-4 bg-accent-gold text-black font-display text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 hover:bg-white hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]"
        >
          Request Integration
        </button>
        <Link
          href="https://t.me/vyonai_bot"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto px-10 py-4 border border-white/20 text-white font-display text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 hover:border-accent-gold hover:text-accent-gold backdrop-blur-sm bg-black/30 flex items-center justify-center gap-2"
        >
          Test in Telegram Bot
          <svg
            className="w-4 h-4 text-current"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
          >
            <path d="M22 2L11 13" />
            <path d="M22 2L15 22L11 13L2 9L22 2Z" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
