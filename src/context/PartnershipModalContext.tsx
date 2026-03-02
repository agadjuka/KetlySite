'use client';

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import { PartnershipInquiryModal } from '@/components/home/PartnershipInquiryModal';

interface PartnershipModalContextValue {
  openModal: () => void;
  closeModal: () => void;
}

const PartnershipModalContext = createContext<PartnershipModalContextValue | undefined>(undefined);

export function usePartnershipModal() {
  const ctx = useContext(PartnershipModalContext);
  if (ctx === undefined) {
    throw new Error('usePartnershipModal must be used within PartnershipModalProvider');
  }
  return ctx;
}

export function PartnershipModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = useCallback(() => setIsOpen(true), []);
  const closeModal = useCallback(() => setIsOpen(false), []);

  const value = useMemo(() => ({ openModal, closeModal }), [openModal, closeModal]);

  return (
    <PartnershipModalContext.Provider value={value}>
      {children}
      <PartnershipInquiryModal isOpen={isOpen} onClose={closeModal} />
    </PartnershipModalContext.Provider>
  );
}
