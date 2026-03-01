'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { PartnershipInquiryModal } from './PartnershipInquiryModal';

const TRIGGER_ID = 'manifesto-section';
const THRESHOLD = 0.1;

export function CommandBar() {
  const [isVisible, setIsVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const el = document.getElementById(TRIGGER_ID);
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setIsVisible(true);
        });
      },
      { root: null, rootMargin: '0px', threshold: THRESHOLD }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="fixed bottom-8 left-1/2 z-[100] group"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translate(-50%, 0)' : 'translate(-50%, 20px)',
        pointerEvents: isVisible ? 'auto' : 'none',
        transition: 'opacity 0.6s cubic-bezier(0.19, 1, 0.22, 1), transform 0.6s cubic-bezier(0.19, 1, 0.22, 1)',
      }}
    >
      <div className="h-12 flex items-center px-4 gap-4 bg-[#1a1a1a]/70 command-bar-blur border border-amber-500/15 rounded-full shadow-[0_0_20px_rgba(0,0,0,0.4)] transition-all duration-500 hover:scale-[1.02] hover:border-amber-500/30">
        <div className="flex items-center justify-center pl-1">
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="flex items-center justify-center gap-2 px-3 py-2 rounded-full border border-amber-500/25 bg-white/[0.04] transition-all duration-300 hover:bg-white/8 hover:border-amber-500/40 hover:text-neutral-300 text-neutral-400"
          >
            <span className="text-[9px] font-mono tracking-widest uppercase leading-none">
              Get in Touch
            </span>
          </button>
        </div>
        <div className="w-[1px] h-3 bg-amber-500/20" />
        <div className="flex items-center gap-3 pl-1">
          <Link
            href="#contact"
            className="relative flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 hover:bg-white/5 icon-hover"
          >
            <div className="absolute inset-0 bg-amber-500/20 blur-lg rounded-full opacity-0 transition-opacity duration-300" />
            <svg
              className="w-4 h-4 text-neutral-300"
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
          <div className="w-[1px] h-3 bg-amber-500/20" />
          <Link
            href="/chat"
            className="relative flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 hover:bg-white/5 icon-hover"
          >
            <div className="absolute inset-0 bg-amber-500/20 blur-lg rounded-full opacity-0 transition-opacity duration-300" />
            <svg className="w-4 h-4 text-neutral-300 fill-current" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
            </svg>
          </Link>
        </div>
      </div>
      <PartnershipInquiryModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
