'use client';

import { useChat } from '@/hooks/useChat';
import { useDemoMode } from '@/context/DemoContext';
import { LanguageToggleButton } from '@/components/ui/LanguageToggleButton';
import { AmbientMeshGradients } from '@/components/ui/AmbientMeshGradients';
import { StopDemoButton } from '@/components/ui/StopDemoButton';
import { DesktopLayout } from '@/components/layout/DesktopLayout';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { useLanguage } from '@/context/LanguageContext';

export default function Home() {
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
