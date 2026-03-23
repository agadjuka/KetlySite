'use client';

import { useState, useRef, useEffect } from 'react';
import { VyonSimulationOutputZone } from './VyonSimulationOutputZone';
import { runTryOn, uploadGarmentFile } from '@/services/vyonService';
import { VyonTryOnInstructionsModal } from './try-on-instructions/VyonTryOnInstructionsModal';
import {
  hasSeenTryOnInstructionsThisSession,
  markTryOnInstructionsSeenThisSession,
} from './try-on-instructions/vyonTryOnInstructionsSession';

const GARMENTS = [
  { image: '/images/Casual_Set.jpg', label: 'Casual Set' },
  { image: '/images/Dress.jpg', label: 'Dress' },
  { image: '/images/Jacket.jpg', label: 'Jacket' },
] as const;
const IMAGE_ACCEPT = 'image/*';

const MOBILE_MAX_WIDTH_PX = 1024;
const OUTPUT_ZONE_CLOSE_DURATION_MS = 450;

/** Пресет: абсолютный URL одежды (контейнер скачивает по нему). */
function getPresetGarmentUrl(path: string): string {
  if (typeof window === 'undefined') return path;
  return window.location.origin + path;
}

export function VyonSimulationSandbox() {
  const [selectedGarment, setSelectedGarment] = useState<number>(0);
  const [photoBiometrics, setPhotoBiometrics] = useState<string | null>(null);
  const [photoGarment, setPhotoGarment] = useState<string | null>(null);
  const [generationStarted, setGenerationStarted] = useState(false);
  const [outputStatus, setOutputStatus] = useState<'rendering' | 'ready' | 'error'>('rendering');
  const [resultImageUrl, setResultImageUrl] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isTryOnInstructionsOpen, setIsTryOnInstructionsOpen] = useState(false);
  const inputBiometricsRef = useRef<HTMLInputElement>(null);
  const inputGarmentRef = useRef<HTMLInputElement>(null);
  const modelFileRef = useRef<File | null>(null);
  const garmentFileRef = useRef<File | null>(null);
  const outputZoneRef = useRef<HTMLDivElement>(null);
  const sandboxRef = useRef<HTMLDivElement>(null);

  const showOutputZone = generationStarted || isClosing;

  const openPhotoPicker = () => inputBiometricsRef.current?.click();
  const handleOpenInstructions = () => {
    if (hasSeenTryOnInstructionsThisSession()) {
      openPhotoPicker();
      return;
    }
    setIsTryOnInstructionsOpen(true);
  };
  const handleCloseInstructions = () => {
    markTryOnInstructionsSeenThisSession();
    setIsTryOnInstructionsOpen(false);
  };
  const handleInstructionsDone = () => {
    markTryOnInstructionsSeenThisSession();
    setIsTryOnInstructionsOpen(false);
    setTimeout(() => openPhotoPicker(), 240);
  };
  const hasGarment = photoGarment !== null || selectedGarment >= 0;

  useEffect(() => {
    return () => {
      if (photoBiometrics) URL.revokeObjectURL(photoBiometrics);
      if (photoGarment) URL.revokeObjectURL(photoGarment);
    };
  }, [photoBiometrics, photoGarment]);

  useEffect(() => {
    if (!showOutputZone || isClosing || typeof window === 'undefined') return;
    if (window.innerWidth >= MOBILE_MAX_WIDTH_PX) return;
    const timer = setTimeout(() => {
      outputZoneRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 350);
    return () => clearTimeout(timer);
  }, [showOutputZone, isClosing]);

  const handleBiometricsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (photoBiometrics) URL.revokeObjectURL(photoBiometrics);
    modelFileRef.current = file;
    setPhotoBiometrics(URL.createObjectURL(file));
    e.target.value = '';
  };

  const handleGarmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (photoGarment) URL.revokeObjectURL(photoGarment);
    garmentFileRef.current = file;
    setPhotoGarment(URL.createObjectURL(file));
    setSelectedGarment(-1);
    e.target.value = '';
  };

  const handleGenerate = async () => {
    const modelFile = modelFileRef.current;
    if (!modelFile || !hasGarment) return;

    let garmentUrl: string;
    if (selectedGarment >= 0) {
      garmentUrl = getPresetGarmentUrl(GARMENTS[selectedGarment].image);
    } else if (garmentFileRef.current) {
      try {
        garmentUrl = await uploadGarmentFile(garmentFileRef.current);
      } catch {
        setGenerationStarted(true);
        setOutputStatus('error');
        setErrorMessage('Не удалось загрузить фото одежды на сервер');
        return;
      }
    } else {
      return;
    }

    setGenerationStarted(true);
    setOutputStatus('rendering');
    setResultImageUrl(null);
    setErrorMessage(null);
    setIsGenerating(true);

    try {
      const url = await runTryOn(modelFile, garmentUrl);
      setOutputStatus('ready');
      setResultImageUrl(url ?? null);
    } catch (err) {
      setOutputStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Ошибка генерации');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleNewTryOn = () => {
    setIsClosing(true);
    setTimeout(() => {
      setGenerationStarted(false);
      setResultImageUrl(null);
      setOutputStatus('rendering');
      setErrorMessage(null);
      setIsClosing(false);
      if (typeof window !== 'undefined' && window.innerWidth < MOBILE_MAX_WIDTH_PX) {
        setTimeout(() => {
          sandboxRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 50);
      }
    }, OUTPUT_ZONE_CLOSE_DURATION_MS);
  };

  return (
    <div
      id="vyon-now-sandbox"
      ref={sandboxRef}
      className="relative w-full max-w-full min-w-0 mx-auto mb-8 lg:mb-12 manifesto-reveal overflow-x-hidden lg:max-w-6xl scroll-mt-24"
      data-scroll-trigger
    >
      <VyonTryOnInstructionsModal
        isOpen={isTryOnInstructionsOpen}
        onClose={handleCloseInstructions}
        onDone={handleInstructionsDone}
      />
      <div className={`relative glass-panel overflow-hidden shadow-[0_0_50px_-10px_rgba(0,0,0,0.5)] min-w-0 rounded-lg border border-accent-gold/20 lg:rounded-xl lg:bg-neutral-900/90 ${showOutputZone ? 'w-full max-w-full lg:border-0' : 'w-fit max-w-full mx-auto lg:border-accent-gold/20'}`}>
        {/* Заголовок внутри карточки */}
        <div className="py-5 flex flex-col items-center justify-center gap-2 border-b border-white/5">
          <div className="flex items-center gap-2">
            <span className="h-px w-12 bg-accent-gold/30" />
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-accent-gold">
              TRY TECHNOLOGY RIGHT NOW
            </span>
            <span className="h-px w-12 bg-accent-gold/30" />
          </div>
        </div>
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
                  <label className="text-[10px] uppercase tracking-widest text-accent-gold block text-center">
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
                    onClick={handleOpenInstructions}
                    className={`dashed-area group relative w-full rounded cursor-pointer transition-all duration-300 overflow-hidden text-left min-h-[300px] lg:min-h-0 lg:aspect-[3/2] ${
                      !photoBiometrics ? 'upload-photo-attention' : 'hover:bg-white/5'
                    }`}
                  >
                    {photoBiometrics ? (
                      <img
                        src={photoBiometrics}
                        alt="Your photo"
                        className="absolute inset-0 w-full h-full object-contain"
                      />
                    ) : (
                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-4 py-6">
                        <span className="material-symbols-outlined text-white font-light text-4xl group-hover:text-accent-gold transition-colors shrink-0">
                          add_a_photo
                        </span>
                        <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/90 group-hover:text-alabaster transition-colors shrink-0">
                          + Upload Your Photo
                        </span>
                      </div>
                    )}
                  </button>
                </div>
                <div className="space-y-3 -mt-4">
                  <label className="text-[10px] uppercase tracking-widest text-accent-gold block text-center">
                    Step 2: Upload or Select Garment
                  </label>
                  <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x lg:overflow-visible lg:pb-0">
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
                      className={`group flex-shrink-0 w-28 snap-start lg:flex-1 lg:min-w-0 lg:max-w-[25%] cursor-pointer text-left transition-opacity ${
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
                            <span className="material-symbols-outlined text-white font-light text-2xl group-hover:text-accent-gold transition-colors">
                              add_a_photo
                            </span>
                            <span className="text-[9px] uppercase tracking-widest text-white/90 group-hover:text-alabaster transition-colors leading-tight">
                              + Upload
                            </span>
                          </div>
                        )}
                        {selectedGarment === -1 && (
                          <div className="absolute bottom-2 left-2 w-2 h-2 bg-accent-gold rounded-full shadow-[0_0_8px_rgba(217,119,6,0.8)]" />
                        )}
                      </div>
                      <p className="text-[9px] font-mono text-alabaster uppercase tracking-wider text-center">
                        Your clothes
                      </p>
                    </button>
                    {GARMENTS.map((item, i) => (
                      <button
                        key={item.label}
                        type="button"
                        onClick={() => setSelectedGarment(i)}
                        className={`flex-shrink-0 w-28 snap-start lg:flex-1 lg:min-w-0 lg:max-w-[25%] group cursor-pointer text-left ${
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
                          <img
                            src={item.image}
                            alt={item.label}
                            className="absolute inset-0 w-full h-full object-cover"
                            onError={(e) => {
                              const target = e.currentTarget;
                              target.style.display = 'none';
                              const fallback = target.nextElementSibling as HTMLElement;
                              if (fallback) fallback.classList.remove('hidden');
                            }}
                          />
                          <div className="absolute inset-0 w-full h-full bg-neutral-700/50 flex items-center justify-center hidden">
                            <span className="material-symbols-outlined text-neutral-500 text-4xl">
                              checkroom
                            </span>
                          </div>
                          {selectedGarment === i && (
                            <div className="absolute bottom-2 left-2 w-2 h-2 bg-accent-gold rounded-full shadow-[0_0_8px_rgba(217,119,6,0.8)]" />
                          )}
                        </div>
                        <p className="text-[9px] font-mono text-alabaster uppercase tracking-wider text-center">
                          {item.label}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {/* Generate Look — только когда загружено фото человека и выбрана/загружена одежда */}
            <div
              className={`overflow-hidden transition-all duration-300 ease-out ${
                photoBiometrics && hasGarment && !showOutputZone
                  ? 'opacity-100 max-h-28 translate-y-0'
                  : 'opacity-0 max-h-0 translate-y-3 pointer-events-none'
              }`}
            >
              <div className="mt-8">
                <button
                  type="button"
                  disabled={isGenerating}
                  onClick={handleGenerate}
                  className="w-full text-xs sm:text-sm font-mono uppercase tracking-widest text-accent-gold/80 hover:text-accent-gold border border-accent-gold/50 hover:border-accent-gold px-5 py-2 sm:px-6 sm:py-2.5 rounded transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isGenerating ? 'Generating…' : 'Generate Look'}
                </button>
              </div>
            </div>
          </div>

          {/* Разделитель — только десктоп; зона вывода — десктоп справа, мобильный снизу */}
          {showOutputZone && (
            <>
              <div className="relative hidden lg:flex flex-col items-center justify-center w-0 z-20">
                <div className="absolute h-[90%] w-[1px] bg-gradient-to-b from-transparent via-accent-gold/60 to-transparent" />
              </div>
              <div ref={outputZoneRef} className="flex flex-1 min-w-0 min-h-0 overflow-hidden w-full scroll-mt-6">
                <div className={`w-full h-full min-w-0 min-h-[280px] lg:min-h-0 ${isClosing ? 'vyon-output-zone-slide-out' : 'vyon-output-zone-slide-in'}`}>
                  <VyonSimulationOutputZone
                    status={outputStatus === 'ready' ? 'ready' : 'rendering'}
                    resultImageUrl={resultImageUrl}
                    errorMessage={outputStatus === 'error' ? errorMessage : null}
                    onNewTryOn={handleNewTryOn}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
