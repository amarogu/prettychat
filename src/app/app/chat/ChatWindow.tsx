'use client';
import Btn from "@/app/Btn";
import Input from "@/app/Input";
import { IChat } from "../../../../models/Chat";
import { useCompletion } from 'ai/react';

interface ChatWindowProps {
    chat: IChat | null;
}

export default function ChatWindow({chat}: ChatWindowProps) {

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
            sender: 'system',
            chatId: chat?._id
        }
    });

    return (
        <section className="flex h-full grow gap-4 flex-col">
            <div className="grow flex flex-col gap-4 overflow-y-scroll justify-start">
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
            <form className="flex gap-2" onSubmit={(e) => {handleSubmit(e)}}>
                <Input value={input} onChange={handleInputChange} id="message-input" placeholder="Type a message" className="bg-gray grow outline-gray" />
                <Btn content="Send" disabled={isLoading} type="submit" />
                <Btn content="Stop" onClick={() => stop} />
            </form>
        </section>
    )
}