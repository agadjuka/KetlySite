import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { HomeHeader, HomeFooter, CommandBar } from "@/components/home";
import { ScrollRevealObserver } from "@/components/home/ScrollRevealObserver";
import { findUseCaseBySlug } from "@/content/useCases";

type UseCasePageParams = {
  slug: string;
};

type UseCasePageProps = {
  params: Promise<UseCasePageParams> | UseCasePageParams;
};

export async function generateMetadata(
  { params }: UseCasePageProps
): Promise<Metadata> {
  const resolvedParams =
    params instanceof Promise ? await params : (params as UseCasePageParams);

  const article = findUseCaseBySlug(resolvedParams.slug);

  if (!article) {
    return {};
  }

  return {
    title: article.metaTitle,
    description: article.metaDescription,
    alternates: {
      canonical: `/use-cases/${article.slug}`,
    },
    openGraph: {
      type: "article",
      title: article.metaTitle,
      description: article.metaDescription,
      url: `https://www.ketly.app/use-cases/${article.slug}`,
    },
  };
}

export default async function UseCasePage({ params }: UseCasePageProps) {
  const resolvedParams =
    params instanceof Promise ? await params : (params as UseCasePageParams);

  const article = findUseCaseBySlug(resolvedParams.slug);

  if (!article) {
    notFound();
  }

  return (
    <div className="relative flex min-h-screen w-full max-w-full flex-col grid-lines font-body antialiased overflow-x-hidden selection:bg-amber-500 selection:text-black">
      <HomeHeader />
      <main className="flex-1 flex flex-col relative min-w-0 overflow-x-hidden">
        <section className="relative py-16 px-6 md:px-12 w-full max-w-[1200px] mx-auto">
          <nav
            aria-label="Breadcrumb"
            className="mb-6 text-xs md:text-sm text-neutral-500 font-mono uppercase tracking-[0.18em]"
          >
            <ol className="flex flex-wrap items-center gap-1">
              <li>
                <Link
                  href="/"
                  className="hover:text-amber-400 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li className="text-neutral-600">/</li>
              <li>
                <Link
                  href="/#use-cases"
                  className="hover:text-amber-400 transition-colors"
                >
                  Use Cases
                </Link>
              </li>
              <li className="text-neutral-600">/</li>
              <li className="text-neutral-400">{article.title}</li>
            </ol>
          </nav>

          <header className="mb-10">
            <h1 className="text-3xl md:text-5xl font-display tracking-tight text-white mb-4">
              {article.title}
            </h1>
            <p className="text-base md:text-lg text-neutral-300 max-w-2xl">
              {article.lead}
            </p>
          </header>

          <div className="space-y-12">
            {article.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-xl md:text-2xl font-display text-white mb-4">
                  {section.heading}
                </h2>
                <p className="text-sm md:text-base text-neutral-300 leading-relaxed mb-4">
                  {section.body}
                </p>
                {section.listItems && section.listItems.length > 0 && (
                  <div className="bg-white/[0.03] border border-white/5 rounded-xl p-4 md:p-6">
                    {section.listTitle && (
                      <p className="text-xs md:text-sm font-mono uppercase tracking-[0.18em] text-amber-400 mb-3">
                        {section.listTitle}
                      </p>
                    )}
                    <ul className="list-disc list-inside space-y-2 text-sm md:text-base text-neutral-200">
                      {section.listItems.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </section>
            ))}
          </div>

          <aside className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <p className="text-xs font-mono uppercase tracking-[0.18em] text-neutral-500 mb-2">
                Explore Ketly infrastructure
              </p>
              <p className="text-sm text-neutral-300 max-w-md">
                Connect this use case with real infrastructure: virtual try-on
                for fashion brands or fully bespoke AI ecosystems for your
                operations.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/vyon"
                className="px-5 py-2.5 rounded-full bg-amber-500 text-black text-sm font-medium hover:bg-amber-400 transition-colors"
              >
                Discover VYON
              </Link>
              <Link
                href="/#request-custom-architecture"
                className="px-5 py-2.5 rounded-full border border-white/15 text-sm text-white hover:border-amber-400 hover:text-amber-300 transition-colors"
              >
                Request Custom Architecture
              </Link>
            </div>
          </aside>
        </section>
        <HomeFooter />
        <CommandBar />
      </main>
      <ScrollRevealObserver />
    </div>
  );
}

