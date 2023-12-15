'use client'
import axios from 'axios';
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Chat } from './Classes';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3277/',
    timeout: 1000,
});

// Define an interface for your state
interface IChatState {
  chats: Chat[];
  setChats: React.Dispatch<React.SetStateAction<Chat[]>>;
  axiosInstance: typeof axiosInstance;
}

// Create a context with the interface
const GlobalStateContext = createContext<IChatState | null>(null);

// Create a provider component
export function GlobalStateProvider({ children }: { children: ReactNode }) {
  const [chats, setChats] = useState<Chat[]>([]);

  return (
    <GlobalStateContext.Provider value={{ chats, setChats, axiosInstance }}>
      {children}
    </GlobalStateContext.Provider>
  );
}

// Create a custom hook for using the global state
export function useGlobalChat() {
  const context = useContext(GlobalStateContext);
  if (context === null) {
    throw new Error('useGlobalState must be used within a GlobalStateProvider');
  }
  return context;
}