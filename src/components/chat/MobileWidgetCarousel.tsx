'use client';

import { useState } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { ChevronDown, ChevronUp, ChevronLeft, ChevronRight, Database } from 'lucide-react';
import { GoogleSheetEmbed } from '@/app/agents/car-rental/components/GoogleSheetEmbed';
import { cn } from '@/lib/utils';

interface MobileWidgetCarouselProps {
  sheetId: string;
}

export function MobileWidgetCarousel({ sheetId }: MobileWidgetCarouselProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const widgets = [
    { title: 'Car Park', gid: '0' },
    { title: 'Bookings', gid: '337777908' },
    { title: 'Avaiblity', gid: '667953082' }
  ];

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % widgets.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + widgets.length) % widgets.length);
  };

  // Логика свайпа
  const onDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 50; // Минимальное расстояние для свайпа
    if (info.offset.x < -threshold) {
      nextSlide();
    } else if (info.offset.x > threshold) {
      prevSlide();
    }
  };

  return (
    <div className="w-full flex flex-col z-20 border-b border-white/5 bg-zinc-900/60 backdrop-blur-xl md:hidden">
      
      {/* 1. Компактный Хедер (Кнопка открытия) */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 active:bg-white/5 transition-colors"
      >
        <div className="flex items-center gap-2 text-sm font-medium text-white/90">
          <Database size={16} className="text-white" />
          <span>База Данных</span>
        </div>
        {isOpen ? <ChevronUp size={16} className="text-white/50" /> : <ChevronDown size={16} className="text-white/50" />}
      </button>

      {/* 2. Тело карусели */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="px-2 relative"> {/* Минимальный паддинг px-2 */}
              
              {/* Контейнер виджета с пропорцией */}
              <div className="relative w-full aspect-[500/220] bg-black/20 rounded-lg overflow-hidden border border-white/10">
                
                {/* Рендерим все виджеты сразу при открытии, они остаются в памяти */}
                {widgets.map((widget, idx) => (
                  <motion.div
                    key={widget.gid} // Используем gid как ключ для стабильности
                    className={cn(
                      "absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing",
                      idx === activeIndex ? "z-10" : "z-0"
                    )}
                    drag={idx === activeIndex ? "x" : false} // Только активный можно свайпать
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.2} // Эффект резинки
                    onDragEnd={onDragEnd}
                    animate={{
                      opacity: idx === activeIndex ? 1 : 0,
                      x: 0
                    }}
                    transition={{ duration: 0.3 }}
                    style={{
                      pointerEvents: idx === activeIndex ? 'auto' : 'none',
                      visibility: idx === activeIndex ? 'visible' : 'hidden' as any
                    }}
                  >
                    <GoogleSheetEmbed 
                      sheetId={sheetId}
                      gid={widget.gid}
                      scale={0.55} // Чуть меньше, чтобы влезло больше данных
                      className="w-full h-full pointer-events-none" // pointer-events-none важен для работы свайпа поверх iframe!
                      href={`https://docs.google.com/spreadsheets/d/${sheetId}/edit#gid=${widget.gid}`}
                      title={widget.title}
                    />
                  </motion.div>
                ))}

                {/* Навигация (Стрелки поверх) */}
                <button 
                  onClick={(e) => { e.stopPropagation(); prevSlide(); }}
                  className="absolute left-1 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 text-white/70 hover:bg-black/60 backdrop-blur-sm transition-all z-20"
                  aria-label="Предыдущий слайд"
                >
                  <ChevronLeft size={20} />
                </button>

                <button 
                  onClick={(e) => { e.stopPropagation(); nextSlide(); }}
                  className="absolute right-1 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 text-white/70 hover:bg-black/60 backdrop-blur-sm transition-all z-20"
                  aria-label="Следующий слайд"
                >
                  <ChevronRight size={20} />
                </button>

              </div>
            </div>
            
            {/* Индикаторы и кнопка сворачивания снизу */}
            <div className="flex flex-col items-center gap-1 pt-1 pb-2">
              {/* Индикаторы (Точки) */}
              <div className="flex gap-1.5">
                {widgets.map((_, idx) => (
                  <div 
                    key={idx} 
                    className={cn(
                      "w-1.5 h-1.5 rounded-full transition-all",
                      idx === activeIndex ? "bg-white w-3" : "bg-white/40"
                    )} 
                  />
                ))}
              </div>
              
              {/* Кнопка сворачивания */}
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/70 hover:text-white transition-colors"
                aria-label="Свернуть"
              >
                <ChevronUp size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
