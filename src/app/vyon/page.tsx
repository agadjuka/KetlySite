import Link from "next/link";
import { HomeHeader } from '@/components/home';
import { ScrollRevealObserver } from '@/components/home/ScrollRevealObserver';
import { HomeFooter, CommandBar } from '@/components/home';
import {
  VyonHeroSection,
  VyonFeaturesSection,
  VyonSimulationSandbox,
  VyonCompleteLooksSection,
  VyonShopifySection,
  VyonProofOfConceptSection,
  VyonEconomicsSection,
  VyonCtaSection,
  VyonImagePreloader,
} from '@/components/vyon';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Virtual Try-On Software for Shopify & Fashion Brands | VYON",
  description:
    "Eliminate return rates and boost AOV. Seamless AI try-on infrastructure for high-end fashion e-commerce.",
  alternates: {
    canonical: "/vyon",
  },
  openGraph: {
    type: "website",
    url: "https://www.ketly.app/vyon",
    title: "AI Virtual Try-On Software for Shopify & Fashion Brands | VYON",
    description:
      "Eliminate return rates and boost AOV. Seamless AI try-on infrastructure for high-end fashion e-commerce.",
    siteName: "Ketly",
    images: [
      {
        url: "https://www.ketly.app/android-chrome-512x512.png",
        width: 512,
        height: 512,
        alt: "VYON by Ketly",
      },
    ],
  },
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
          <VyonProofOfConceptSection />
        </section>
        <section className="relative px-6 md:px-12 max-w-[1600px] mx-auto">
          <VyonEconomicsSection />
        </section>
        <section className="relative px-6 md:px-12">
          <VyonCtaSection />
        </section>
        <section className="relative px-6 md:px-12 max-w-[1600px] mx-auto py-16">
          <div className="border border-white/10 rounded-2xl p-6 md:p-8 bg-white/[0.02]">
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-neutral-500 mb-3">
              Deep dive
            </p>
            <h2 className="text-xl md:text-2xl font-display text-white mb-3">
              How a Shopify virtual try-on app transforms your product pages
            </h2>
            <p className="text-sm md:text-base text-neutral-300 mb-5 max-w-2xl">
              Explore the full breakdown of the VYON virtual fitting room for
              Shopify: impact on return rates, integration model, and what
              changes in your customer journey.
            </p>
            <Link
              href="/use-cases/shopify-virtual-try-on-app"
              className="inline-flex items-center px-5 py-2.5 rounded-full bg-amber-500 text-black text-sm font-medium hover:bg-amber-400 transition-colors"
            >
              Read the Shopify virtual try-on case
            </Link>
          </div>
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
