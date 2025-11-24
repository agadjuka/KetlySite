import { useState, useEffect } from 'react';
import { generateSessionId } from '@/lib/id';

export function useSession(): string {
  const [sessionId, setSessionId] = useState<string>('');

  useEffect(() => {
    const newSessionId = generateSessionId();
    setSessionId(newSessionId);
  }, []);

  return sessionId;
}

