import Image from "next/image"
import Searchbar from "./Searchbar"
import ChatComponent from "./Chat"
import { Create } from "@mui/icons-material"

class Message {
    origin: String;
    content: String;

    constructor(origin: String, content: String) {
        this.origin = origin
        this.content = content
    }
}
class Chat {
    title: String;
    description: String;
    messages: Array<Message>;

    constructor(title: String, description: String, messages: Array<Message>) {
        this.title = title
        this.description = description
        this.messages = messages
    }
}

export default function Sidebar() {
    return (
        <section className="max-w-xs flex gap-3 flex-col">
            <div className="flex justify-between items-center">
                <h1 className="text-xl font-einaBold">Chats</h1>
                <Create className="text-sm" />
            </div>
            <Searchbar />
            <ChatComponent />
        </section>
    )
}