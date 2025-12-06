'use client';

import { useChat } from '@/hooks/useChat';
import { useDemoMode } from '@/context/DemoContext';
import { DemoProvider } from '@/context/DemoContext';
import { AmbientMeshGradients } from '@/components/ui/AmbientMeshGradients';
import { StopDemoButton } from '@/components/ui/StopDemoButton';
import { ManagerNotification } from '@/components/ui/ManagerNotification';
import { DesktopLayout } from '@/components/layout/DesktopLayout';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { useLanguage } from '@/context/LanguageContext';
import { MainTourManager } from '@/components/tour/MainTourManager';

function HomeContent() {
  const { messages, isTyping, handleSendMessage } = useChat({
    tourStorageKey: 'tour_seen_main_page',
  });
  const { isDemoMode } = useDemoMode();
  const { t } = useLanguage();

  // Коллбек для завершения тура (useChat автоматически отправит приветственные сообщения через событие tour-completed)
  const handleTourComplete = () => {
    // useChat автоматически обработает событие tour-completed-tour_seen_main_page
    // и отправит приветственные сообщения
  };

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

      {/* Менеджер тура для главной страницы */}
      <MainTourManager onComplete={handleTourComplete} />

      {/* Уведомление для менеджера */}
      <ManagerNotification />
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
