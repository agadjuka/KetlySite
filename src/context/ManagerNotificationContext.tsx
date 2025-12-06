'use client';

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from 'react';

interface ManagerNotificationContextValue {
  message: string | null;
  isVisible: boolean;
  showNotification: (message: string) => void;
  hideNotification: () => void;
}

const ManagerNotificationContext = createContext<ManagerNotificationContextValue | undefined>(undefined);

export function ManagerNotificationProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const showNotification = useCallback((msg: string) => {
    setMessage(msg);
    setIsVisible(true);
  }, []);

  const hideNotification = useCallback(() => {
    setIsVisible(false);
    // Очищаем сообщение после анимации закрытия
    setTimeout(() => {
      setMessage(null);
    }, 500);
  }, []);

  const value = {
    message,
    isVisible,
    showNotification,
    hideNotification,
  };

  return (
    <ManagerNotificationContext.Provider value={value}>
      {children}
    </ManagerNotificationContext.Provider>
  );
}

export function useManagerNotification() {
  const context = useContext(ManagerNotificationContext);
  if (context === undefined) {
    throw new Error('useManagerNotification must be used within a ManagerNotificationProvider');
  }
  return context;
}

