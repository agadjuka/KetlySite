import {
  MainHeader,
  HeroSection,
  SolutionsSection,
  CustomAiSection,
  SiteFooter,
} from '@/components/home';

export default function Home() {
  return (
    <main className="bg-[#02040a] text-white antialiased selection:bg-blue-600 selection:text-white">
      <MainHeader />
      <HeroSection />
      <SolutionsSection />
      <CustomAiSection />
      <SiteFooter />
    </main>
  );
}
