import React, { useEffect } from 'react';
import ChatComponent from "./Chat"
import { Create } from "@mui/icons-material"
import { useGlobalState } from "./GlobalStateContext"
import { getUser, logout } from "./Networking/user"
import { getChats } from "./Networking/chats"
import { Account } from "./Account"
import Searchbar from "./Searchbar"
import CloseIcon from '@mui/icons-material/Close';

export function Sidebar() {
    const {chats, setChats, setUser, setIsLoggedIn, isLoggedIn} = useGlobalState(); // Add this line

    useEffect(() => {
        if (isLoggedIn) {
            getChats().then(chats => setChats(chats));
        } // Add this block
    }, []); // Empty dependencies array means this effect runs once on mount and not on updates

    useEffect(() => {
        if (isLoggedIn) {
            getUser().then(user => {
                console.log(user)
                setUser(user)
                setIsLoggedIn(true)
            });
        } // Add this block
    }, []);

    return (
        <section className="max-w-xs flex gap-3 flex-col">
            <div className="flex justify-between items-center">
                <h1 className="text-xl font-einaBold">Chats</h1>
                <Create className="text-sm" />
            </div>
            <Searchbar />
            {
                chats.map((chat) => <ChatComponent chat={chat} />)
            }
            <Account />
            <button onClick={() => {
                logout()
            }}>
                <CloseIcon className='text-sm absolute right-0 top-0 m-4' />
            </button>
        </section>
    )
}