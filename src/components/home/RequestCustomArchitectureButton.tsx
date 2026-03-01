'use client';

import { usePartnershipModal } from '@/context/PartnershipModalContext';

export function RequestCustomArchitectureButton() {
  const { openModal } = usePartnershipModal();

  return (
    <button
      type="button"
      onClick={openModal}
      className="group relative px-8 py-4 bg-white/5 backdrop-blur-md border border-amber-500/30 text-white font-display text-sm tracking-[0.2em] uppercase rounded-full overflow-hidden transition-all duration-300 hover:border-amber-500 hover:bg-white/10 btn-gold-pulse hover:shadow-[0_0_20px_rgba(217,119,6,0.3)]"
    >
      <span className="relative z-10">Request Custom Architecture</span>
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-gradient-to-r from-transparent via-amber-500/10 to-transparent transition-transform duration-500 ease-out" />
    </button>
  );
}
