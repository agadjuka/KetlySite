import Link from "next/link";
import { clsx } from "clsx";

import { HomeHeader, HomeFooter, CommandBar } from "@/components/home";
import { ScrollRevealObserver } from "@/components/home/ScrollRevealObserver";
import type { PrivacyDoc } from "@/content/vyon-privacy";

type VyonPrivacyPageProps = {
  locale: "en" | "ru";
  doc: PrivacyDoc;
};

export function VyonPrivacyPage({ locale, doc }: VyonPrivacyPageProps) {
  const htmlLang = locale === "ru" ? "ru" : "en";

  return (
    <div className="relative flex min-h-screen w-full max-w-full flex-col grid-lines vyon-mesh-bg font-body antialiased overflow-x-hidden selection:bg-accent-gold selection:text-black">
      <HomeHeader hideNav />
      <main className="flex-1 flex flex-col relative min-w-0 overflow-x-hidden pt-24 md:pt-28">
        <section className="relative px-6 md:px-12 w-full max-w-[860px] mx-auto pb-16 md:pb-24">
          <div
            className="rounded-2xl md:rounded-3xl border border-white/[0.09] bg-[#070707]/75 backdrop-blur-xl shadow-[0_28px_90px_-20px_rgba(0,0,0,0.75),inset_0_1px_0_0_rgba(255,255,255,0.06)] ring-1 ring-white/[0.03] px-5 py-8 sm:px-8 sm:py-10 md:px-11 md:py-12"
          >
          <nav
            aria-label="Breadcrumb"
            className="mb-8 text-[11px] md:text-xs text-neutral-500 font-mono uppercase tracking-[0.18em]"
          >
            <ol className="flex flex-wrap items-center gap-1.5">
              <li>
                <Link
                  href="/"
                  className="hover:text-accent-gold transition-colors duration-300"
                >
                  {doc.breadcrumbHome}
                </Link>
              </li>
              <li className="text-neutral-600" aria-hidden>
                /
              </li>
              <li>
                <Link
                  href="/vyon"
                  className="hover:text-accent-gold transition-colors duration-300"
                >
                  {doc.breadcrumbVyon}
                </Link>
              </li>
              <li className="text-neutral-600" aria-hidden>
                /
              </li>
              <li className="text-neutral-400 max-w-[min(100%,12rem)] truncate md:max-w-none">
                {doc.breadcrumbCurrent}
              </li>
            </ol>
          </nav>

          <header className="mb-10 md:mb-12">
            <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between md:gap-8">
              <div className="min-w-0 flex-1">
                <h1 className="font-serif-vyon text-3xl md:text-4xl lg:text-[2.75rem] font-light leading-[1.15] tracking-tight text-alabaster mb-4">
                  {doc.pageTitle}
                </h1>
                <p className="font-mono text-[10px] md:text-xs uppercase tracking-[0.22em] text-accent-gold/85">
                  {doc.effectiveDateLabel}:{" "}
                  <span className="text-neutral-300 normal-case tracking-normal font-body text-sm md:text-base">
                    {doc.effectiveDate}
                  </span>
                </p>
              </div>

              <div
                className="shrink-0 flex flex-col items-stretch sm:items-end gap-2"
                role="group"
                aria-label={locale === "en" ? "Language" : "Язык"}
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-500 sm:text-right">
                  {locale === "en" ? "Language" : "Язык"}
                </span>
                <div className="inline-flex rounded-full border border-white/10 bg-black/50 p-1 backdrop-blur-md shadow-[0_0_0_1px_rgba(191,161,95,0.06)]">
                  <Link
                    href="/vyon-privacy"
                    className={clsx(
                      "rounded-full px-4 py-2 text-xs font-medium tracking-wide transition-all duration-300 min-w-[5.5rem] text-center",
                      locale === "en"
                        ? "bg-accent-gold/15 text-accent-gold shadow-[inset_0_0_0_1px_rgba(191,161,95,0.35)]"
                        : "text-neutral-500 hover:text-neutral-200 hover:bg-white/[0.04]"
                    )}
                    hrefLang="en"
                  >
                    {doc.langSwitcherEn}
                  </Link>
                  <Link
                    href="/vyon-privacy-ru"
                    className={clsx(
                      "rounded-full px-4 py-2 text-xs font-medium tracking-wide transition-all duration-300 min-w-[5.5rem] text-center",
                      locale === "ru"
                        ? "bg-accent-gold/15 text-accent-gold shadow-[inset_0_0_0_1px_rgba(191,161,95,0.35)]"
                        : "text-neutral-500 hover:text-neutral-200 hover:bg-white/[0.04]"
                    )}
                    hrefLang="ru"
                  >
                    {doc.langSwitcherRu}
                  </Link>
                </div>
              </div>
            </div>
          </header>

          <article
            lang={htmlLang}
            className="border-t border-white/[0.08] pt-10 md:pt-12"
          >
            <div className="space-y-10 md:space-y-12">
              {doc.sections.map((section) => (
                <section key={section.title} className="scroll-mt-28">
                  <h2 className="font-display text-lg md:text-xl font-medium text-white mb-4 md:mb-5 tracking-tight">
                    {section.title}
                  </h2>
                  <div className="space-y-4">
                    {section.blocks.map((block, i) => {
                      if (block.kind === "paragraph") {
                        return (
                          <p
                            key={`${section.title}-p-${i}`}
                            className="text-sm md:text-[15px] text-neutral-400 leading-[1.75] text-pretty"
                          >
                            {block.text}
                          </p>
                        );
                      }
                      return (
                        <div
                          key={`${section.title}-ul-${i}`}
                          className="rounded-xl border border-white/[0.06] bg-white/[0.02] px-5 py-4 md:px-6 md:py-5"
                        >
                          <ul className="list-disc pl-4 md:pl-5 space-y-2.5 text-sm md:text-[15px] text-neutral-300 leading-[1.7] marker:text-accent-gold/60">
                            {block.items.map((item) => (
                              <li key={item} className="pl-1">
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      );
                    })}
                  </div>
                </section>
              ))}
            </div>
          </article>

          <aside className="mt-14 md:mt-16 pt-8 border-t border-white/[0.08]">
            <p className="text-xs font-mono uppercase tracking-[0.18em] text-neutral-500 mb-2">
              VYON by Ketly
            </p>
            <p className="text-sm text-neutral-400 leading-relaxed max-w-md">
              {locale === "en"
                ? "Questions about this policy or your data: contact@ketly.app"
                : "Вопросы по политике или вашим данным: contact@ketly.app"}
            </p>
          </aside>
          </div>
        </section>

        <div className="bg-black mt-auto">
          <HomeFooter />
        </div>
        <CommandBar />
      </main>
      <ScrollRevealObserver />
    </div>
  );
}
