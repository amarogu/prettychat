import Image from "next/image"
import Searchbar from "./Searchbar"
import ChatComponent from "./Chat"
import { Create } from "@mui/icons-material"
import { useGlobalState } from "./GlobalStateContext"
import { getChats } from "./Networking/chat"
import { Account } from "./Account"

export function Sidebar() {
    const { chats, setChats } = useGlobalState();
    //getChats().then((chats) => setChats(chats));
    return (
        <section className="max-w-xs flex gap-3 flex-col relative">
            <div className="flex justify-between items-center">
                <h1 className="text-xl font-einaBold">Chats</h1>
                <Create className="text-sm" />
            </div>
            <Searchbar />
            {
                chats.map((chat) => <ChatComponent />)
            }
            <Account />
        </section>
    )
}