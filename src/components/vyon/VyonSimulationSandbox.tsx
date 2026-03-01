'use client';

import { useState } from 'react';

const GARMENT_LABELS = ['NECK ROUE', 'WOOL TRENCH', 'PLEATED GOWN'] as const;

export function VyonSimulationSandbox() {
  const [selectedGarment, setSelectedGarment] = useState(0);

  return (
    <div className="relative w-full max-w-6xl mx-auto mb-40 manifesto-reveal" data-scroll-trigger>
      <div className="absolute -top-12 left-1/2 -translate-x-1/2 flex items-center gap-2">
        <span className="h-px w-12 bg-accent-gold/30" />
        <span className="text-xs font-mono uppercase tracking-[0.3em] text-accent-gold">
          Simulation Sandbox
        </span>
        <span className="h-px w-12 bg-accent-gold/30" />
      </div>
      <div className="relative glass-panel rounded-lg overflow-hidden border border-accent-gold/20 shadow-[0_0_50px_-10px_rgba(0,0,0,0.5)]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-accent-amber/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] h-auto lg:h-[700px]">
          {/* Left: Input Variables */}
          <div className="p-8 lg:p-12 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/5 bg-neutral-900/40">
            <div>
              <div className="flex justify-between items-end mb-8">
                <h3 className="text-2xl font-serif-vyon italic text-alabaster">Input Variables</h3>
                <p className="text-[10px] font-mono text-neutral-500">[ STEP_01: DEFINITION ]</p>
              </div>
              <div className="space-y-8">
                <div className="space-y-3">
                  <label className="text-[10px] uppercase tracking-widest text-accent-gold">
                    Step 1: Your Biometrics
                  </label>
                  <div className="dashed-area group relative aspect-[3/2] w-full rounded cursor-pointer hover:bg-white/5 transition-all duration-300">
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                      <span className="material-symbols-outlined text-neutral-500 font-light text-3xl group-hover:text-accent-gold transition-colors">
                        add_a_photo
                      </span>
                      <span className="text-[10px] uppercase tracking-widest text-neutral-400 group-hover:text-alabaster transition-colors">
                        + Upload Your Photo
                      </span>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <label className="text-[10px] uppercase tracking-widest text-accent-gold">
                      Step 2: Select Garment
                    </label>
                    <span className="text-[9px] font-mono text-neutral-600">[ SEASON_24_FW ]</span>
                  </div>
                  <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x">
                    {GARMENT_LABELS.map((label, i) => (
                      <button
                        key={label}
                        type="button"
                        onClick={() => setSelectedGarment(i)}
                        className={`flex-shrink-0 w-28 snap-start group cursor-pointer text-left ${
                          selectedGarment === i ? 'opacity-100' : 'opacity-60 hover:opacity-100'
                        } transition-opacity`}
                      >
                        <div
                          className={`aspect-[3/4] rounded border bg-neutral-800 overflow-hidden relative mb-2 transition-colors duration-300 ${
                            selectedGarment === i
                              ? 'border-accent-gold shadow-[0_0_15px_rgba(191,161,95,0.15)]'
                              : 'border-white/10 group-hover:border-accent-gold/40'
                          }`}
                        >
                          <div className="w-full h-full bg-neutral-700/50 flex items-center justify-center">
                            <span className="material-symbols-outlined text-neutral-500 text-4xl">
                              checkroom
                            </span>
                          </div>
                          {selectedGarment === i && (
                            <div className="absolute bottom-2 left-2 w-2 h-2 bg-accent-gold rounded-full shadow-[0_0_8px_rgba(217,119,6,0.8)]" />
                          )}
                        </div>
                        <p className="text-[9px] text-center font-mono text-alabaster uppercase tracking-wider">
                          {label}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <button
                type="button"
                className="w-full group relative px-8 py-5 bg-gradient-to-r from-accent-gold via-[#d4af37] to-accent-gold text-black font-display text-sm font-bold tracking-[0.25em] uppercase transition-all duration-300 hover:shadow-[0_0_40px_rgba(217,119,6,0.4)] overflow-hidden rounded-sm"
              >
                <span className="absolute inset-0 w-full h-full bg-white/20 group-hover:translate-x-full transition-transform duration-500 ease-out skew-x-12 -translate-x-full" />
                <span className="relative z-10 flex items-center justify-center gap-3">
                  Generate Look
                  <span className="material-symbols-outlined text-base">auto_awesome</span>
                </span>
              </button>
            </div>
          </div>

          {/* Center: divider with handle */}
          <div className="relative hidden lg:flex flex-col items-center justify-center w-0 z-20">
            <div className="absolute h-[90%] w-[1px] bg-gradient-to-b from-transparent via-accent-gold/60 to-transparent" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-20 rounded-full border border-accent-gold bg-black/80 backdrop-blur-md flex flex-col items-center justify-center gap-2 shadow-[0_0_25px_rgba(217,119,6,0.4)] cursor-ew-resize hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-accent-gold text-sm rotate-180">
                chevron_left
              </span>
              <span className="material-symbols-outlined text-accent-gold text-sm">chevron_right</span>
            </div>
          </div>

          {/* Right: Result placeholder (no image) */}
          <div className="relative bg-black overflow-hidden group border-t lg:border-t-0 lg:border-l border-white/5">
            <div className="absolute inset-0 z-0 flex items-center justify-center bg-neutral-900">
              <span className="material-symbols-outlined text-neutral-600 text-6xl">image</span>
            </div>
            <div className="absolute top-6 right-6 z-20">
              <div className="flex items-center gap-2 bg-black/60 backdrop-blur border border-accent-gold/20 px-3 py-1 rounded-full">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                <span className="text-[9px] font-mono text-accent-gold uppercase tracking-wider">
                  Live Render
                </span>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black via-black/80 to-transparent z-10">
              <div className="flex justify-between items-end">
                <div>
                  <p className="font-serif-vyon italic text-2xl text-alabaster mb-1">AI Result</p>
                  <div className="flex items-center gap-4 text-[9px] font-mono text-neutral-400">
                    <span>CONFIDENCE: —</span>
                    <span className="text-accent-gold">● LIGHTING MATCHED</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
