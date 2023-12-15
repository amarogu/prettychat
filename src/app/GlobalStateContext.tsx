'use client'
import axios from 'axios';
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Chat, User } from './Classes';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3277/',
    timeout: 1000,
});

// Define an interface for your state
interface IStateManager {
  chats: Chat[];
  setChats: React.Dispatch<React.SetStateAction<Chat[]>>;
  axiosInstance: typeof axiosInstance;
  user: User | undefined;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
}

// Create a context with the interface
const GlobalStateContext = createContext<IStateManager | null>(null);

// Create a provider component
export function GlobalStateProvider({ children }: { children: ReactNode }) {
  const [chats, setChats] = useState<Chat[]>([]);
  const [user, setUser] = useState<User>();
  return (
    <GlobalStateContext.Provider value={{ chats, setChats, axiosInstance, user, setUser }}>
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