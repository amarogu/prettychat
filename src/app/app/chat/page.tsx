'use client';
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { IChat } from "../../../../models/Chat";
import axiosInstance from "../../../../axiosInstance";
import Sidebar from "./Sidebar";
import ChatWindow from "./ChatWindow";

export default function Chat() {
    const {data: session} = useSession();

    const [chats, setChats] = useState<IChat[]>([]);

    const [currentChat, setCurrentChat] = useState<IChat | null>(null);

    const updateChat = (chat: IChat) => {
        setCurrentChat(chat);
    }

    const createChat = async () => {
        await axiosInstance.get('/createChat');
        const chats = await axiosInstance.get('/chats');
        setChats(chats.data);
    }

    const deleteChat = async (chatID: string) => {
        await axiosInstance.post('/deleteChat', {_id: chatID});
        const chats = await axiosInstance.get('/chats');
        setChats(chats.data);
    }

    useEffect(() => {
        const fetchChats = async () => {
            const chats = await axiosInstance.get('/chats');
            setChats(chats.data);
            setCurrentChat(chats.data[0]);
        }
        fetchChats();
    }, [session?.user?.name]);

    return (
        <main className="p-8 flex gap-8 h-screen">
            <Sidebar chats={chats} updateChat={updateChat} createChat={createChat} deleteChat={deleteChat} />
            <ChatWindow chat={currentChat} />
        </main>
    )
}