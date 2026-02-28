import {
  ShieldCheck,
  ArrowRight,
  MoreHorizontal,
  CalendarDays,
  CheckCircle2,
  Shirt,
  Menu,
  ShoppingBag,
  Wand2,
  Check,
} from 'lucide-react';

function BusinessAdminCard() {
  return (
    <div className="split-section relative flex-1 border-r border-white/5 group overflow-hidden bg-[#050912] transition-colors">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent opacity-40" />

      <div className="relative h-full flex flex-col justify-center p-8 lg:p-16 z-10">
        <div className="mb-12">
          <div className="w-14 h-14 rounded-xl bg-blue-900/20 flex items-center justify-center mb-6 border border-blue-500/20">
            <ShieldCheck className="w-7 h-7 text-blue-400" />
          </div>
          <h3 className="text-3xl font-bold mb-4 text-white">
            Ketly AI Assistants
          </h3>
          <p className="text-slate-400 mb-8 max-w-md">
            Smart AI agents that handle customer support, booking, and sales
            24/7. Turn your chats into conversion engines.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-blue-400 font-medium hover:text-blue-300 transition-colors uppercase text-xs tracking-wider"
          >
            Learn More
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="chat-container-fixed group-hover:scale-[1.02] transition-transform duration-700 ease-out">
          <div className="chat-content-stable glass-card rounded-2xl border border-slate-700/50 shadow-2xl overflow-hidden bg-[#0a101d] h-full flex flex-col">
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/5 bg-[#0e1525] flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded bg-black/40 border border-white/10 flex items-center justify-center overflow-hidden">
                  <img
                    src="/android-chrome-512x512.png"
                    alt="Ketly AI"
                    className="w-7 h-7 object-contain"
                  />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">
                    Ketly AI
                  </h4>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[10px] text-slate-400">
                      Always ON · Always responding
                    </span>
                  </div>
                </div>
              </div>
              <MoreHorizontal className="w-4 h-4 text-slate-600" />
            </div>

            <div className="p-6 space-y-6 flex-1 overflow-y-auto">
              {/* AI message 1 */}
              <div className="flex gap-3 items-start justify-start">
                <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center">
                  <img
                    src="/android-chrome-512x512.png"
                    alt="Ketly AI"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="max-w-[75%] rounded-2xl px-4 py-3 bg-zinc-900/40 text-zinc-200 border border-white/5">
                  <p className="text-sm leading-relaxed">
                    Good afternoon! 👋 I&apos;ve analyzed your current traffic
                    and trends.
                  </p>
                </div>
              </div>

              {/* AI message 2 */}
              <div className="flex gap-3 items-start justify-start">
                <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center">
                  <img
                    src="/android-chrome-512x512.png"
                    alt="Ketly AI"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="max-w-[75%] rounded-2xl px-4 py-3 bg-zinc-900/40 text-zinc-200 border border-white/5">
                  <p className="text-sm leading-relaxed">
                    You have 3 new qualified leads from the recent campaign.
                  </p>
                </div>
              </div>

              {/* User message */}
              <div className="flex gap-3 items-start justify-end">
                <div className="max-w-[70%] rounded-2xl px-4 py-3 bg-zinc-800/40 text-white border border-white/10">
                  <p className="text-sm leading-relaxed">
                    Great. Can you schedule a demo with them?
                  </p>
                </div>
              </div>

              {/* System action from AI */}
              <div className="flex gap-3 items-start justify-start">
                <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center">
                  <img
                    src="/android-chrome-512x512.png"
                    alt="Ketly AI"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="max-w-[75%] rounded-2xl px-4 py-4 bg-zinc-900/40 text-zinc-200 border border-white/5">
                  <div className="flex items-center gap-2 mb-3 text-[10px] text-slate-500 uppercase tracking-widest font-bold">
                    <CalendarDays className="w-3.5 h-3.5" />
                    System Action
                  </div>
                  <div className="flex items-center justify-between bg-black/40 p-3 rounded-xl border border-white/5">
                    <span className="text-xs text-slate-300">
                      Invites sent to 3 leads.
                    </span>
                    <CheckCircle2 className="w-4 h-4 text-green-400" />
                  </div>
                </div>
              </div>
            </div>

            <div className="px-6 py-5 border-t border-white/5 bg-[#0e1525] flex-shrink-0">
              <div className="h-11 bg-[#050912] rounded-xl border border-white/5 flex items-center px-4 justify-between">
                <span className="text-xs text-slate-600">Type a message...</span>
                <span className="material-symbols-outlined text-slate-600 text-sm">
                  send
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FashionMockupCard() {
  return (
    <div className="split-section relative flex-1 group overflow-hidden bg-[#F7F3F0] organic-gradient-mask">
      <div className="absolute inset-0 bg-[#F7F3F0] z-0" />
      <div className="absolute inset-0 z-0 opacity-40 mix-blend-multiply">
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAMixx7tlc50jh2EWPgYhrI-tRJcYsE7pT7_3_D_UFsl4kYMvdIXJvdn61ar05jXpb4nRmQqgPirGDvSTlJIGJeqJmcTiUYnLgWg9mb1cmXSDCF1U1hDR2ZhP7Ax1invbU9idCksFmfhhjH82I_y0N_4UOdZZbrVS544_VfDJTqVq3TLVB70aRQTMpCXOtxWfXr-WrHbTt_cTcCRH76_xX6dvnVDsvH6XiYsNJBh971GZvivZR10OPFpdACDlbDH_a-SIHB1QvUeb_o"
          alt="Soft beige silk background"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative h-full flex flex-col justify-center p-8 lg:p-16 z-10">
        <div className="mb-12">
          <div className="w-14 h-14 rounded-full bg-[#EAE2D8] flex items-center justify-center mb-6 shadow-inner ring-1 ring-white/50">
            <Shirt className="w-7 h-7 text-[#5C4D43]" />
          </div>
          <h3 className="text-5xl lg:text-6xl font-fashion font-medium mb-6 text-[#2C2420] leading-tight">
            AI Virtual <br />
            <i className="font-serif text-[#8B7355]">Fitting Rooms</i>
          </h3>
          <p className="text-[#5C4D43] mb-10 max-w-md font-light leading-relaxed text-lg tracking-wide">
            Revolutionize your digital boutique. Offer an elite try-on
            experience that mirrors the luxury of a private showroom.
          </p>
          <a
            href="#contact"
            className="group/link inline-flex items-center gap-4 text-[#2C2420] font-medium hover:text-[#000] transition-colors uppercase text-xs tracking-[0.2em]"
          >
            <span className="border-b border-[#2C2420] pb-1">
              Discover More
            </span>
            <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover/link:opacity-100 -translate-x-2 group-hover/link:translate-x-0 transition-all" />
          </a>
        </div>

        <div className="fashion-mockup group-hover:scale-[1.02] transition-transform duration-1000 ease-out relative">
          <div className="absolute -inset-6 bg-white/20 blur-3xl rounded-full" />
          <div className="relative overflow-hidden rounded-[40px] bg-white shadow-2xl ring-1 ring-black/5">
            <div className="bg-[#faf9f6] h-full flex flex-col">
              <div className="pt-8 pb-4 px-6 flex justify-between items-center bg-white/70 backdrop-blur-md sticky top-0 z-20">
                <Menu className="w-5 h-5 text-[#4a3e38]" />
                <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#2c2420] font-luxury">
                  VOGUE MODE
                </span>
                <div className="relative">
                  <ShoppingBag className="w-5 h-5 text-[#4a3e38]" />
                  <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#2c2420] rounded-full text-[8px] text-white flex items-center justify-center font-serif">
                    1
                  </span>
                </div>
              </div>

              <div className="relative aspect-[4/5] bg-[#f0ebe5] overflow-hidden">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA8FoA1RkqDNQInmmj6MKAiM_yx0oix9X_xTaoYlRFUI0DDQuieX07PJrIMBO5Uu3QphOkE7d2K2dNoI5i4R0T8RuWcq5BuaurrCTZqt1z5h5g6Zu9ER7OT9LiQN_MCF5qd7JgmZtRgsA9PZFFhrRHmszSfJb9RMoMYOG9hzGdCicJOxLeHpXQK5LEplOBS5Em-MKLkIujsjkEUo5FeNCa63AWT0Dst1_NZYj2AfX7fGZlPIkp2t7KHCp5ohJORk-XGmAu_Um5qfHT0"
                  alt="Model wearing royal blue dress"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="pearl-glass py-3.5 px-5 rounded-2xl flex items-center justify-between shadow-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-white border border-[#eaddcf] flex items-center justify-center shadow-sm">
                        <Wand2 className="w-4 h-4 text-[#1e3a8a]" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[11px] font-bold text-[#4a3e38] tracking-wide">
                          AI Color Switch
                        </span>
                        <span className="text-[9px] text-[#1e3a8a] italic font-serif">
                          Royal Blue Applied
                        </span>
                      </div>
                    </div>
                    <Check className="w-5 h-5 text-green-600" />
                  </div>
                </div>
              </div>

              <div className="p-6 bg-white space-y-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-xl font-fashion font-bold text-[#2c2420]">
                      Silk Midnight Dress
                    </h4>
                    <p className="text-[10px] text-[#1e3a8a] tracking-[0.15em] uppercase mt-1 font-bold">
                      Royal Blue Edition
                    </p>
                  </div>
                  <span className="text-xl font-fashion italic text-[#2c2420]">
                    $199
                  </span>
                </div>

                <div className="flex items-center gap-5 border-t border-slate-100 pt-5">
                  <span className="text-[10px] font-bold text-[#8b7355] uppercase tracking-[0.1em]">
                    Fabric Tone
                  </span>
                  <div className="flex gap-3">
                    <button className="w-6 h-6 rounded-full bg-[#1a1a1a] shadow-inner border border-white/20 hover:scale-110 transition-transform" />
                    <button className="w-6 h-6 rounded-full bg-[#1e3a8a] ring-2 ring-offset-2 ring-[#1e3a8a] shadow-lg scale-110 transition-transform" />
                    <button className="w-6 h-6 rounded-full bg-[#7f1d1d] shadow-inner border border-white/20 hover:scale-110 transition-transform" />
                  </div>
                </div>

                <button className="w-full bg-[#2c2420] text-[#fdfaf6] text-xs font-bold py-4.5 rounded-sm uppercase tracking-[0.2em] hover:bg-black transition-all shadow-xl">
                  Add to Bag
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SolutionsSection() {
  return (
    <section
      id="solutions"
      className="min-h-screen flex flex-col lg:flex-row split-container bg-[#050a14]"
    >
      <BusinessAdminCard />
      <FashionMockupCard />
    </section>
  );
}

