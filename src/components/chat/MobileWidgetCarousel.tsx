'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { ChevronDown, ChevronUp, ChevronLeft, ChevronRight, Database } from 'lucide-react';
import { GoogleSheetEmbed, carRentalConfig } from '@/modules/car-rental';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/context/LanguageContext';

interface MobileWidgetCarouselProps {
  sheetId: string;
}

export function MobileWidgetCarousel({ sheetId }: MobileWidgetCarouselProps) {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isGlowing, setIsGlowing] = useState(false);

  // Слушаем событие для открытия шторки из тура
  useEffect(() => {
    const handleTourOpen = () => {
      setIsOpen(true);
    };

    window.addEventListener('tour-open-mobile-widgets', handleTourOpen);

    return () => {
      window.removeEventListener('tour-open-mobile-widgets', handleTourOpen);
    };
  }, []);

  // Слушаем событие обновления данных для свечения плашки
  useEffect(() => {
    let glowTimer: NodeJS.Timeout | null = null;

    const handleDataRefresh = () => {
      // Включаем свечение только если виджет свёрнут
      if (!isOpen) {
        setIsGlowing(true);
        // Очищаем предыдущий таймер, если он есть
        if (glowTimer) {
          clearTimeout(glowTimer);
        }
        // Выключаем свечение через 4 секунды
        glowTimer = setTimeout(() => {
          setIsGlowing(false);
          glowTimer = null;
        }, 4000);
      }
    };

    window.addEventListener('google-sheet-refresh', handleDataRefresh);

    return () => {
      window.removeEventListener('google-sheet-refresh', handleDataRefresh);
      if (glowTimer) {
        clearTimeout(glowTimer);
      }
    };
  }, [isOpen]);

  const widgets = carRentalConfig.sheets.widgets;

  const nextSlide = () => {
    setActiveIndex((prev) => {
      if (prev < widgets.length - 1) {
        return prev + 1;
      }
      return prev; // Не переключаемся, если уже на последнем
    });
  };

  const prevSlide = () => {
    setActiveIndex((prev) => {
      if (prev > 0) {
        return prev - 1;
      }
      return prev; // Не переключаемся, если уже на первом
    });
  };

  // Логика свайпа
  const onDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 50; // Минимальное расстояние для свайпа
    if (info.offset.x < -threshold && activeIndex < widgets.length - 1) {
      nextSlide();
    } else if (info.offset.x > threshold && activeIndex > 0) {
      prevSlide();
    }
  };

  return (
    <div className="w-full md:hidden relative">
      {/* Обертка для тура - включает весь виджет (кнопку + открытое содержимое) */}
      <div id="tour-widgets-mobile" className="w-full flex flex-col z-20 border-b border-white/5 bg-black/60 backdrop-blur-2xl relative">
        
        {/* 1. Компактный Хедер (Кнопка открытия) */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "w-full flex items-center justify-between px-4 py-3 active:bg-white/5 transition-all duration-500 relative z-10",
            !isOpen && isGlowing && "bg-gradient-to-br from-sky-500/20 via-blue-500/15 to-blue-600/20 border border-sky-400/30 shadow-2xl shadow-sky-500/20 animate-pulse",
            !isOpen && !isGlowing && "bg-transparent border-transparent shadow-none"
          )}
        >
          <div className="flex items-center gap-2 text-sm font-medium text-white/90 relative">
            {!isOpen && isGlowing && (
              <>
                {/* Декоративные элементы свечения */}
                <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-sky-400/50 rounded-full blur-[2px] animate-pulse transition-opacity duration-500" />
                <div className="absolute -bottom-0.5 -left-0.5 w-1.5 h-1.5 bg-blue-400/40 rounded-full blur-[2px] transition-opacity duration-500" />
              </>
            )}
            <Database size={16} className={cn("text-white transition-colors duration-500", !isOpen && isGlowing && "text-sky-300")} />
            <span className={cn("transition-colors duration-500", !isOpen && isGlowing && "text-sky-200")}>{t.chat.database}</span>
          </div>
          {isOpen ? <ChevronUp size={16} className="text-white/50" /> : <ChevronDown size={16} className={cn("text-white/50 transition-colors duration-500", isGlowing && "text-sky-300/70")} />}
        </button>

        {/* 2. Тело карусели - теперь внутри контейнера для правильной подсветки тура */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              id="tour-widgets-mobile-open"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden bg-black/60 backdrop-blur-2xl border-b border-white/5 z-30"
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
                {activeIndex > 0 && (
                  <button 
                    onClick={(e) => { e.stopPropagation(); prevSlide(); }}
                    className="absolute left-1 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 text-white/70 hover:bg-black/60 backdrop-blur-sm transition-all z-20"
                    aria-label="Предыдущий слайд"
                  >
                    <ChevronLeft size={20} />
                  </button>
                )}

                {activeIndex < widgets.length - 1 && (
                  <button 
                    onClick={(e) => { e.stopPropagation(); nextSlide(); }}
                    className="absolute right-1 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 text-white/70 hover:bg-black/60 backdrop-blur-sm transition-all z-20"
                    aria-label="Следующий слайд"
                  >
                    <ChevronRight size={20} />
                  </button>
                )}

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
    </div>
  );
}
