import { useGlobalState } from "./GlobalStateContext"
import { Chat as ChatClass } from "./Classes"

interface ChatProps {
    chat: ChatClass
}

export default function Chat({ chat }: ChatProps) {

    return (
        <div className="flex flex-col gap-2 bg-gray py-3 px-5 rounded">
            <h2>
                {chat.title}
            </h2>
            <p className="text-body-dark">
                {chat.description}
            </p>
        </div>
    )
}