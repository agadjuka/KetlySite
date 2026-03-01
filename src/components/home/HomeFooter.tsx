import Link from 'next/link';

export function HomeFooter() {
  return (
    <footer className="py-12 border-t border-white/5 pb-24">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-center md:text-left flex flex-col gap-1">
          <Link href="/" className="flex items-center gap-1.5 w-fit mx-auto md:mx-0">
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
          <p className="text-xs text-neutral-600 font-mono">© 2024 KINETIC LOGIC IDENTITY</p>
        </div>
        <div className="flex gap-8">
          <Link href="#privacy" className="text-xs uppercase tracking-widest text-neutral-500 hover:text-white transition-colors">
            Privacy
          </Link>
          <Link href="#terms" className="text-xs uppercase tracking-widest text-neutral-500 hover:text-white transition-colors">
            Terms
          </Link>
          <Link href="#contact" className="text-xs uppercase tracking-widest text-neutral-500 hover:text-white transition-colors">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
