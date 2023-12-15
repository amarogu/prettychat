import React, { useEffect, useState } from 'react';
import ChatComponent from "./Chat"
import { Create } from "@mui/icons-material"
import { useGlobalState } from "./GlobalStateContext"
import { getChats } from "./Networking"
import { Account } from "./Account"
import Searchbar from "./Searchbar"

export function Sidebar() {
    const [chats, setChats] = useState([]); // Add this line

    useEffect(() => {
        getChats().then(chats => setChats(chats)); // Add this block
    }, []); // Empty dependencies array means this effect runs once on mount and not on updates

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