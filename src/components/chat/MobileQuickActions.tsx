'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface Capability {
    title: string;
    icon: LucideIcon;
    payload: string;
}

interface MobileQuickActionsProps {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (payload: string) => void;
    capabilities: Capability[];
}

export function MobileQuickActions({ isOpen, onClose, onSelect, capabilities }: MobileQuickActionsProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const content = (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    style={{
                        transformOrigin: 'bottom left',
                        backdropFilter: 'blur(80px)',
                        WebkitBackdropFilter: 'blur(80px)',
                        touchAction: 'manipulation'
                    }}
                    className="fixed bottom-[calc(80px+1rem)] left-4 z-[9999] w-max max-w-[calc(100vw-2rem)] sm:max-w-[85vw] bg-zinc-900/20 border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
                >
                    {/* Header / Handle */}
                    <div
                        onClick={onClose}
                        className="w-full flex items-center justify-center py-2.5 cursor-pointer hover:bg-white/5 transition-colors active:bg-white/10 border-b border-white/10"
                    >
                        <div className="w-8 h-1 bg-white/20 rounded-full" />
                    </div>

                    {/* Content – fully expands to fit all actions */}
                    <div className="px-2 pb-2">
                        <div className="grid grid-cols-1 gap-1 divide-y divide-white/5">
                            {capabilities.map((cap, index) => (
                                <button
                                    key={index}
                                    onClick={() => {
                                        onClose();
                                        setTimeout(() => {
                                            onSelect(cap.payload);
                                        }, 250);
                                    }}
                                    className="flex items-center gap-3 p-3 hover:bg-white/5 active:bg-white/10 transition-colors text-left group"
                                >
                                    <div className="p-1.5 rounded-lg bg-white/5 border border-white/5 text-zinc-400 group-hover:text-indigo-400 group-hover:border-indigo-500/20 transition-colors">
                                        <cap.icon size={16} />
                                    </div>
                                    <span className="font-medium text-zinc-200 text-sm group-hover:text-white transition-colors whitespace-nowrap">
                                        {cap.title}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );

    return createPortal(content, document.body);
}
