"use client";

import React from "react";

export function ArTableExperience() {
  const openAr = () => {
    window.location.href = "/ar-experience/index.html";
  };

  return (
    <section className="flex flex-col items-center justify-center min-h-[calc(100dvh-180px)] gap-8 px-4 text-center">
      <div className="max-w-[560px] flex flex-col gap-3">
        <h1 className="text-white text-3xl sm:text-4xl font-bold tracking-tight">
          3D на вашем столе
        </h1>
        <p className="text-white/60 text-sm sm:text-base leading-relaxed">
          Откройте камеру и наведите на любую горизонтальную поверхность —
          AR-движок разместит модель прямо в вашем пространстве.
        </p>
      </div>

      <button
        type="button"
        onClick={openAr}
        className="px-7 py-3.5 rounded-xl bg-amber-400 text-black font-semibold text-base hover:bg-amber-300 active:scale-95 transition-all"
      >
        Открыть камеру
      </button>

      <p className="text-white/25 text-xs">
        Требуется разрешение камеры · Только мобильные устройства
      </p>
    </section>
  );
}
