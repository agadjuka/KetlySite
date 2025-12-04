'use client';

import { useChat } from '@/hooks/useChat';
import { useDemoMode } from '@/context/DemoContext';
import { DemoProvider } from '@/context/DemoContext';
import { AmbientMeshGradients } from '@/components/ui/AmbientMeshGradients';
import { StopDemoButton } from '@/components/ui/StopDemoButton';
import { useLanguage } from '@/context/LanguageContext';
import { DesktopLayoutCarRental } from '@/components/layout/DesktopLayoutCarRental';
import { MobileLayoutCarRental } from '@/components/layout/MobileLayoutCarRental';

function CarRentalContent() {
  const { messages, isTyping, handleSendMessage } = useChat({
    apiUrl: process.env.NEXT_PUBLIC_CAR_RENTAL_API_URL,
  });
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

      <DesktopLayoutCarRental
        messages={messages}
        isTyping={isTyping}
        onSendMessage={handleSendMessage}
        onQuickMessage={handleQuickMessage}
      />

      <MobileLayoutCarRental
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

export default function CarRentalPage() {
  return (
    <DemoProvider available={false}>
      <CarRentalContent />
    </DemoProvider>
  );
}

