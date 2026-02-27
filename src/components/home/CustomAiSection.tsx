import { CheckCircle2 } from 'lucide-react';

export function CustomAiSection() {
  return (
    <section
      id="custom"
      className="py-24 bg-[#02040a] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        <div className="relative z-10">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight text-white">
            Need Something Specific? <br />
            <span className="text-gradient-blue">
              Let&apos;s Automate Your Routine.
            </span>
          </h2>
          <p className="text-slate-400 text-lg mb-8 leading-relaxed font-light">
            Didn&apos;t find a ready-made product for your niche? Tell us about
            your daily bottlenecks. We provide custom AI integration services to
            simplify your workflow.
          </p>
          <ul className="space-y-4 mb-10">
            <li className="flex items-center gap-3 text-slate-300 font-light">
              <CheckCircle2 className="w-5 h-5 text-blue-500" />
              Custom Workflow Analysis
            </li>
            <li className="flex items-center gap-3 text-slate-300 font-light">
              <CheckCircle2 className="w-5 h-5 text-blue-500" />
              Tailored Neural Models
            </li>
          </ul>
          <a
            href="#contact"
            className="inline-block px-8 py-4 bg-blue-700 hover:bg-blue-600 text-white rounded-full font-semibold transition-all shadow-lg shadow-blue-900/20"
          >
            Get a Free Consultation
          </a>
        </div>

        <div className="relative">
          <div className="glass-panel rounded-3xl p-8 border border-white/10 relative overflow-hidden">
            <h3 className="text-xl font-semibold mb-6 text-white border-b border-white/5 pb-4">
              Recent Custom Requests
            </h3>
            <div className="space-y-4">
              <div className="bg-slate-800/40 p-5 rounded-2xl border border-white/5">
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2 py-0.5 rounded bg-blue-500/10 text-[9px] font-bold text-blue-400 uppercase tracking-widest">
                    FINTECH
                  </span>
                  <span className="text-[10px] text-slate-500 italic">
                    Verified
                  </span>
                </div>
                <p className="text-sm text-slate-300 italic">
                  &quot;AI to parse 500+ daily PDF invoices and update our SQL
                  database...&quot;
                </p>
              </div>

              <div className="bg-slate-800/40 p-5 rounded-2xl border border-white/5">
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2 py-0.5 rounded bg-purple-500/10 text-[9px] font-bold text-purple-400 uppercase tracking-widest">
                    REAL ESTATE
                  </span>
                  <span className="text-[10px] text-slate-500 italic">
                    Verified
                  </span>
                </div>
                <p className="text-sm text-slate-300 italic">
                  &quot;Chatbot that schedules viewings and pre-qualifies
                  tenants...&quot;
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

