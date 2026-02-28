import Link from 'next/link';

export function CommandBar() {
  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] group">
      <div className="h-12 flex items-center px-4 gap-4 bg-[#1a1a1a]/70 command-bar-blur border border-amber-500/15 rounded-full shadow-[0_0_20px_rgba(0,0,0,0.4)] transition-all duration-500 hover:scale-[1.02] hover:border-amber-500/30">
        <div className="flex items-center gap-2 pr-4">
          <div className="relative flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            <div className="absolute w-full h-full rounded-full bg-amber-500/40 animate-ping" />
          </div>
          <span className="text-[9px] font-mono text-neutral-400 tracking-widest uppercase">
            [ SYS.READY ]
          </span>
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
            <svg
              className="w-4 h-4 text-neutral-300"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
            >
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
