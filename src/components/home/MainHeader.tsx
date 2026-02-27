import Link from 'next/link';

export function MainHeader() {
  return (
    <header className="fixed top-0 w-full z-50 bg-[#030712]/80 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 h-8">
          <img
            src="/android-chrome-512x512.png"
            alt="Ketly logo"
            className="h-8 w-8 object-contain"
          />
          <img
            src="/logo-text-black.png"
            alt="Ketly"
            className="h-6 w-auto object-contain"
          />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <a
            href="#solutions"
            className="text-sm font-medium text-slate-400 hover:text-white transition-colors"
          >
            Solutions
          </a>
          <a
            href="#custom"
            className="text-sm font-medium text-slate-400 hover:text-white transition-colors"
          >
            Custom AI
          </a>
          <a
            href="#contact"
            className="text-sm font-medium text-slate-400 hover:text-white transition-colors"
          >
            Contact
          </a>
        </nav>

        <a
          href="#contact"
          className="hidden md:inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium text-white transition-all bg-blue-700 rounded-full hover:bg-blue-600 hover:shadow-[0_0_25px_rgba(37,99,235,0.6)]"
        >
          Book a Demo
        </a>
      </div>
    </header>
  );
}


