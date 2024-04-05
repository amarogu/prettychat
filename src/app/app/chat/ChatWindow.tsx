import React, { useState, useEffect, useRef } from 'react';
import Btn from "@/app/Btn";
import Input from "@/app/Input";
import { IChat } from "../../../../models/Chat"; // Ensure IMessage is imported
import { useChat } from 'ai/react';
import axiosInstance from '../../../../axiosInstance';
import Settings from '../../../../public/settings.svg';
import Image from 'next/image';
import Markdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { prism } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface ChatWindowProps {
    chat: IChat | null;
    getChat: (chatId: string) => void;
}

export default function ChatWindow({chat, getChat}: ChatWindowProps) {

    const [model, setModel] = useState<string>('gpt-3.5-turbo');
    const [open, setOpen] = useState<boolean>(false);
    const [optsWindow, setOptsWindow] = useState<boolean>(false);
    const modelsRef = useRef<HTMLDivElement>(null);
    const btnRef = useRef<HTMLButtonElement>(null);

    const optsRef = useRef<HTMLDivElement>(null);
    const optsBtnRef = useRef<HTMLButtonElement>(null);

    const generateTitle = async () => {
        const res = (await axiosInstance.post('/generateTitle', {chatId: chat?._id})).data as {message: string};
        if (res.message === 'Title successfully generated' && chat) {
            getChat(chat?._id);
        }
    };

    const { messages, input, handleInputChange, handleSubmit, isLoading, stop, setMessages } = useChat({body: {chatId: chat?._id, model: model}, api: '/api/message', id: chat?._id, onFinish: chat?.title === 'New chat' ? generateTitle : () => {return;}});

    const shouldDisplayChat = () => {
        if (messages.length !== 0) {
            return messages.map((message) => {return (
                <div key={message.id} className={`${message.role === 'user' ? 'self-end ml-8' : 'self-start mr-8'} bg-bg-200 flex flex-col gap-2 p-4`}>
                    {useMd ? 
                    <Markdown
                        children={message.content}
                        components={{
                        code(props) {
                            const {children, className, node, ...rest} = props
                            const match = /language-(\w+)/.exec(className || '')
                            return match ? (
                                <SyntaxHighlighter PreTag='div' style={prism} language={match[1]} children={String(children).replace(/\n$/, '')} />
                            ) : (
                            <code {...rest} className={className}>
                                {children}
                            </code>
                            )
                        },
                        h1(props) {
                            return <h1 className='text-2xl font-einaBold' {...props} />
                        },
                        h2(props) {
                            return <h2 className='text-xl font-einaBold' {...props} />
                        },
                        ol(props) {
                            return <ol className='list-decimal list-inside' {...props} />
                        },
                        ul(props) {
                            return <ul className='list-disc list-inside' {...props} />
                        },
                        }}
                    /> : <p>{message.content}</p>}
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
    };

    useEffect(() => {
        if (chat) {
            setMessages(chat.messages.map((msg) => {return {id: msg._id, content: msg.content, role: msg.role, createdAt: new Date(msg.createdAt)}}));
        }
    }, [chat]);

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
    };

    const models: string[] = ['gpt-3.5-turbo', 'gpt-4', 'gpt-4-turbo-preview', 'gpt-4-1106-vision-preview', 'gpt-4-1106-preview', 'gpt-4-0613', 'gpt-4-0125-preview', 'gpt-3.5-turbo-16k-0613', 'gpt-3.5-turbo-16k', 'gpt-3.5-turbo-1106', 'gpt-3.5-turbo-0613', 'gpt-3.5-turbo-0301', 'gpt-3.5-turbo-0125'];

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (modelsRef.current && !modelsRef.current.contains(e.target as Node) && btnRef.current && !btnRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
            if (optsRef.current && !optsRef.current.contains(e.target as Node) && optsBtnRef.current && !optsBtnRef.current.contains(e.target as Node)) {
                setOptsWindow(false);
            }
        }
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [modelsRef, btnRef, optsRef, optsBtnRef]);

    const [useMd, setUseMd] = useState<boolean>(true);

    const chatEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView();
    };

    useEffect(scrollToBottom);

    return (
        <section className="flex h-full grow gap-4 flex-col">
            <div className='flex justify-between items-center relative'>
                <button className='text-lg' ref={btnRef} onClick={() => setOpen(!open)}>{parseModel(model)}</button>
                <button ref={optsBtnRef} onClick={() => setOptsWindow(!optsWindow)}><Image width={16} height={16} src={Settings} alt='Options' /></button>
                <div ref={modelsRef} className={`absolute backdrop-blur-[2px] ${open ? 'block' : 'hidden'} p-4 rounded-sm border-borders/50 border bottom-0 bg-gradient-to-b from-gray/75 to-gray translate-y-[calc(100%+1rem)]`}>
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
                <div ref={chatEndRef}></div>
            </div>
            <form className="flex gap-2" onSubmit={handleSubmit}>
                <Input value={input} onChange={handleInputChange} id="message-input" placeholder="Type a message" className="bg-gray grow outline-gray" />
                <Btn content="Send" disabled={isLoading} type="submit" />
                <Btn content="Stop" onClick={() => stop()} />
            </form>
            <div ref={optsRef} className={`${optsWindow ? 'block' : 'hidden'} absolute p-4 rounded-sm bg-gradient-to-b backdrop-blur-[2px] border-borders/50 border from-gray/75 to-gray top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-4`}>
                <h2 className='text-lg font-einaBold'>Options</h2>
                <div className='flex flex-col gap-4'>
                    <button onClick={() => setUseMd(!useMd)} className='flex justify-between items-center gap-4'>
                        <p>Use markdown for formatting</p>
                        <div className={`${useMd ? 'bg-accent' : 'bg-body-dark'} w-8 h-4 relative rounded-full`}>
                            <span className={`h-2 w-2 inline-block absolute ${useMd ? 'right-0' : 'left-0'} -translate-y-1/2 mx-1 top-1/2  rounded-full bg-white`}></span>
                        </div>
                    </button>
                </div>
            </div>
        </section>
    );
}
