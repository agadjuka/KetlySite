'use client';

import Link from 'next/link';
import { useChat } from '@/hooks/useChat';
import { useDemoMode } from '@/context/DemoContext';
import { DemoProvider } from '@/context/DemoContext';
import { LanguageToggleButton } from '@/components/ui/LanguageToggleButton';
import { AmbientMeshGradients } from '@/components/ui/AmbientMeshGradients';
import { StopDemoButton } from '@/components/ui/StopDemoButton';
import { DesktopLayout } from '@/components/layout/DesktopLayout';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { useLanguage } from '@/context/LanguageContext';

function HomeContent() {
  const { messages, isTyping, handleSendMessage } = useChat();
  const { isDemoMode } = useDemoMode();
  const { t } = useLanguage();

  // Обработчик для быстрых сообщений
  const handleQuickMessage = (text: string) => {
    if (isDemoMode) {
      handleSendMessage(t.chat.stopKeyword);
      setTimeout(() => {
        handleSendMessage(text);
      }, 700);
    } else {
      handleSendMessage(text);
    }
  };

  return (
    <main 
      className="fixed inset-0 flex flex-col bg-[#050505] text-white h-[100dvh]"
    >
      <AmbientMeshGradients />

      {/* Кнопка навигации к Car Rental */}
      <Link
        href="/agents/car-rental"
        className="absolute top-4 right-4 z-50 px-4 py-2 bg-black/40 backdrop-blur-xl border border-white/10 rounded-lg text-sm font-medium text-zinc-300 hover:text-white hover:bg-black/60 hover:border-white/20 transition-all duration-300 shadow-lg hover:shadow-xl"
      >
        Демо: Аренда Авто
      </Link>

      <DesktopLayout
        messages={messages}
        isTyping={isTyping}
        onSendMessage={handleSendMessage}
        onQuickMessage={handleQuickMessage}
      />

      <MobileLayout
        messages={messages}
        isTyping={isTyping}
        onSendMessage={handleSendMessage}
        onQuickMessage={handleQuickMessage}
      />

      {/* Кнопка остановки демонстрации на отдельном слое */}
      <StopDemoButton 
        onStop={() => handleSendMessage(t.chat.stopKeyword)}
        position="desktop"
        className="hidden lg:block"
      />
      <StopDemoButton 
        onStop={() => handleSendMessage(t.chat.stopKeyword)}
        position="mobile"
        className="lg:hidden"
      />
    </main>
  );
}

export default function Home() {
  return (
    <DemoProvider available={true}>
      <HomeContent />
    </DemoProvider>
  );
}
