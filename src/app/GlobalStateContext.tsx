'use client'
import axios from 'axios';
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
    _id: String;
    title: String;
    description: String;
    messages: Message[]; // Replace Message with the actual type of your messages
    user: String;
    __v: Number;

    constructor(_id: String, title: String, description: String, messages: Array<Message>, user: String, __v: Number) {
        this._id = _id
        this.title = title
        this.description = description
        this.messages = messages
        this.user = user
        this.__v = __v
    }
}

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
export function useGlobalState() {
  const context = useContext(GlobalStateContext);
  if (context === null) {
    throw new Error('useGlobalState must be used within a GlobalStateProvider');
  }
  return context;
}