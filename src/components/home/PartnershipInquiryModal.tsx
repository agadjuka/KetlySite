'use client';

import { createPortal } from 'react-dom';
import { useEffect, useRef, useState, useCallback } from 'react';
import { TELEGRAM_URL, WHATSAPP_URL } from '@/lib/contactLinks';
import { submitFeedback } from '@/lib/feedbackApi';
import { useFeedbackSuccess } from '@/context/FeedbackSuccessContext';

const MODAL_EXIT_MS = 350;

interface PartnershipInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
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
  const { showFeedbackSuccess } = useFeedbackSuccess();
  const [isAnimatingIn, setIsAnimatingIn] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [fullName, setFullName] = useState('');
  const [contact, setContact] = useState('');
  const [website, setWebsite] = useState('');
  const [message, setMessage] = useState('');

  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isClosingRef = useRef(false);

  const requestClose = useCallback(() => {
    if (isClosingRef.current) return;
    isClosingRef.current = true;
    setIsClosing(true);
    closeTimeoutRef.current = setTimeout(() => {
      onClose();
      setIsClosing(false);
      isClosingRef.current = false;
      closeTimeoutRef.current = null;
    }, MODAL_EXIT_MS);
  }, [onClose]);

  useEffect(() => {
    if (isOpen) isClosingRef.current = false;
  }, [isOpen]);

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    if (!isOpen && !isClosing) {
      setIsAnimatingIn(false);
      return;
    }
    if (isOpen && !isClosing) {
      const t = requestAnimationFrame(() => {
        requestAnimationFrame(() => setIsAnimatingIn(true));
      });
      return () => cancelAnimationFrame(t);
    }
  }, [isOpen, isClosing]);

  useEffect(() => {
    if (!isOpen && !isClosing) return;
    const handleEscape = (e: KeyboardEvent) => e.key === 'Escape' && requestClose();
    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, isClosing, requestClose]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) requestClose();
  };

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const payload = {
      full_name: fullName.trim(),
      contact: contact.trim(),
      website: website.trim(),
      message: message.trim(),
    };
    submitFeedback(payload);
    showFeedbackSuccess();
    requestClose();
  }

  if (typeof document === 'undefined' || (!isOpen && !isClosing)) return null;

  const modalContent = (
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="partnership-modal-title"
      onClick={handleOverlayClick}
      className={`fixed inset-0 z-[200] flex items-center justify-center p-0 md:p-4 bg-black/70 backdrop-blur-sm min-h-[100dvh] md:min-h-0 transition-opacity duration-300 ${
        isClosing ? 'partnership-modal-overlay-out' : ''
      }`}
      style={{
        opacity: isClosing ? undefined : isOpen ? 1 : 0,
        pointerEvents: isOpen || isClosing ? 'auto' : 'none',
      }}
    >
      <div
        className={`relative w-full min-h-[100dvh] max-h-[100dvh] overflow-y-auto rounded-none bg-[rgba(10,10,10,0.95)] backdrop-blur-xl border-0 md:min-h-0 md:max-w-4xl md:max-h-[90vh] md:h-auto md:rounded-2xl md:border md:border-amber-500/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] duration-300 ease-out ${
          isClosing ? 'partnership-modal-content-out' : 'transition-all'
        }`}
        style={
          isClosing
            ? undefined
            : {
                transform: isAnimatingIn ? 'scale(1) translateY(0)' : 'scale(0.96) translateY(20px)',
                opacity: isAnimatingIn ? 1 : 0,
              }
        }
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={requestClose}
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
            <div className="flex items-center justify-center gap-6">
              <a
                href={TELEGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full border border-amber-500/20 bg-white/[0.04] text-neutral-400 hover:text-neutral-200 hover:border-white/20 hover:bg-white/5 transition-all duration-300 hover:scale-110"
                aria-label="Telegram"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.16.16-.295.293-.605.293l.214-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.942z" />
                </svg>
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full border border-amber-500/20 bg-white/[0.04] text-neutral-400 hover:text-neutral-200 hover:border-white/20 hover:bg-white/5 transition-all duration-300 hover:scale-110"
                aria-label="WhatsApp"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                </svg>
              </a>
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
                    name="full_name"
                    placeholder="John Doe"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-transparent border-b border-amber-500/30 text-white py-3 focus:border-amber-500 focus:outline-none focus:bg-gradient-to-t focus:from-amber-500/5 focus:to-transparent placeholder:text-white/20 font-body font-light transition-all duration-300"
                  />
                </div>
                <div className="group/field">
                  <label className="block text-[10px] font-mono text-amber-500/70 uppercase tracking-widest mb-1 group-focus-within/field:text-amber-500 transition-colors">
                    Work Email or Telegram <span className="text-amber-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="contact"
                    placeholder="hello@brand.com / @username"
                    required
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    className="w-full bg-transparent border-b border-amber-500/30 text-white py-3 focus:border-amber-500 focus:outline-none focus:bg-gradient-to-t focus:from-amber-500/5 focus:to-transparent placeholder:text-white/20 font-body font-light transition-all duration-300"
                  />
                </div>
                <div className="group/field">
                  <label className="block text-[10px] font-mono text-amber-500/70 uppercase tracking-widest mb-1 group-focus-within/field:text-amber-500 transition-colors">
                    Company Website
                  </label>
                  <input
                    type="text"
                    name="website"
                    placeholder="www.yourstore.com"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    className="w-full bg-transparent border-b border-amber-500/30 text-white py-3 focus:border-amber-500 focus:outline-none focus:bg-gradient-to-t focus:from-amber-500/5 focus:to-transparent placeholder:text-white/20 font-body font-light transition-all duration-300"
                  />
                </div>
                <div className="group/field">
                  <label className="block text-[10px] font-mono text-amber-500/70 uppercase tracking-widest mb-1 group-focus-within/field:text-amber-500 transition-colors">
                    Project Scope / Objective
                  </label>
                  <textarea
                    name="message"
                    rows={3}
                    placeholder="Briefly describe your current architecture or what you want to automate..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-transparent border-b border-amber-500/30 text-white py-3 focus:border-amber-500 focus:outline-none focus:bg-gradient-to-t focus:from-amber-500/5 focus:to-transparent placeholder:text-white/20 font-body font-light resize-none transition-all duration-300"
                  />
                </div>
                <div className="pt-4 flex flex-col items-center gap-4">
                  <button
                    type="submit"
                    className="w-full group relative px-8 py-4 bg-amber-900/10 backdrop-blur-md border border-amber-500/50 text-white font-display text-sm tracking-[0.2em] uppercase rounded-sm overflow-hidden transition-[transform_0.2s_ease-out,border-color_0.3s,background-color_0.3s,box-shadow_0.3s] hover:border-amber-500 hover:bg-amber-900/20 hover:shadow-[0_0_30px_rgba(217,119,6,0.2)] active:scale-[0.98]"
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
