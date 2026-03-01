'use client';

import { createPortal } from 'react-dom';
import { useEffect, useRef, useState } from 'react';

interface PartnershipInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function ScheduleIcon() {
  return (
    <svg className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

export function PartnershipInquiryModal({ isOpen, onClose }: PartnershipInquiryModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [isAnimatingIn, setIsAnimatingIn] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setIsAnimatingIn(false);
      return;
    }
    const t = requestAnimationFrame(() => {
      requestAnimationFrame(() => setIsAnimatingIn(true));
    });
    return () => cancelAnimationFrame(t);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleEscape = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose();
  };

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Логика отправки пока не прописана
  }

  if (typeof document === 'undefined' || !isOpen) return null;

  const modalContent = (
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="partnership-modal-title"
      onClick={handleOverlayClick}
      className="fixed inset-0 z-[200] flex items-center justify-center p-0 md:p-4 bg-black/70 backdrop-blur-sm transition-opacity duration-300 ease-out min-h-[100dvh] md:min-h-0"
      style={{ opacity: isOpen ? 1 : 0, pointerEvents: isOpen ? 'auto' : 'none' }}
    >
      <div
        className="relative w-full min-h-[100dvh] max-h-[100dvh] overflow-y-auto rounded-none bg-[rgba(10,10,10,0.95)] backdrop-blur-xl border-0 md:min-h-0 md:max-w-4xl md:max-h-[90vh] md:h-auto md:rounded-2xl md:border md:border-amber-500/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-300 ease-out"
        style={{
          transform: isAnimatingIn ? 'scale(1) translateY(0)' : 'scale(0.96) translateY(20px)',
          opacity: isAnimatingIn ? 1 : 0,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 flex items-center justify-center rounded-full text-neutral-400 hover:text-white hover:bg-white/10 transition-colors md:top-4 md:right-4"
          style={{ top: 'max(1rem, env(safe-area-inset-top))' }}
          aria-label="Закрыть"
        >
          <CloseIcon />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 p-6 pt-16 pb-[max(2rem,env(safe-area-inset-bottom))] md:p-12 md:pt-12 md:pb-12">
          {/* Левая колонка — промо */}
          <div className="flex flex-col justify-center">
            <span className="inline-block w-fit py-1 px-3 border border-amber-500/20 rounded-full bg-amber-900/10 text-[10px] font-mono text-amber-500 uppercase tracking-[0.2em] mb-6">
              Partnership Inquiry
            </span>
            <h2 id="partnership-modal-title" className="font-display text-4xl md:text-5xl lg:text-6xl font-light leading-tight tracking-tight text-[#F8F1E7] mb-6">
              Initiate <span className="italic text-amber-100/90">the Dialogue.</span>
            </h2>
            <div className="h-px w-16 bg-gradient-to-r from-amber-500/50 to-transparent mb-6" />
            <p className="font-display text-neutral-400 text-base md:text-lg font-light leading-relaxed mb-8 max-w-md">
              We select a limited number of partners each month to ensure architectural perfection. Provide your details to begin the evaluation.
            </p>
            <div className="flex items-center gap-4 text-xs font-mono text-neutral-500">
              <div className="flex items-center gap-2">
                <ScheduleIcon />
                <span>AVG. RESPONSE: 24H</span>
              </div>
              <span className="w-px h-3 bg-neutral-700" />
              <div className="flex items-center gap-2">
                <LockIcon />
                <span>ENCRYPTED CHANNEL</span>
              </div>
            </div>
          </div>

          {/* Правая колонка — форма */}
          <div className="relative">
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
            <div className="relative rounded-2xl p-6 md:p-8 bg-[rgba(10,10,10,0.4)] backdrop-blur-xl border border-amber-500/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] group">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-2xl" />
              <form onSubmit={handleSubmit} className="flex flex-col gap-6 relative z-10">
                <div className="group/field">
                  <label className="block text-[10px] font-mono text-amber-500/70 uppercase tracking-widest mb-1 group-focus-within/field:text-amber-500 transition-colors">
                    Full Name <span className="text-amber-600">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    required
                    className="w-full bg-transparent border-b border-amber-500/30 text-white py-3 focus:border-amber-500 focus:outline-none focus:bg-gradient-to-t focus:from-amber-500/5 focus:to-transparent placeholder:text-white/20 font-body font-light transition-all duration-300"
                  />
                </div>
                <div className="group/field">
                  <label className="block text-[10px] font-mono text-amber-500/70 uppercase tracking-widest mb-1 group-focus-within/field:text-amber-500 transition-colors">
                    Work Email or Telegram <span className="text-amber-600">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="hello@brand.com / @username"
                    required
                    className="w-full bg-transparent border-b border-amber-500/30 text-white py-3 focus:border-amber-500 focus:outline-none focus:bg-gradient-to-t focus:from-amber-500/5 focus:to-transparent placeholder:text-white/20 font-body font-light transition-all duration-300"
                  />
                </div>
                <div className="group/field">
                  <label className="block text-[10px] font-mono text-amber-500/70 uppercase tracking-widest mb-1 group-focus-within/field:text-amber-500 transition-colors">
                    Company Website
                  </label>
                  <input
                    type="text"
                    placeholder="www.yourstore.com"
                    className="w-full bg-transparent border-b border-amber-500/30 text-white py-3 focus:border-amber-500 focus:outline-none focus:bg-gradient-to-t focus:from-amber-500/5 focus:to-transparent placeholder:text-white/20 font-body font-light transition-all duration-300"
                  />
                </div>
                <div className="group/field">
                  <label className="block text-[10px] font-mono text-amber-500/70 uppercase tracking-widest mb-1 group-focus-within/field:text-amber-500 transition-colors">
                    Project Scope / Objective
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Briefly describe your current architecture or what you want to automate..."
                    className="w-full bg-transparent border-b border-amber-500/30 text-white py-3 focus:border-amber-500 focus:outline-none focus:bg-gradient-to-t focus:from-amber-500/5 focus:to-transparent placeholder:text-white/20 font-body font-light resize-none transition-all duration-300"
                  />
                </div>
                <div className="pt-4 flex flex-col items-center gap-4">
                  <button
                    type="submit"
                    className="w-full group relative px-8 py-4 bg-amber-900/10 backdrop-blur-md border border-amber-500/50 text-white font-display text-sm tracking-[0.2em] uppercase rounded-sm overflow-hidden transition-all duration-300 hover:border-amber-500 hover:bg-amber-900/20 hover:shadow-[0_0_30px_rgba(217,119,6,0.2)]"
                  >
                    <span className="relative z-10 group-hover:text-amber-100 transition-colors">Submit Inquiry</span>
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-gradient-to-r from-transparent via-amber-500/20 to-transparent transition-transform duration-500 ease-out" />
                    <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-amber-500 opacity-50 group-hover:opacity-100 transition-opacity" />
                    <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-amber-500 opacity-50 group-hover:opacity-100 transition-opacity" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
