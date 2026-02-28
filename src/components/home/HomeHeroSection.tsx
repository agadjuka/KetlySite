export function HomeHeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center px-6 overflow-hidden">
      <div className="fluid-bg animate-liquid-drift" />
      <div
        className="absolute top-1/2 left-1/2 w-[600px] h-[600px] rounded-full blur-[120px] opacity-20 mix-blend-screen pointer-events-none transition-transform duration-100 ease-out -translate-x-1/2 -translate-y-1/2"
        style={{
          background: 'linear-gradient(135deg, #d97706 0%, #fcd34d 50%, #fffbeb 100%)',
        }}
      />
      <div className="relative z-10 max-w-[1200px] w-full text-center">
        <div className="mb-6 opacity-0 animate-mask-reveal">
          <p className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.3em] text-neutral-400 font-medium">
            A BOUTIQUE AI LABORATORY
          </p>
        </div>
        <h1 className="font-serif text-5xl md:text-8xl lg:text-[7rem] font-light leading-[1.1] tracking-tighter text-[#F8F1E7] mb-8 overflow-hidden py-4">
          <span className="reveal-mask">
            <span className="block opacity-0 animate-mask-reveal">Autonomous AI for</span>
          </span>
          <span className="reveal-mask">
            <span
              className="block opacity-0 animate-mask-reveal"
              style={{ animationDelay: '0.3s' }}
            >
              <i className="font-serif italic text-amber-100/90">Premium Brands.</i>
            </span>
          </span>
        </h1>
        <div className="flex flex-col items-center gap-8 mt-8 opacity-0 animate-sub-enter">
          <div className="hero-divider-line" />
          <p className="text-neutral-400/70 text-sm md:text-base font-light tracking-wide max-w-2xl text-center leading-loose">
            We engineer invisible digital infrastructure. From hyper-realistic virtual try-ons to
            intelligent conversational agents, we seamlessly integrate elite technology into your
            business to drive flawless customer experiences and measurable growth.
          </p>
        </div>
      </div>
      <div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0 animate-sub-enter z-0 pointer-events-none"
        style={{ animationDelay: '0.6s' }}
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <div className="relative h-12 w-[1px] bg-white/10 overflow-hidden">
          <div className="absolute w-full bg-white h-1/2 top-0 animate-beam-drop shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
        </div>
      </div>
    </section>
  );
}
