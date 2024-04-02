'use client';
import Btn from "@/app/Btn";
import Input from "@/app/Input";
import { IChat } from "../../../../models/Chat";
import axiosInstance from "../../../../axiosInstance";

interface ChatWindowProps {
    chat: IChat | null;
    getChat: (chatId: string) => void;
}

export default function ChatWindow({chat, getChat}: ChatWindowProps) {

    const sendMessage = async (content: string, sender: 'user' | 'system', chatId: string) => {
        if (content !== '') {
            await axiosInstance.post('/message', {content: content, sender: sender, chatId: chatId});
            getChat(chatId);
        }
    }

    const getMessageInput: () => string = () => {
        const el = document.getElementById('message-input') as HTMLInputElement
        return el.value;
    }

    return (
        <section className="flex h-full grow gap-4 flex-col">
            <div className="grow flex flex-col gap-4 overflow-y-scroll justify-end">
            {
                chat?.messages.length !== 0 && chat ? chat.messages.map((message) => {
                    return (
                        <div key={message._id} className={`${message.sender === 'user' ? 'self-end' : 'self-start'} bg-gray px-4 py-2`}>
                            <p>{message.content}</p>
                            <p className="text-body-dark">{message.sender}</p>
                        </div>
                    )
                }) :
                <div className="grow flex flex-col justify-center items-center">
                    <h1 className="text-2xl font-einaBold">New Chat</h1>
                    <p className="w-1/4 text-center">To begin chatting, start typing in the input field below.</p>
                </div>
            }
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