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
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute bottom-full left-0 right-0 mb-4 mx-2 z-50 bg-[#0A0A0A] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
                >
                    {/* Header / Handle */}
                    <div
                        onClick={onClose}
                        className="w-full flex items-center justify-center py-3 cursor-pointer hover:bg-white/5 transition-colors active:bg-white/10"
                    >
                        <div className="w-10 h-1 bg-zinc-800 rounded-full" />
                    </div>

                    {/* Content */}
                    <div className="px-2 pb-2 max-h-[50vh] overflow-y-auto">
                        <div className="grid grid-cols-1 gap-1">
                            {capabilities.map((cap, index) => (
                                <button
                                    key={index}
                                    onClick={() => {
                                        onSelect(cap.payload);
                                        onClose();
                                    }}
                                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 active:bg-white/10 transition-colors text-left group"
                                >
                                    <div className="p-2 rounded-lg bg-zinc-900 border border-white/5 text-zinc-400 group-hover:text-indigo-400 group-hover:border-indigo-500/20 transition-colors">
                                        <cap.icon size={18} />
                                    </div>
                                    <span className="font-medium text-zinc-300 text-sm group-hover:text-white transition-colors">{cap.title}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
