'use client';

import { createContext, useCallback, useContext, useState, type ReactNode } from 'react';
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

  return (
    <PartnershipModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      <PartnershipInquiryModal isOpen={isOpen} onClose={closeModal} />
    </PartnershipModalContext.Provider>
  );
}
