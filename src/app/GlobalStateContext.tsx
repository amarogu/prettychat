import React, { createContext, useContext, useState, ReactNode } from 'react';

// Classes
export class Message {
    origin: String;
    content: String;

    constructor(origin: String, content: String) {
        this.origin = origin
        this.content = content
    }
}
export class Chat {
    title: String;
    description: String;
    messages: Array<Message>;

    constructor(title: String, description: String, messages: Array<Message>) {
        this.title = title
        this.description = description
        this.messages = messages
    }
}

// Define an interface for your state
interface IChatState {
  chats: Chat[];
  setChats: React.Dispatch<React.SetStateAction<Chat[]>>;
}

// Create a context with the interface
const GlobalStateContext = createContext<IChatState | null>(null);

// Create a provider component
export function GlobalStateProvider({ children }: { children: ReactNode }) {
  const [chats, setChats] = useState<Chat[]>([]);

  return (
    <GlobalStateContext.Provider value={{ chats, setChats }}>
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