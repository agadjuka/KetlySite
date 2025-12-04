'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface DemoContextType {
  isDemoMode: boolean;
  setIsDemoMode: (value: boolean) => void;
}

const DemoContext = createContext<DemoContextType | undefined>(undefined);

interface DemoProviderProps {
  children: ReactNode;
  available?: boolean;
}

export function DemoProvider({ children, available = true }: DemoProviderProps) {
  const [demoModeState, setDemoModeState] = useState<boolean>(false);

  // Если демо недоступно, всегда возвращаем false и игнорируем попытки изменить состояние
  const setIsDemoMode = useCallback((value: boolean) => {
    if (available) {
      setDemoModeState(value);
    }
    // Если available === false, просто игнорируем вызов
  }, [available]);

  // Если демо недоступно, всегда возвращаем false
  const isDemoMode = available ? demoModeState : false;

  return (
    <DemoContext.Provider value={{ isDemoMode, setIsDemoMode }}>
      {children}
    </DemoContext.Provider>
  );
}

export function useDemoMode() {
  const context = useContext(DemoContext);
  if (context === undefined) {
    throw new Error('useDemoMode must be used within a DemoProvider');
  }
  return context;
}













