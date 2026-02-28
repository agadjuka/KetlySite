import { VIRTUAL_TRYON_IMG_CATALOG, VIRTUAL_TRYON_IMG_LIVE } from './constants';

export function VirtualTryOnPanel() {
  return (
    <div className="relative w-full aspect-[4/5] bg-neutral-900 overflow-hidden border border-neutral-800 group">
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-700"
        style={{
          backgroundImage: `url('${VIRTUAL_TRYON_IMG_CATALOG}')`,
          filter: 'grayscale(100%) contrast(1.1)',
        }}
      />
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-700 clip-path-inset"
        style={{ backgroundImage: `url('${VIRTUAL_TRYON_IMG_LIVE}')` }}
      >
        <div className="absolute right-0 top-0 bottom-0 w-[1px] bg-amber-500/80 shadow-[0_0_15px_rgba(217,119,6,0.6)]">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-8 bg-black border border-amber-500 rounded-full flex items-center justify-center backdrop-blur-sm z-20 cursor-ew-resize">
            <span className="material-symbols-outlined text-amber-500 text-sm">compare_arrows</span>
          </div>
        </div>
      </div>
      <div className="absolute top-8 left-8">
        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/60 bg-black/40 px-3 py-1 backdrop-blur-sm border border-white/10">
          Catalog Item
        </span>
      </div>
      <div className="absolute top-8 right-8">
        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-amber-500 bg-black/40 px-3 py-1 backdrop-blur-sm border border-amber-500/30">
          Live Simulation
        </span>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black via-black/80 to-transparent">
        <div className="flex justify-between items-end">
          <div>
            <p className="text-xs text-neutral-400 font-mono mb-2">FABRIC_PHYSICS_ENGINE_V2</p>
            <div className="flex gap-4">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] text-neutral-600 uppercase">Drape</span>
                <div className="w-16 h-0.5 bg-neutral-800 rounded-full overflow-hidden">
                  <div className="h-full w-[94%] bg-amber-500" />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] text-neutral-600 uppercase">Light</span>
                <div className="w-16 h-0.5 bg-neutral-800 rounded-full overflow-hidden">
                  <div className="h-full w-[88%] bg-amber-500" />
                </div>
              </div>
            </div>
          </div>
          <div className="animate-pulse">
            <span className="material-symbols-outlined text-amber-500">view_in_ar</span>
          </div>
        </div>
      </div>
    </div>
  );
}
