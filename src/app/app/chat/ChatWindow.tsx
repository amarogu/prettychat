import Btn from "@/app/Btn";
import Input from "@/app/Input";
import { IChat } from "../../../../models/Chat";

interface ChatWindowProps {
    chat: IChat | null;
}

export default function ChatWindow({chat}: ChatWindowProps) {
    return (
        <section className="flex h-full grow flex-col">
            <div className="grow flex flex-col justify-center items-center">
                <h1 className="text-2xl font-einaBold">New Chat</h1>
                <p className="w-1/4 text-center">To begin chatting, start typing in the input field below.</p>
            </div>
            <div className="flex gap-2">
                <Input placeholder="Type a message" className="bg-gray grow outline-gray" />
                <Btn content="Send" />
            </div>
        </section>
    )
}