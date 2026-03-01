'use client';

import Link from 'next/link';

export function VyonFooter() {
  return (
    <footer className="py-12 border-t border-accent-gold/10 bg-black relative z-10">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-center md:text-left">
          <h2 className="text-xl font-display font-bold tracking-tight mb-1 text-white">VYON.</h2>
          <p className="text-[10px] text-neutral-600 font-mono uppercase tracking-widest">
            Part of the Ketly AI Ecosystem
          </p>
        </div>
        <div className="flex gap-8">
          <Link
            href="#privacy"
            className="text-[10px] uppercase tracking-widest text-neutral-500 hover:text-accent-gold transition-colors"
          >
            Privacy Protocol
          </Link>
          <Link
            href="#status"
            className="text-[10px] uppercase tracking-widest text-neutral-500 hover:text-accent-gold transition-colors"
          >
            System Status
          </Link>
          <Link
            href="#contact"
            className="text-[10px] uppercase tracking-widest text-neutral-500 hover:text-accent-gold transition-colors"
          >
            Contact Lab
          </Link>
        </div>
      </div>
    </footer>
  );
}
