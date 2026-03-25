import { HomeHeader, HomeFooter, CommandBar } from "@/components/home";
import { ArTableExperience } from "@/components/ar/ArTableExperience";

export default function ArTablePage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col grid-lines vyon-mesh-bg font-body antialiased overflow-x-hidden selection:bg-accent-gold selection:text-black">
      <HomeHeader hideNav />
      <main className="flex-1 pt-[96px] pb-16 px-4 sm:px-6 md:px-8 w-full">
        <ArTableExperience />
      </main>
      <div className="bg-black">
        <HomeFooter />
      </div>
      <CommandBar />
    </div>
  );
}

