import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Chat } from './Sidebar';

// Define an interface for your state
interface IChatState {
  state: Chat[];
  setState: React.Dispatch<React.SetStateAction<Chat[]>>;
}

// Create a context with the interface
const GlobalStateContext = createContext<IChatState | null>(null);

// Create a provider component
export function GlobalStateProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<Chat[]>([]);

  return (
    <GlobalStateContext.Provider value={{ state, setState }}>
      {children}
    </GlobalStateContext.Provider>
  );
}

// Create a custom hook for using the global state
export function useGlobalState() {
  const context = useContext(GlobalStateContext);
  if (context === null) {
    throw new Error('useGlobalState must be used within a GlobalStateProvider');
  }
  return context;
}