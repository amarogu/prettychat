import React, { useEffect } from 'react';
import ChatComponent from "./Chat"
import { Create } from "@mui/icons-material"
import { useGlobalState } from "./GlobalStateContext"
import { getUser } from "./Networking/user"
import { getChats } from "./Networking/chats"
import { Account } from "./Account"
import Searchbar from "./Searchbar"

export function Sidebar() {
    const {chats, setChats, setUser, setIsLoggedIn} = useGlobalState(); // Add this line

    useEffect(() => {
        getChats().then(chats => setChats(chats)); // Add this block
    }, []); // Empty dependencies array means this effect runs once on mount and not on updates

    useEffect(() => {
        getUser().then(user => {
            console.log(user)
            setUser(user)
            setIsLoggedIn(true)
        }); // Add this block
    }, []);

    return (
        <section className="max-w-xs flex gap-3 flex-col relative">
            <div className="flex justify-between items-center">
                <h1 className="text-xl font-einaBold">Chats</h1>
                <Create className="text-sm" />
            </div>
            <Searchbar />
            {
                chats.map((chat) => <ChatComponent chat={chat} />)
            }
            <Account />
        </section>
    )
}