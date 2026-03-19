"use client";

import React, { useMemo, useState } from "react";
import { VyonTryOnInstructionsLeftPanel } from "./VyonTryOnInstructionsLeftPanel";
import { VyonMatchRulesCarouselMobile } from "./VyonMatchRulesCarouselMobile";
import { VYON_MATCH_RULES } from "./matchRules";

type Step = "photo" | "match";

export function VyonTryOnInstructionsMobileFlow({
  onDone,
}: {
  onDone: () => void;
}) {
  const [step, setStep] = useState<Step>("photo");
  const rules = useMemo(() => VYON_MATCH_RULES, []);

  if (step === "photo") {
    return (
      <div className="flex flex-col">
        <div className="px-6 py-6">
          <VyonTryOnInstructionsLeftPanel />
        </div>

        <div className="flex items-center justify-center px-6 py-6 border-t border-white/6">
          <button
            type="button"
            onClick={() => setStep("match")}
            className="inline-flex items-center justify-center rounded-lg px-10 py-4 bg-accent-gold text-black font-display text-xs font-bold tracking-[0.2em] uppercase shadow-[0_0_0_1px_rgba(191,161,95,0.25)_inset,0_10px_30px_rgba(0,0,0,0.35)] transition-colors duration-200 hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
          >
            Next
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="px-6 py-6">
        <h2 className="text-xl font-display font-semibold text-alabaster tracking-tight mb-1">
          For a Flawless Result
        </h2>
        <p className="mt-2 text-sm text-neutral-400 leading-relaxed">
          Our AI adapts to any photo. However, for the most realistic visualization, we highly recommend matching your
          clothing length to the item you want to try on.
        </p>

        <div className="mt-6">
          <VyonMatchRulesCarouselMobile rules={rules} />
        </div>
      </div>

      <div className="flex items-center justify-center px-6 py-6 border-t border-white/6">
        <button
          type="button"
          onClick={onDone}
          className="inline-flex items-center justify-center rounded-lg px-10 py-4 bg-accent-gold text-black font-display text-xs font-bold tracking-[0.2em] uppercase shadow-[0_0_0_1px_rgba(191,161,95,0.25)_inset,0_10px_30px_rgba(0,0,0,0.35)] transition-colors duration-200 hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
        >
          Got it!
        </button>
      </div>
    </div>
  );
}

