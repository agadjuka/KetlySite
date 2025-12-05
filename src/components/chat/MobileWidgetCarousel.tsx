'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from 'lucide-react';
import { GoogleSheetEmbed } from '@/app/agents/car-rental/components/GoogleSheetEmbed';

interface MobileWidgetCarouselProps {
  sheetId: string;
}

const WIDGETS = [
  { gid: '0', title: 'CarPark' },
  { gid: '337777908', title: 'Bookings' },
  { gid: '667953082', title: 'Availability' },
];

export function MobileWidgetCarousel({ sheetId }: MobileWidgetCarouselProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? WIDGETS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === WIDGETS.length - 1 ? 0 : prev + 1));
  };

  const currentWidget = WIDGETS[activeIndex];

  return (
    <div className="w-full border-b border-white/10 bg-zinc-900/80 backdrop-blur-md z-20 md:hidden flex flex-col">
      {/* Toggle Bar */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-3 flex items-center justify-between text-xs font-medium text-zinc-400 uppercase tracking-wider hover:text-zinc-300 transition-colors"
      >
        <span>База данных</span>
        {isOpen ? (
          <ChevronUp className="w-4 h-4" />
        ) : (
          <ChevronDown className="w-4 h-4" />
        )}
      </button>

      {/* Content (Collapsible) */}
      {isOpen && (
        <div className="overflow-hidden transition-all duration-300 ease-in-out">
          <div className="px-3 pb-4">
            {/* Slider Controls */}
            <div className="flex items-center gap-2 mb-3">
              <button
                onClick={handlePrev}
                className="p-2 rounded-md bg-white/5 hover:bg-white/10 transition-colors flex-shrink-0"
                aria-label="Предыдущий слайд"
              >
                <ChevronLeft className="w-5 h-5 text-zinc-400" />
              </button>

              {/* Widget Container */}
              <div className="flex-1 aspect-[500/220] w-full overflow-hidden rounded-md">
                <GoogleSheetEmbed
                  sheetId={sheetId}
                  gid={currentWidget.gid}
                  scale={0.55}
                  className="w-full h-full"
                  href={`https://docs.google.com/spreadsheets/d/${sheetId}/edit#gid=${currentWidget.gid}`}
                  title={currentWidget.title}
                />
              </div>

              <button
                onClick={handleNext}
                className="p-2 rounded-md bg-white/5 hover:bg-white/10 transition-colors flex-shrink-0"
                aria-label="Следующий слайд"
              >
                <ChevronRight className="w-5 h-5 text-zinc-400" />
              </button>
            </div>

            {/* Dots Indicator */}
            <div className="flex items-center justify-center gap-2">
              {WIDGETS.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === activeIndex
                      ? 'bg-zinc-400 w-6'
                      : 'bg-zinc-600 hover:bg-zinc-500'
                  }`}
                  aria-label={`Перейти к слайду ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

