import React, { useState, useEffect, useRef } from 'react';
import Btn from "@/app/Btn";
import Input from "@/app/Input";
import { IChat } from "../../../../models/Chat";
import { useChat } from 'ai/react';
import axiosInstance from '../../../../axiosInstance';
import Settings from '../../../../public/settings.svg';
import SettingsDark from '../../../../public/settings_dark.svg';
import Image from 'next/image';
import Markdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { prism, materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Attach from '../../../../public/attach_file.svg';
import AttachDark from '../../../../public/attach_file_dark.svg';

interface ChatWindowProps {
    chat: IChat | null;
    getChat: (chatId: string) => void;
}

export default function ChatWindow({chat, getChat}: ChatWindowProps) {

    const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

    useEffect(() => {
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setIsDarkMode(true);
        }
    }, []);

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

    const [useMd, setUseMd] = useState<boolean>(true);

    const { messages, input, handleInputChange, handleSubmit, isLoading, stop, setMessages } = useChat({body: {chatId: chat?._id, model: model, useMd: useMd}, api: '/api/message', id: chat?._id, onFinish: chat?.title === 'New chat' ? generateTitle : () => {return;}});

    const shouldDisplayChat = () => {
        if (messages.length !== 0) {
            return messages.map((message) => {return (
                <div key={message.id} className={`${message.role === 'user' ? 'self-end ml-8' : 'self-start mr-8'} bg-bg-200 dark:bg-dark-bg-200 flex flex-col gap-2 p-4`}>
                    {useMd ? 
                    <Markdown
                        children={message.content}
                        components={{
                        code(props) {
                            const {children, className, node, ...rest} = props
                            const match = /language-(\w+)/.exec(className || '')
                            return match ? (
                                <SyntaxHighlighter PreTag='div' style={isDarkMode ? materialDark : prism} language={match[1]} children={String(children).replace(/\n$/, '')} />
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
                    <p className="text-text-100/75 dark:text-dark-text-100/75">{message.role === 'assistant' ? 'Assistant' : chat?.name}</p>
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
            setMessages(chat.messages.map(msg => {return {id: msg._id, content: msg.content, role: msg.role, createdAt: new Date(msg.createdAt)}}));
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

    const chatEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView();
    };

    useEffect(scrollToBottom, [messages]);

    return (
        <section className="flex h-full grow gap-4 flex-col">
            <div className='flex justify-between items-center'>
                <div className='flex gap-4 items-center'> 
                    <h2 className='text-xl font-einaBold'>{chat?.title}</h2>
                    <div className='relative'>
                        <button className='text-lg' ref={btnRef} onClick={() => setOpen(!open)}>{parseModel(model)}</button>
                        <div ref={modelsRef} className={`absolute z-10 backdrop-blur-[2px] ${open ? 'block' : 'hidden'} p-4 rounded-sm border-primary-300/50 dark:border-dark-primary-300/50 border bottom-0 bg-gradient-to-b from-bg-300/75 dark:from-dark-bg-300/75 to-bg-300 dark:to-dark-bg-300 translate-y-[calc(100%+1rem)] w-60`}>
                            <ul className='flex gap-2 flex-col'>
                                {   
                                models.map((m, i) => {
                                    return (
                                        <li className='flex justify-between gap-4 items-center' key={i}>
                                            <button onClick={() => setModel(m)}>{parseModel(m)}</button>
                                            {model === m ? <div className='w-1 h-1 rounded-full bg-text-100 dark:bg-dark-text-100'></div> : null}
                                        </li>
                                    )
                                })
                                }
                            </ul>
                        </div>
                    </div>
                </div>
                <button ref={optsBtnRef} onClick={() => setOptsWindow(!optsWindow)}><Image width={16} height={16} src={isDarkMode ? SettingsDark : Settings} alt='Options' /></button>
            </div>
            <div className="grow flex flex-col gap-4 overflow-y-scroll justify-start">
                {shouldDisplayChat()}
                <div ref={chatEndRef}></div>
            </div>
            <form className="flex gap-2 items-end" onSubmit={handleSubmit}>
                <Input type='textarea' value={input} onChange={handleInputChange} id="message-input" placeholder="Type a message" className="grow outline-bg-300 dark:outline-dark-bg-300 bg-bg-200 dark:bg-dark-bg-200" />
                <Btn content="Send" disabled={isLoading} type="submit" />
                <Btn content="Stop" onClick={() => stop()} />
                <Btn id='attach-file' type='file' content={isDarkMode ? <Image src={AttachDark} alt='Attach file' width={16} height={16} /> : <Image src={Attach} width={16} height={16} alt='Attach file' />} />
            </form>
            <div ref={optsRef} className={`${optsWindow ? 'block' : 'hidden'} absolute p-4 rounded-sm bg-gradient-to-b backdrop-blur-[2px] border-primary-300/50 dark:border-dark-primary-300/50 border from-bg-300/75 dark:from-dark-bg-300/75 to-bg-300 dark:to-dark-bg-300 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-4`}>
                <h2 className='text-lg font-einaBold'>Options</h2>
                <div className='flex flex-col gap-4'>
                    <button onClick={() => setUseMd(!useMd)} className='flex justify-between items-center gap-4'>
                        <p>Use markdown for formatting</p>
                        <div className={`${useMd ? 'bg-primary-200 dark:bg-dark-primary-300' : 'bg-primary-100 dark:bg-dark-primary-200'} w-8 h-4 relative rounded-full`}>
                            <span className={`h-2 w-2 inline-block absolute ${useMd ? 'right-0 dark:bg-dark-bg-300' : 'left-0'} -translate-y-1/2 mx-1 top-1/2  rounded-full bg-bg-300`}></span>
                        </div>
                    </button>
                </div>
            </div>
        </section>
    );
}
