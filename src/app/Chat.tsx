import { useGlobalState } from "./GlobalStateContext"

export default function Chat() {
    const {chats, setChats} = useGlobalState();

    return (
        <div className="flex flex-col gap-2 bg-gray py-3 px-5 rounded">
            <h2>
                Title
            </h2>
            <p className="text-body-dark">
                Message
            </p>
        </div>
    )
}