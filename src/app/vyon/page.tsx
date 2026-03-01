import { HomeHeader } from '@/components/home';
import { ScrollRevealObserver } from '@/components/home/ScrollRevealObserver';
import { BackgroundScanLines } from '@/components/home/BackgroundScanLines';
import { HomeFooter, CommandBar } from '@/components/home';
import {
  VyonHeroSection,
  VyonFeaturesSection,
  VyonSimulationSandbox,
  VyonCompleteLooksSection,
  VyonEcosystemSection,
  VyonCtaSection,
} from '@/components/vyon';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'VYON: The AI Fitting Room | Ketly AI',
  description:
    'Eliminate return rates and boost AOV. Seamless AI try-on infrastructure for high-end fashion e-commerce.',
};

export default function VyonPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col grid-lines vyon-mesh-bg font-body antialiased overflow-x-hidden selection:bg-accent-gold selection:text-black">
      <BackgroundScanLines />
      <HomeHeader />
      <main className="flex-1 flex flex-col relative">
        <section className="relative min-h-0">
          <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 hidden md:block">
            <div className="absolute w-[1px] h-full bg-gradient-to-b from-transparent via-white/5 to-transparent left-[20%] top-0 animate-scan-v" />
            <div className="absolute h-[1px] w-full bg-gradient-to-r from-transparent via-white/5 to-transparent top-[30%] left-0 animate-scan-h" />
            <div
              className="absolute w-[1px] h-full bg-gradient-to-b from-transparent via-white/5 to-transparent left-[70%] top-0 animate-scan-v"
              style={{ animationDelay: '4s' }}
            />
          </div>
          <VyonHeroSection />
        </section>
        <section id="manifesto-section" className="relative py-24 px-6 md:px-12 max-w-[1600px] mx-auto">
          <VyonFeaturesSection />
          <VyonSimulationSandbox />
        </section>
        <section className="relative px-6 md:px-12 max-w-[1600px] mx-auto">
          <VyonCompleteLooksSection />
        </section>
        <section className="relative px-6 md:px-12 max-w-[1600px] mx-auto">
          <VyonEcosystemSection />
        </section>
        <section className="relative px-6 md:px-12">
          <VyonCtaSection />
        </section>
        <div className="bg-black">
          <HomeFooter />
        </div>
        <CommandBar />
      </main>
      <ScrollRevealObserver />
    </div>
  );
}
