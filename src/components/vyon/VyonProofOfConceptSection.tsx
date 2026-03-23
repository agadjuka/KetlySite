'use client';

import { usePartnershipModal } from '@/context/PartnershipModalContext';

export function VyonProofOfConceptSection() {
  const { openModal } = usePartnershipModal();

  return (
    <section
      className="relative pt-2 pb-16 lg:pt-4 lg:pb-24 border-t border-white/5 manifesto-reveal"
      data-scroll-trigger
    >
      <div className="w-full max-w-[1600px] mx-auto">
        <div className="vyon-poc-block rounded-sm border border-accent-gold/25 bg-neutral-900/60 backdrop-blur-sm px-6 py-10 lg:px-10 lg:py-14 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-accent-gold/5 via-transparent to-transparent" />
          <p className="relative text-xs font-mono uppercase tracking-[0.25em] text-accent-gold mb-4 text-left">
            [ PROOF OF CONCEPT ]
          </p>
          <h2 className="relative text-3xl md:text-4xl lg:text-5xl font-serif-vyon text-alabaster mb-6 text-left">
            7-Day Complimentary Integration
          </h2>
          <p className="relative text-neutral-400 font-light text-base lg:text-lg leading-relaxed mb-10 max-w-3xl text-left">
            Don&apos;t just trust the metrics—experience them. We will seamlessly deploy the VYON widget to your
            Shopify store for a 7-day zero-risk trial. Let your real customers try it on, and track the immediate
            impact on your conversions and AOV before making any commitment.
          </p>
          <div className="relative flex justify-center">
            <button
              type="button"
              onClick={openModal}
              className="vyon-cta-trial-btn px-10 py-4 bg-accent-gold text-black font-display text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 hover:bg-white hover:shadow-[0_0_30px_rgba(255,255,255,0.35)] hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
            >
              REQUEST 7-DAY TRIAL
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
