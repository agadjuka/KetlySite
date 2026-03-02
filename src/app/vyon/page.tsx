import { HomeHeader } from '@/components/home';
import { ScrollRevealObserver } from '@/components/home/ScrollRevealObserver';
import { HomeFooter, CommandBar } from '@/components/home';
import {
  VyonHeroSection,
  VyonFeaturesSection,
  VyonSimulationSandbox,
  VyonCompleteLooksSection,
  VyonShopifySection,
  VyonEconomicsSection,
  VyonCtaSection,
  VyonImagePreloader,
} from '@/components/vyon';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'VYON: The AI Fitting Room | Ketly AI',
  description:
    'Eliminate return rates and boost AOV. Seamless AI try-on infrastructure for high-end fashion e-commerce.',
};

export default function VyonPage() {
  return (
    <div className="relative flex min-h-screen w-full max-w-full flex-col grid-lines vyon-mesh-bg font-body antialiased overflow-x-hidden selection:bg-accent-gold selection:text-black">
      <VyonImagePreloader />
      <HomeHeader hideNav />
      <main className="flex-1 flex flex-col relative min-w-0 overflow-x-hidden">
        <section className="relative min-h-0">
          <VyonHeroSection />
        </section>
        <section id="manifesto-section" className="relative py-24 px-6 md:px-12 w-full max-w-[1600px] mx-auto overflow-x-hidden min-w-0">
          <VyonFeaturesSection />
          <VyonSimulationSandbox />
        </section>
        <section className="relative px-6 md:px-12 max-w-[1600px] mx-auto">
          <VyonCompleteLooksSection />
        </section>
        <section className="relative px-6 md:px-12 max-w-[1600px] mx-auto">
          <VyonShopifySection />
        </section>
        <section className="relative px-6 md:px-12 max-w-[1600px] mx-auto">
          <VyonEconomicsSection />
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
