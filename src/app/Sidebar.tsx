import Image from "next/image"
import Searchbar from "./Searchbar"
import Chat from "./Chat"
import { Create } from "@mui/icons-material"

export default function Sidebar() {
    return (
        <section className="max-w-xs flex gap-3 flex-col">
            <div className="flex justify-between items-center">
                <h1 className="text-xl font-einaBold">Chats</h1>
                <Create className="text-sm" />
            </div>
            <Searchbar />
            <Chat />
        </section>
    )
}