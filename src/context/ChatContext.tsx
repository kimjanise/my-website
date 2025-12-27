'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface ChatContextType {
  resetChat: () => void;
  registerResetHandler: (handler: () => void) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [resetHandler, setResetHandler] = useState<(() => void) | null>(null);

  const registerResetHandler = useCallback((handler: () => void) => {
    setResetHandler(() => handler);
  }, []);

  const resetChat = useCallback(() => {
    resetHandler?.();
  }, [resetHandler]);

  return (
    <ChatContext.Provider value={{ resetChat, registerResetHandler }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
}

