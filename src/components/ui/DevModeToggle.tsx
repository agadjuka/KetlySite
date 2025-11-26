'use client';

import { useDemoMode } from '@/context/DemoContext';

export function DevModeToggle() {
  const { isDemoMode, setIsDemoMode } = useDemoMode();

  const handleToggle = () => {
    setIsDemoMode(!isDemoMode);
  };

  return (
    <button
      onClick={handleToggle}
      className="fixed bottom-4 right-4 z-50 px-3 py-2 bg-black/60 backdrop-blur-sm border border-white/10 rounded-lg text-xs text-white/70 hover:text-white hover:bg-black/80 hover:border-white/20 transition-all"
      title="Toggle Demo Mode"
    >
      Toggle Demo
    </button>
  );
}

