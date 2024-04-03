import React, { useState, useEffect } from 'react';
import Btn from "@/app/Btn";
import Input from "@/app/Input";
import { IChat } from "../../../../models/Chat"; // Ensure IMessage is imported
import { IMessage } from "../../../../models/Message"; // Ensure IMessage is imported
import { useCompletion } from 'ai/react';
import { v4 as uuidv4 } from 'uuid';

interface ChatWindowProps {
    chat: IChat | null;
    getChat: (chatId: string) => void;
}

export default function ChatWindow({chat, getChat}: ChatWindowProps) {

    const [localChat, setLocalChat] = useState<IChat | null>(chat);
    const [useLocal, setUseLocal] = useState<boolean>(true);

    const {
        completion,
        input,
        stop,
        isLoading,
        handleInputChange,
        handleSubmit,
    } = useCompletion({
        api: '/api/message',
        body: {
            sender: 'user',
            chatId: chat?._id
        },
        onFinish: () => {
            if (chat?._id) {
                setUseLocal(false);
                getChat(chat._id);
            }
        }
    });

    useEffect(() => {
        if (completion) {

        }
    }, [completion])

    return (
        <section className="flex h-full grow gap-4 flex-col">
            <div className="grow flex flex-col gap-4 overflow-y-scroll justify-start">
                {!useLocal ?
                    (chat?.messages.length !== 0 ? chat?.messages.map((message) => (
                        <div key={message._id} className={`${message.sender === 'user' ? 'self-end' : 'self-start'} bg-gray px-4 py-2`}>
                            <p>{message.content}</p>
                            <p className="text-body-dark">{message.sender === 'system' ? 'System' : chat.name}</p>
                        </div>
                    )) : (
                        <div className="grow flex flex-col justify-center items-center">
                            <h1 className="text-2xl font-einaBold">New Chat</h1>
                            <p className="w-1/4 text-center">To begin chatting, start typing in the input field below.</p>
                        </div>
                    )) : (localChat?.messages.length !== 0 ? localChat?.messages.map((message) => (
                        <div key={message._id} className={`${message.sender === 'user' ? 'self-end' : 'self-start'} bg-gray px-4 py-2`}>
                            <p>{message.content}</p>
                            <p className="text-body-dark">{message.sender === 'system' ? 'System' : localChat.name}</p>
                        </div>
                    )) : (
                        <div className="grow flex flex-col justify-center items-center">
                            <h1 className="text-2xl font-einaBold">New Chat</h1>
                            <p className="w-1/4 text-center">To begin chatting, start typing in the input field below.</p>
                        </div>
                    ))
                }
            </div>
            <form className="flex gap-2" onSubmit={(e) => {
                setUseLocal(true);
                for (let i = 0; i < 2; i++) {
                    const msg: IMessage = {
                        _id: uuidv4(),
                        content: i === 0 ? input : '',
                        sender: i === 0 ? 'user' : 'system',
                        updatedAt: new Date().toISOString(),
                        createdAt: new Date().toISOString(),
                        __v: 0
                    };
                    localChat?.messages.push(msg);
                }
                handleSubmit(e);
            }}>
                <Input value={input} onChange={handleInputChange} id="message-input" placeholder="Type a message" className="bg-gray grow outline-gray" />
                <Btn content="Send" disabled={isLoading} type="submit" />
                <Btn content="Stop" onClick={() => stop} />
            </form>
        </section>
    );
}
