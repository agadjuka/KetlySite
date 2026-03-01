import Link from 'next/link';

export function HomeHeader() {
  return (
    <header className="fixed top-0 z-50 w-full px-8 py-8 bg-black/60 backdrop-blur-md border-b border-white/5 text-white opacity-0 animate-header-enter">
      <div className="flex items-center justify-between max-w-[1600px] mx-auto">
        <Link href="/" className="flex items-center gap-1.5 h-6">
          <img
            src="/Orange Icon/android-chrome-192x192.png"
            alt="Ketly"
            className="h-5 w-5 object-contain"
          />
          <img
            src="/logo-text-black.png"
            alt="Ketly"
            className="h-4 w-auto object-contain"
          />
        </Link>
        <nav className="hidden md:flex items-center gap-12">
          <Link
            href="#about"
            className="text-xs uppercase tracking-widest hover:text-amber-400 transition-all duration-300 opacity-60 hover:opacity-100 hover-track"
            style={{ letterSpacing: '0.05em' }}
          >
            About us
          </Link>
          <Link
            href="#solutions"
            className="text-xs uppercase tracking-widest hover:text-amber-400 transition-all duration-300 opacity-60 hover:opacity-100 hover-track"
            style={{ letterSpacing: '0.05em' }}
          >
            Core Technologies
          </Link>
          <Link
            href="#custom-logic"
            className="text-xs uppercase tracking-widest hover:text-amber-400 transition-all duration-300 opacity-60 hover:opacity-100 hover-track"
            style={{ letterSpacing: '0.05em' }}
          >
            Custom Architecture
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <span
            className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.6)]"
            aria-hidden
          />
          <span className="text-[10px] font-mono opacity-40 uppercase tracking-wider">Ready</span>
        </div>
      </div>
    </header>
  );
}
