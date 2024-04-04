import React, { useState, useEffect } from 'react';
import Btn from "@/app/Btn";
import Input from "@/app/Input";
import { IChat } from "../../../../models/Chat"; // Ensure IMessage is imported
import { useChat } from 'ai/react';
import { Message } from 'ai';
import {v4 as uuidv4} from 'uuid';
import axiosInstance from '../../../../axiosInstance';

interface ChatWindowProps {
    chat: IChat | null;
    getChat: (chatId: string) => void;
}

export default function ChatWindow({chat, getChat}: ChatWindowProps) {

    const [model, setModel] = useState<string>('gpt-3.5-turbo');

    const generateTitle = async () => {
        const res = (await axiosInstance.post('/generateTitle', {chatId: chat?._id})).data as {message: string};
        if (res.message === 'Title successfully generated' && chat) {
            getChat(chat?._id);
        }
    }

    const { messages, input, handleInputChange, handleSubmit, isLoading, stop, setMessages } = useChat({body: {chatId: chat?._id}, api: '/api/message', id: chat?._id, onFinish: chat?.title === 'New chat' ? generateTitle : () => {return;}});

    const shouldDisplayChat = () => {
        if (messages.length !== 0) {
            return messages.map((message) => {return (
                <div key={message.id} className={`${message.role === 'user' ? 'self-end ml-8' : 'self-start mr-8'} bg-gray px-4 py-2`}>
                    <p>{message.content}</p>
                    <p className="text-body-dark">{message.role === 'assistant' ? 'Assistant' : chat?.name}</p>
                </div>
            )});
        } else {
            return (
                <div className="grow flex flex-col justify-center items-center">
                    <h1 className="text-2xl font-einaBold">New Chat</h1>
                    <p className="w-1/4 text-center">To begin chatting, start typing in the input field below.</p>
                </div>
            );
        }
    }

    useEffect(() => {
        if (chat) {
            setMessages(chat.messages.map((msg) => {return {id: msg._id, content: msg.content, role: msg.role, createdAt: new Date(msg.createdAt)}}));
        }
    }, [chat])

    const parseModel = (model: string) => {
        switch (model) {
            case 'gpt-3.5-turbo':
                return 'GPT-3.5 Turbo';
            case 'gpt-4':
                return 'GPT-4';
            default:
                return 'GPT-3.5 Turbo';
        }
    }

    const models: string[] = ['gpt-3.5-turbo', 'gpt-4'];

    return (
        <section className="flex h-full grow gap-4 flex-col">
            <div className='flex relative'>
                <button className='text-lg'>{parseModel(model)}</button>
                <div className='absolute p-4 rounded-sm border-borders/75 border bottom-0 bg-gradient-to-b from-gray/75 to-gray translate-y-[calc(100%+1rem)]'>
                    <ul className='flex gap-2 flex-col'>
                        {   
                        models.map((model, i) => {
                            return <li key={i}><button>{parseModel(model)}</button></li>
                        })
                        }
                    </ul>
                </div>
            </div>
            <div className="grow flex flex-col gap-4 overflow-y-scroll justify-start">
                {shouldDisplayChat()}
            </div>
            <form className="flex gap-2" onSubmit={handleSubmit}>
                <Input value={input} onChange={handleInputChange} id="message-input" placeholder="Type a message" className="bg-gray grow outline-gray" />
                <Btn content="Send" disabled={isLoading} type="submit" />
                <Btn content="Stop" onClick={() => stop()} />
            </form>
        </section>
    );
}
