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
        <div className="bg-black">
          <HomeFooter />
        </div>
        <CommandBar />
      </main>
      <ScrollRevealObserver />
    </div>
  );
}
