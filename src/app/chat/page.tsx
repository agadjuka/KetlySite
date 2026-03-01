'use client';

import { useChat } from '@/hooks/useChat';
import { useQuickMessage } from '@/hooks/useQuickMessage';
import { DemoProvider } from '@/context/DemoContext';
import { AmbientMeshGradients } from '@/components/ui/AmbientMeshGradients';
import { StopDemoButton } from '@/components/ui/StopDemoButton';
import { ManagerNotification } from '@/components/ui/ManagerNotification';
import { DesktopLayout } from '@/components/layout/DesktopLayout';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { useLanguage } from '@/context/LanguageContext';
import { MainTourManager } from '@/components/tour/MainTourManager';
import { LanguageIntro } from '@/components/ui/LanguageIntro';
import { WelcomeInfo } from '@/components/ui/WelcomeInfo';

function ChatPageContent() {
  const { messages, isTyping, handleSendMessage } = useChat({
    tourStorageKey: 'tour_seen_main_page',
  });
  const { t } = useLanguage();
  const handleQuickMessage = useQuickMessage(handleSendMessage);

  const handleTourComplete = () => {
    // useChat автоматически обработает событие tour-completed-tour_seen_main_page
    // и отправит приветственные сообщения
  };

  return (
    <main
      className="fixed inset-0 flex flex-col bg-[#050505] text-white h-[100dvh]"
    >
      <AmbientMeshGradients />
      <LanguageIntro />
      <WelcomeInfo />

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

      <MainTourManager onComplete={handleTourComplete} />

      <ManagerNotification />
    </main>
  );
}

export default function ChatPage() {
  return (
    <DemoProvider available={true}>
      <ChatPageContent />
    </DemoProvider>
  );
}
