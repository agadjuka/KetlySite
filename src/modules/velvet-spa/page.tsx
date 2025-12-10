'use client';

import { useChat } from '@/hooks/useChat';
import { useQuickMessage } from '@/hooks/useQuickMessage';
import { DemoProvider } from '@/context/DemoContext';
import { AmbientMeshGradients } from '@/components/ui/AmbientMeshGradients';
import { StopDemoButton } from '@/components/ui/StopDemoButton';
import { ManagerNotification } from '@/components/ui/ManagerNotification';
import { useLanguage } from '@/context/LanguageContext';
import { DesktopLayoutVelvetSpa, MobileLayoutVelvetSpa, TourManager, TourExitButton } from './index';
import { velvetSpaConfig } from './config';

function VelvetSpaContent() {
  const { language } = useLanguage();
  const { messages, isTyping, handleSendMessage } = useChat({
    apiUrl: process.env[velvetSpaConfig.env.apiUrl],
    initialMessages: [
      velvetSpaConfig.initialMessages[language],
    ],
    enableDataRefresh: true,
    tourStorageKey: velvetSpaConfig.tourStorageKey,
  });
  const { t } = useLanguage();
  const handleQuickMessage = useQuickMessage(handleSendMessage);

  return (
    <main 
      className="fixed inset-0 flex flex-col bg-[#050505] text-white h-[100dvh]"
    >
      <AmbientMeshGradients />

      <DesktopLayoutVelvetSpa
        messages={messages}
        isTyping={isTyping}
        onSendMessage={handleSendMessage}
        onQuickMessage={handleQuickMessage}
      />

      <MobileLayoutVelvetSpa
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

      {/* Кнопки выхода для тура на отдельном слое */}
      <TourExitButton />

      {/* Менеджер тура */}
      <TourManager />

      {/* Уведомление для менеджера */}
      <ManagerNotification />
    </main>
  );
}

export default function VelvetSpaPage() {
  return (
    <DemoProvider available={false}>
      <VelvetSpaContent />
    </DemoProvider>
  );
}




