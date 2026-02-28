import {
  BackgroundScanLines,
  HomeHeader,
  HomeHeroSection,
  ManifestoRevealObserver,
  ManifestoSection,
  AutonomousIntelligenceSection,
  DigitalAtelierSection,
  BespokeEngineeringSection,
  HomeFooter,
  CommandBar,
} from '@/components/home';

export default function Home() {
  return (
    <div className="relative flex min-h-screen w-full flex-col grid-lines font-body antialiased overflow-x-hidden selection:bg-amber-500 selection:text-black">
      <BackgroundScanLines />
      <HomeHeader />
      <main className="flex-1 flex flex-col relative">
        <HomeHeroSection />
        <ManifestoSection />
        <AutonomousIntelligenceSection />
        <DigitalAtelierSection />
        <BespokeEngineeringSection />
        <HomeFooter />
        <CommandBar />
      </main>
      <ManifestoRevealObserver />
    </div>
  );
}
