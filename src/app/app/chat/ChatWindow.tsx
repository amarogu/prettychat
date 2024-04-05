import React, { useState, useEffect, useRef } from 'react';
import Btn from "@/app/Btn";
import Input from "@/app/Input";
import { IChat } from "../../../../models/Chat"; // Ensure IMessage is imported
import { useChat } from 'ai/react';
import axiosInstance from '../../../../axiosInstance';
import Settings from '../../../../public/settings.svg';
import Image from 'next/image';
import { createPortal } from 'react-dom';

interface ChatWindowProps {
    chat: IChat | null;
    getChat: (chatId: string) => void;
}

export default function ChatWindow({chat, getChat}: ChatWindowProps) {

    const [model, setModel] = useState<string>('gpt-3.5-turbo');
    const [open, setOpen] = useState<boolean>(false);
    const [areOptionsOpen, setAreOptionsOpen] = useState<boolean>(false);
    const optionsRef = useRef<HTMLDivElement>(null);
    const btnRef = useRef<HTMLButtonElement>(null);

    const generateTitle = async () => {
        const res = (await axiosInstance.post('/generateTitle', {chatId: chat?._id})).data as {message: string};
        if (res.message === 'Title successfully generated' && chat) {
            getChat(chat?._id);
        }
    }

    const { messages, input, handleInputChange, handleSubmit, isLoading, stop, setMessages } = useChat({body: {chatId: chat?._id, model: model}, api: '/api/message', id: chat?._id, onFinish: chat?.title === 'New chat' ? generateTitle : () => {return;}});

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
            case 'gpt-4-turbo-preview':
                return 'GPT-4 Turbo Preview';
            case 'gpt-4-1106-vision-preview':
                return 'GPT-4 1106 Vision Preview';
            case 'gpt-4-1106-preview':
                return 'GPT-4 1106 Preview';
            case 'gpt-4-0613':
                return 'GPT-4 0613';
            case 'gpt-4-0125-preview':
                return 'GPT-4 0125 Preview';
            case 'gpt-3.5-turbo-16k-0613':
                return 'GPT-3.5 Turbo 16k 0613';
            case 'gpt-3.5-turbo-16k':
                return 'GPT-3.5 Turbo 16k';
            case 'gpt-3.5-turbo-1106':
                return 'GPT-3.5 Turbo 1106';
            case 'gpt-3.5-turbo-0613':
                return 'GPT-3.5 Turbo 0613';
            case 'gpt-3.5-turbo-0301':
                return 'GPT-3.5 Turbo 0301';
            case 'gpt-3.5-turbo-0125':
                return 'GPT-3.5 Turbo 0125';
            default:
                return 'GPT-3.5 Turbo';
        }
    }

    const models: string[] = ['gpt-3.5-turbo', 'gpt-4', 'gpt-4-turbo-preview', 'gpt-4-1106-vision-preview', 'gpt-4-1106-preview', 'gpt-4-0613', 'gpt-4-0125-preview', 'gpt-3.5-turbo-16k-0613', 'gpt-3.5-turbo-16k', 'gpt-3.5-turbo-1106', 'gpt-3.5-turbo-0613', 'gpt-3.5-turbo-0301', 'gpt-3.5-turbo-0125'];

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (optionsRef.current && !optionsRef.current.contains(e.target as Node) && btnRef.current && !btnRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        }
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [optionsRef, btnRef])

    return (
        <section className="flex h-full grow gap-4 flex-col">
            <div className='flex justify-between items-center relative'>
                <button className='text-lg' ref={btnRef} onClick={() => setOpen(!open)}>{parseModel(model)}</button>
                <button><Image width={16} height={16} src={Settings} alt='Options' /></button>
                <div ref={optionsRef} className={`absolute backdrop-blur-[2px] ${open ? 'block' : 'hidden'} p-4 rounded-sm border-borders/75 border bottom-0 bg-gradient-to-b from-gray/75 to-gray translate-y-[calc(100%+1rem)]`}>
                    <ul className='flex gap-2 flex-col'>
                        {   
                        models.map((m, i) => {
                            return (
                                <li className='flex justify-between gap-4 items-center' key={i}>
                                    <button onClick={() => setModel(m)}>{parseModel(m)}</button>
                                    {model === m ? <div className='w-2 h-2 rounded-full bg-background-light-emphasized'></div> : null}
                                </li>
                            )
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
            <div className='absolute'>
                <h2>Options</h2>
            </div>
        </section>
    );
}
