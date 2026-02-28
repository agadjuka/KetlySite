import Link from 'next/link';

export function HomeHeader() {
  return (
    <header className="fixed top-0 z-50 w-full px-8 py-8 mix-blend-difference text-white opacity-0 animate-header-enter">
      <div className="flex items-center justify-between max-w-[1600px] mx-auto">
        <Link href="/" className="flex items-center gap-2">
          <div className="size-2 rounded-full bg-white animate-pulse" />
          <span className="text-sm font-display font-bold tracking-[0.2em] uppercase">
            Ketly AI
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-12">
          <Link
            href="#motion"
            className="text-xs uppercase tracking-widest hover:text-amber-400 transition-all duration-300 opacity-60 hover:opacity-100 hover-track"
            style={{ letterSpacing: '0.05em' }}
          >
            Motion
          </Link>
          <Link
            href="#logic"
            className="text-xs uppercase tracking-widest hover:text-amber-400 transition-all duration-300 opacity-60 hover:opacity-100 hover-track"
            style={{ letterSpacing: '0.05em' }}
          >
            Logic
          </Link>
          <Link
            href="#identity"
            className="text-xs uppercase tracking-widest hover:text-amber-400 transition-all duration-300 opacity-60 hover:opacity-100 hover-track"
            style={{ letterSpacing: '0.05em' }}
          >
            Identity
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <span className="text-[10px] font-mono opacity-40">SYS.READY</span>
        </div>
      </div>
    </header>
  );
}
