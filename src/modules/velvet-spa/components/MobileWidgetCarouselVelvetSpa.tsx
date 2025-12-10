'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { ChevronDown, ChevronUp, ChevronLeft, ChevronRight, Database } from 'lucide-react';
import { GoogleSheetEmbed } from './GoogleSheetEmbed';
import { GoogleScriptWidget } from './GoogleScriptWidget';
import { velvetSpaConfig } from '../config';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/context/LanguageContext';

interface MobileWidgetCarouselVelvetSpaProps {
  sheetId: string;
}

export function MobileWidgetCarouselVelvetSpa({ sheetId }: MobileWidgetCarouselVelvetSpaProps) {
  const { t, language } = useLanguage();
  const [isOpen, setIsOpen] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isGlowing, setIsGlowing] = useState(false);

  // Для английской версии используем хардкод, для русской - переданный sheetId
  const actualSheetId = language === 'en' 
    ? '19foqfHL7k9znua1ll3PjYVlsiQ1xnMTdVo59MH2yUZI'
    : sheetId;

  // Получаем виджеты в зависимости от языка
  const widgets = velvetSpaConfig.sheets.widgets[language] || velvetSpaConfig.sheets.widgets.ru;

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

  const getEditUrl = (gid: string) => 
    `https://docs.google.com/spreadsheets/d/${actualSheetId}/edit#gid=${gid}`;

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
              
              {/* Контейнер виджета - увеличенная высота для первого виджета */}
              <div className="relative w-full bg-black/20 rounded-lg overflow-hidden border border-white/10" style={{ height: activeIndex === 0 ? '440px' : '220px' }}>
                
                {/* Рендерим все виджеты сразу при открытии, они остаются в памяти */}
                {widgets.map((widget, idx) => {
                  const widgetKey = widget.type === 'script' 
                    ? `script-${idx}` 
                    : `sheet-${(widget as any).gid}`;

                  return (
                    <motion.div
                      key={widgetKey}
                      className={cn(
                        "absolute inset-0 w-full h-full",
                        idx === activeIndex ? "z-10" : "z-0"
                      )}
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
                      {/* Зоны для свайпа по краям */}
                      {idx === activeIndex && (
                        <>
                          {/* Левая зона для свайпа влево */}
                          <motion.div
                            className="absolute left-0 top-0 bottom-0 w-12 z-30 cursor-grab active:cursor-grabbing"
                            drag="x"
                            dragConstraints={{ left: 0, right: 0 }}
                            dragElastic={0.2}
                            onDragEnd={onDragEnd}
                            style={{ touchAction: 'pan-y' }}
                          />
                          {/* Правая зона для свайпа вправо */}
                          <motion.div
                            className="absolute right-0 top-0 bottom-0 w-12 z-30 cursor-grab active:cursor-grabbing"
                            drag="x"
                            dragConstraints={{ left: 0, right: 0 }}
                            dragElastic={0.2}
                            onDragEnd={onDragEnd}
                            style={{ touchAction: 'pan-y' }}
                          />
                        </>
                      )}
                      {widget.type === 'script' && 'scriptUrl' in widget ? (
                        <GoogleScriptWidget
                          scriptUrl={widget.scriptUrl}
                          scale={idx === 0 ? 0.5 : 0.55}
                          className="w-full h-full"
                          title={widget.title}
                        />
                      ) : widget.type === 'sheet' && 'gid' in widget ? (
                        <GoogleSheetEmbed 
                          sheetId={actualSheetId}
                          gid={widget.gid}
                          scale={0.55}
                          className="w-full h-full"
                          href={getEditUrl(widget.gid)}
                          title={widget.title}
                        />
                      ) : null}
                    </motion.div>
                  );
                })}

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

