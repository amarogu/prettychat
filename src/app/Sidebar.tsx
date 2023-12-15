import Image from "next/image"
import Searchbar from "./Searchbar"
import ChatComponent from "./Chat"
import { Create } from "@mui/icons-material"
import { useGlobalChat } from "./GlobalStateContext"
import { getChats } from "./Networking/chat"

export function Sidebar() {
    const { chats, setChats } = useGlobalChat();
    getChats().then((chats) => setChats(chats));
    return (
        <section className="max-w-xs flex gap-3 flex-col">
            <div className="flex justify-between items-center">
                <h1 className="text-xl font-einaBold">Chats</h1>
                <Create className="text-sm" />
            </div>
            <Searchbar />
            {
                chats.map((chat) => <ChatComponent />)
            }
        </section>
    )
}