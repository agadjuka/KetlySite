'use client';

export function VyonHeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center px-6 overflow-hidden">
      <div className="fluid-bg animate-liquid-drift" />
      <div className="absolute inset-0 z-0 opacity-20 mix-blend-screen pointer-events-none">
        <div
          className="w-full h-full bg-cover bg-center filter grayscale contrast-125 brightness-50"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1549439602-43ebca2327af?q=80&w=2970&auto=format&fit=crop')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]" />
      </div>
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern height="100" id="vyon-grid" patternUnits="userSpaceOnUse" width="100">
              <path d="M 100 0 L 0 0 0 100" fill="none" stroke="#bfa15f" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect fill="url(#vyon-grid)" height="100%" width="100%" />
        </svg>
      </div>
      <div className="relative z-10 max-w-[1200px] w-full text-center">
        <div className="mb-8 opacity-0 animate-mask-reveal flex justify-center">
          <div className="flex items-center gap-3 px-4 py-1.5 border border-accent-gold/20 rounded-full bg-black/40 backdrop-blur-sm">
            <div className="w-1.5 h-1.5 bg-accent-gold rounded-full animate-pulse" />
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent-gold/80 font-medium">
              [ VYON BY KETLY • SINGAPORE ]
            </p>
          </div>
        </div>
        <h1 className="font-serif-vyon text-5xl md:text-8xl lg:text-[7rem] font-light leading-[1.0] tracking-tight text-alabaster mb-8 overflow-hidden py-4">
          <span className="reveal-mask">
            <span className="block opacity-0 animate-mask-reveal">VYON: The</span>
          </span>
          <span className="reveal-mask">
            <span
              className="block opacity-0 animate-mask-reveal italic text-accent-gold/90"
              style={{ animationDelay: '0.3s' }}
            >
              AI Fitting Room
            </span>
          </span>
        </h1>
        <div className="flex flex-col items-center gap-8 mt-4 opacity-0 animate-sub-enter">
          <p className="font-display text-neutral-400 text-sm md:text-lg font-light tracking-wide max-w-xl text-center leading-relaxed">
            Transform passive browsing into confident buying. An autonomous AI try-on experience that integrates
            seamlessly into your store.
          </p>
        </div>
      </div>
      <div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0 animate-sub-enter z-0 pointer-events-none"
        style={{ animationDelay: '0.6s' }}
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-neutral-500">Initiate</span>
        <div className="relative h-12 w-[1px] bg-white/10 overflow-hidden">
          <div className="absolute w-full bg-accent-gold h-1/2 top-0 animate-beam-drop shadow-[0_0_10px_rgba(191,161,95,0.8)]" />
        </div>
      </div>
    </section>
  );
}
