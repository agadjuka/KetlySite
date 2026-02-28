export function ManifestoSection() {
  return (
    <section className="relative py-16 md:py-20 px-6 overflow-hidden">
      <div className="absolute inset-0 flex justify-center pointer-events-none">
        <div className="w-[1px] h-full bg-gradient-to-b from-transparent via-white/5 to-transparent" />
      </div>
      <div className="max-w-4xl mx-auto text-center relative z-10" data-scroll-trigger>
        <div className="mb-4 scroll-content-fade-up">
          <span className="inline-block font-mono text-[10px] md:text-xs tracking-[0.3em] text-amber-500/80 uppercase px-4 py-2 border border-amber-500/10 bg-amber-900/5 backdrop-blur-sm rounded-full">
            Engineered in Singapore. Deployed Globally.
          </span>
        </div>
        <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl leading-tight mb-6 text-white/90">
          <span className="scroll-title-mask block">
            <span className="scroll-title-slide-up block">True luxury is completely</span>
          </span>
          <span className="scroll-title-mask block">
            <span className="scroll-title-slide-up block" style={{ transitionDelay: '0.1s' }}>
              <i className="text-amber-100 italic">seamless.</i>
            </span>
          </span>
        </h2>
        <div className="flex justify-center scroll-content-fade-up">
          <p className="font-display text-neutral-400 font-light text-lg md:text-xl leading-relaxed max-w-2xl">
            We are a boutique AI laboratory designing invisible infrastructure for high-end
            commerce. We don&apos;t sell generic software. We build autonomous ecosystems that
            elevate your brand&apos;s aesthetic while driving mathematical growth.
          </p>
        </div>
        <div className="mt-8 h-8 w-[1px] bg-gradient-to-b from-amber-500/50 to-transparent mx-auto scroll-content-fade-up" style={{ transitionDelay: '0.4s' }} />
      </div>
    </section>
  );
}
