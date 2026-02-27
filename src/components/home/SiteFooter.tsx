import { Mail, Globe, Brain } from 'lucide-react';

export function SiteFooter() {
  return (
    <footer
      id="contact"
      className="bg-[#02040a] border-t border-white/5 py-16"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10 mb-16">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-blue-700 rounded flex items-center justify-center">
                <Brain className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold text-white font-heading tracking-tight">
                KETLY AI
              </span>
            </div>
            <p className="text-slate-500 text-sm max-w-xs leading-relaxed">
              Intelligent automation for the modern enterprise. Built for scale,
              designed for humans.
            </p>
          </div>

          <div className="flex gap-4">
            <a
              href="#"
              className="w-11 h-11 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-all"
            >
              <Mail className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="w-11 h-11 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-all"
            >
              <Globe className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 text-sm text-slate-600">
          <p>© 2024 Ketly AI Pte. Ltd. Engineered in Singapore.</p>
          <div className="flex gap-8 mt-4 md:mt-0">
            <a href="#" className="hover:text-blue-400 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-blue-400 transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

