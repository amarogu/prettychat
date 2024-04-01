'use client';
import { useSession, signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import { IChat } from "../../../../models/Chat";
import axiosInstance from "../../../../axiosInstance";
import Sidebar from "./Sidebar";
import ChatWindow from "./ChatWindow";

export default function Chat() {
    const {data: session} = useSession();

    const [chats, setChats] = useState<IChat[]>([]);

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
        }
        fetchChats();
    }, [session?.user?.name]);

    return (
        <main className="p-8 flex gap-8 h-screen">
            <Sidebar chats={chats} createChat={createChat} deleteChat={deleteChat} />
            <ChatWindow />
        </main>
    )
}