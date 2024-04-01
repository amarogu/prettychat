'use client';
import Btn from "@/app/Btn";
import Input from "@/app/Input";
import { IChat } from "../../../../models/Chat";
import axiosInstance from "../../../../axiosInstance";

interface ChatWindowProps {
    chat: IChat | null;
}

export default function ChatWindow({chat}: ChatWindowProps) {

    const sendMessage = async (content: string, sender: 'user' | 'system', chatId: string) => {
        await axiosInstance.post('/message', {content: content, sender: sender, chatId: chatId});
    }

    const getMessageInput: () => string = () => {
        const el = document.getElementById('message-input') as HTMLInputElement
        return el.value;
    }

    return (
        <section className="flex h-full grow flex-col">
            <div className="grow flex flex-col justify-center items-center">
                <h1 className="text-2xl font-einaBold">New Chat</h1>
                <p className="w-1/4 text-center">To begin chatting, start typing in the input field below.</p>
            </div>
            <div className="flex gap-2">
                <Input id="message-input" placeholder="Type a message" className="bg-gray grow outline-gray" />
                <Btn content="Send" onClick={() => {
                    sendMessage(getMessageInput(), 'user', chat?._id as string);
                }} />
            </div>
        </section>
    )
}