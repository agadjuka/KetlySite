'use client';

import { useChat } from '@/hooks/useChat';
import { useDemoMode } from '@/context/DemoContext';
import { LanguageToggleButton } from '@/components/ui/LanguageToggleButton';
import { AmbientMeshGradients } from '@/components/ui/AmbientMeshGradients';
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
      <LanguageToggleButton
        variant="desktop"
        className="hidden lg:flex absolute top-4 right-4 z-30"
      />

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
    </main>
  );
}
