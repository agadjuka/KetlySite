'use client';

import { useState, useRef, useEffect } from 'react';
import { VyonSimulationOutputZone } from './VyonSimulationOutputZone';

const GARMENT_LABELS = ['NECK ROUE', 'WOOL TRENCH', 'PLEATED GOWN'] as const;
const IMAGE_ACCEPT = 'image/*';

export function VyonSimulationSandbox() {
  const [selectedGarment, setSelectedGarment] = useState<number>(0);
  const [photoBiometrics, setPhotoBiometrics] = useState<string | null>(null);
  const [photoGarment, setPhotoGarment] = useState<string | null>(null);
  const [generationStarted, setGenerationStarted] = useState(false);
  const inputBiometricsRef = useRef<HTMLInputElement>(null);
  const inputGarmentRef = useRef<HTMLInputElement>(null);

  const showOutputZone = generationStarted;

  useEffect(() => {
    return () => {
      if (photoBiometrics) URL.revokeObjectURL(photoBiometrics);
      if (photoGarment) URL.revokeObjectURL(photoGarment);
    };
  }, [photoBiometrics, photoGarment]);

  const handleBiometricsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (photoBiometrics) URL.revokeObjectURL(photoBiometrics);
    setPhotoBiometrics(URL.createObjectURL(file));
    e.target.value = '';
  };

  const handleGarmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (photoGarment) URL.revokeObjectURL(photoGarment);
    setPhotoGarment(URL.createObjectURL(file));
    setSelectedGarment(-1);
    e.target.value = '';
  };

  return (
    <div className="relative w-full max-w-full min-w-0 mx-auto mb-8 lg:mb-12 manifesto-reveal overflow-x-hidden lg:max-w-6xl" data-scroll-trigger>
      <div className="absolute -top-12 left-1/2 -translate-x-1/2 flex items-center gap-2">
        <span className="h-px w-12 bg-accent-gold/30" />
        <span className="text-xs font-mono uppercase tracking-[0.3em] text-accent-gold">
          TRY TECHNOLOGY RIGHT NOW
        </span>
        <span className="h-px w-12 bg-accent-gold/30" />
      </div>
      <div className={`relative glass-panel overflow-hidden shadow-[0_0_50px_-10px_rgba(0,0,0,0.5)] min-w-0 rounded-lg border border-accent-gold/20 lg:rounded-xl lg:bg-neutral-900/90 ${showOutputZone ? 'w-full max-w-full lg:border-0' : 'w-fit max-w-full mx-auto lg:border-accent-gold/20'}`}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-accent-amber/5 rounded-full blur-[100px] pointer-events-none" />
        <div
          className={`relative z-10 min-w-0 ${showOutputZone ? 'grid grid-cols-1 lg:grid-cols-[1.5fr_auto_1fr] h-auto' : 'flex justify-center'}`}
        >
          {/* Left: VYON NOW — по центру, когда правой зоны нет */}
          <div
            className={`p-8 lg:p-12 flex flex-col justify-between bg-neutral-900/70 lg:bg-neutral-900/90 border-white/5 min-w-0 overflow-x-hidden w-full ${showOutputZone ? 'border-b lg:border-b-0 lg:border-r' : 'max-w-xl'} ${showOutputZone ? '' : 'mx-auto'}`}
          >
            <div>
              <div className="mb-8">
                <h3 className="text-2xl font-serif-vyon italic text-alabaster">Vyon Now</h3>
              </div>
              <div className="space-y-8">
                <div className="space-y-3">
                  <label className="text-[10px] uppercase tracking-widest text-accent-gold">
                    Step 1: Your Photo
                  </label>
                  <input
                    ref={inputBiometricsRef}
                    type="file"
                    accept={IMAGE_ACCEPT}
                    className="sr-only"
                    aria-label="Upload your photo"
                    onChange={handleBiometricsChange}
                  />
                  <button
                    type="button"
                    onClick={() => inputBiometricsRef.current?.click()}
                    className="dashed-area group relative aspect-[3/2] w-full rounded cursor-pointer hover:bg-white/5 transition-all duration-300 overflow-hidden text-left"
                  >
                    {photoBiometrics ? (
                      <img
                        src={photoBiometrics}
                        alt="Your photo"
                        className="absolute inset-0 w-full h-full object-contain"
                      />
                    ) : (
                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                        <span className="material-symbols-outlined text-neutral-500 font-light text-3xl group-hover:text-accent-gold transition-colors">
                          add_a_photo
                        </span>
                        <span className="text-[10px] uppercase tracking-widest text-neutral-400 group-hover:text-alabaster transition-colors">
                          + Upload Your Photo
                        </span>
                      </div>
                    )}
                  </button>
                </div>
                <div className="space-y-3 -mt-4">
                  <label className="text-[10px] uppercase tracking-widest text-accent-gold block">
                    Step 2: Upload or Select Garment
                  </label>
                  <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x">
                    <input
                      ref={inputGarmentRef}
                      type="file"
                      accept={IMAGE_ACCEPT}
                      className="sr-only"
                      aria-label="Upload garment photo"
                      onChange={handleGarmentChange}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedGarment(-1);
                        inputGarmentRef.current?.click();
                      }}
                      className={`group flex-shrink-0 w-28 snap-start cursor-pointer text-left transition-opacity ${
                        selectedGarment === -1 ? 'opacity-100' : 'opacity-60 hover:opacity-100'
                      }`}
                    >
                      <div
                        className={`aspect-[3/4] rounded overflow-hidden relative mb-2 transition-colors duration-300 ${
                          selectedGarment === -1
                            ? 'border-2 border-accent-gold shadow-[0_0_15px_rgba(191,161,95,0.15)]'
                            : 'dashed-area hover:bg-white/5 border-2 border-transparent'
                        }`}
                      >
                        {photoGarment ? (
                          <img
                            src={photoGarment}
                            alt="Garment photo"
                            className="absolute inset-0 w-full h-full object-contain"
                          />
                        ) : (
                          <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 p-2">
                            <span className="material-symbols-outlined text-neutral-500 font-light text-2xl group-hover:text-accent-gold transition-colors">
                              add_a_photo
                            </span>
                            <span className="text-[9px] uppercase tracking-widest text-neutral-400 group-hover:text-alabaster transition-colors text-center leading-tight">
                              + Upload
                            </span>
                          </div>
                        )}
                        {selectedGarment === -1 && (
                          <div className="absolute bottom-2 left-2 w-2 h-2 bg-accent-gold rounded-full shadow-[0_0_8px_rgba(217,119,6,0.8)]" />
                        )}
                      </div>
                      <p className="text-[9px] text-center font-mono text-alabaster uppercase tracking-wider">
                        Your Photo
                      </p>
                    </button>
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
            {/* Generate Look — только когда загружено фото человека (Step 1) и не идёт обработка; появление/скрытие с анимацией */}
            <div
              className={`overflow-hidden transition-all duration-300 ease-out ${
                photoBiometrics && !showOutputZone
                  ? 'opacity-100 max-h-28 translate-y-0'
                  : 'opacity-0 max-h-0 translate-y-3 pointer-events-none'
              }`}
            >
              <div className="mt-8">
                <button
                  type="button"
                  onClick={() => setGenerationStarted(true)}
                  className="w-full group relative px-8 py-5 bg-gradient-to-r from-accent-gold via-[#d4af37] to-accent-gold text-black text-sm font-bold tracking-[0.25em] uppercase transition-all duration-300 hover:shadow-[0_0_40px_rgba(217,119,6,0.4)] overflow-hidden rounded-sm"
                >
                  <span className="absolute inset-0 w-full h-full bg-white/20 group-hover:translate-x-full transition-transform duration-500 ease-out skew-x-12 -translate-x-full" />
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    Generate Look
                    <span className="material-symbols-outlined text-base">auto_awesome</span>
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Разделитель — только десктоп; зона вывода — десктоп справа, мобильный снизу */}
          {showOutputZone && (
            <>
              <div className="relative hidden lg:flex flex-col items-center justify-center w-0 z-20">
                <div className="absolute h-[90%] w-[1px] bg-gradient-to-b from-transparent via-accent-gold/60 to-transparent" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-20 rounded-full border border-accent-gold bg-black/80 backdrop-blur-md flex flex-col items-center justify-center gap-2 shadow-[0_0_25px_rgba(217,119,6,0.4)] cursor-ew-resize hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-accent-gold text-sm rotate-180">
                    chevron_left
                  </span>
                  <span className="material-symbols-outlined text-accent-gold text-sm">chevron_right</span>
                </div>
              </div>
              <div className="flex flex-1 min-w-0 min-h-0 overflow-hidden w-full">
                <div className="vyon-output-zone-slide-in w-full h-full min-w-0 min-h-[280px] lg:min-h-0">
                  <VyonSimulationOutputZone status="rendering" />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
