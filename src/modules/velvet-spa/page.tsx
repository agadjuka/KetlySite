'use client';

import { useMemo } from 'react';
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
  
  // Выбираем правильный API URL в зависимости от языка интерфейса
  // Next.js компилирует переменные окружения во время сборки, поэтому динамический доступ не работает
  const apiUrl = useMemo(() => {
    if (language === 'ru') {
      return process.env.NEXT_PUBLIC_VELVET_SPA_API_URL_RU;
    } else {
      return process.env.NEXT_PUBLIC_VELVET_SPA_API_URL_EN;
    }
  }, [language]);
  
  const { messages, isTyping, handleSendMessage } = useChat({
    apiUrl: apiUrl,
    initialMessages: [
      velvetSpaConfig.initialMessages[language] || velvetSpaConfig.initialMessages.ru,
    ],
    enableDataRefresh: true,
    tourStorageKey: velvetSpaConfig.tourStorageKey,
    skipLanguage: true, // Для velvet-spa не передаем язык в запросе
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




