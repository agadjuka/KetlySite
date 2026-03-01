import {
  BackgroundScanLines,
  HomeHeader,
  HomeHeroSection,
  ScrollRevealObserver,
  ManifestoSection,
  CoreTechnologiesHeading,
  AutonomousIntelligenceSection,
  DigitalAtelierSection,
  BespokeEngineeringSection,
  HomeFooter,
  CommandBar,
} from '@/components/home';
import { PreloadVirtualTryOnImages } from '@/components/home/virtual-tryon/PreloadVirtualTryOnImages';

export default function Home() {
  return (
    <div className="fixed inset-0 flex flex-col h-[100dvh] w-full overflow-hidden overflow-x-hidden grid-lines font-body antialiased selection:bg-amber-500 selection:text-black lg:static lg:min-h-screen lg:h-auto">
      <PreloadVirtualTryOnImages />
      <BackgroundScanLines />
      <HomeHeader />
      <main className="flex-1 flex flex-col relative min-h-0 overflow-y-auto overflow-x-hidden overscroll-contain touch-pan-y scrollable-content lg:overflow-visible lg:min-h-0">
        <div className="shrink-0 flex flex-col">
          <HomeHeroSection />
          <ManifestoSection />
          <CoreTechnologiesHeading />
          <AutonomousIntelligenceSection />
          <DigitalAtelierSection />
          <BespokeEngineeringSection />
          <HomeFooter />
          <CommandBar />
        </div>
      </main>
      <ScrollRevealObserver />
    </div>
  );
}
