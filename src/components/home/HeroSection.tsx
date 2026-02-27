import { ArrowRight } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-[#02040a]">
      <div className="absolute inset-0 z-0">
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuB2FY_OP9pg1rJeyQbLRCCel6EjsAWJHBqBe1nwnWRKf_IWRTjbP82xhOWdomEWAoul715NXeiUDioqVTk0qUkllC0rsJpp_Ol4yF1x_RH14jFKkhimk537_xl2VKIv_994QjZzXTHgM3q3Vz9m5ViexYt1Z5pas4CrZ8WYjXDGRVSJUpwbGTAhGyOXjDS03EI282qm94COL-TCta6CP85BJZMne9iwT_e1Rh4Lt2dXjKn4kBCAAigC-Y1x3fJCrhkvPeiwJg7r-PQv"
          alt="Neural Network Background"
          className="w-full h-full object-cover opacity-30 mix-blend-screen scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#02040a]/90 via-[#030712]/80 to-[#02040a]" />
        <div className="hero-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-900/20 border border-blue-500/30 text-blue-300 text-xs font-semibold tracking-wide mb-8 backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
          </span>
          INTELLIGENT BUSINESS AUTOMATION
        </div>

        <h1 className="text-5xl md:text-8xl font-bold tracking-tight mb-8 leading-tight">
          Empower Your Business <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-blue-500 filter drop-shadow-[0_0_10px_rgba(59,130,246,0.3)]">
            With Smart AI Agents
          </span>
        </h1>

        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 font-light leading-relaxed">
          We build and integrate AI solutions to automate your routine, boost
          sales, and elevate customer experience with elite precision.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
          <a
            href="#solutions"
            className="group relative px-8 py-4 bg-white text-slate-950 rounded-full font-bold text-sm tracking-wide overflow-hidden transition-all hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
          >
            <span className="relative z-10">EXPLORE SOLUTIONS</span>
          </a>
          <a
            href="#custom"
            className="px-8 py-4 bg-white/5 border border-white/10 text-white rounded-full font-medium text-sm tracking-wide hover:bg-white/10 hover:border-white/20 transition-all flex items-center gap-2 group"
          >
            REQUEST CUSTOM AI
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}

