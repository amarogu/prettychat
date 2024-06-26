import Input from "@/app/Input";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import Account from '../../../../public/account_circle.svg';
import { IChat } from "../../../../models/Chat";
import Delete from "../../../../public/delete.svg";
import AccountDark from '../../../../public/account_circle_dark.svg';
import DeleteDark from '../../../../public/delete_dark.svg';
import { useEffect, useState } from "react";
import Search from "../../../../public/search.svg";
import SearchDark from '../../../../public/search_dark.svg';

interface SidebarProps {
    chats: IChat[];
    createChat: () => void;
    deleteChat: (chatID: string) => Promise<void>;
    findChats: (search: string) => void;
    getChat: (chatId: string) => Promise<void>;
}

export default function Sidebar({chats, createChat, deleteChat, findChats, getChat}: SidebarProps) {

    const {data: session} = useSession();
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

    useEffect(() => {
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setIsDarkMode(true);
        }
    }, []);

    return (
        <aside className="h-full flex shrink-0 flex-col gap-8 w-2/3 max-w-xs">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-einaBold">Chats</h2>
                <button className="text-xl" onClick={createChat}>+</button>
            </div>
            <Input id="search-field" placeholder="Search" icon={<Image width={16} height={16} src={isDarkMode ? SearchDark : Search} alt="Search" />} onChange={e => findChats(e.target.value)} />
            <div className="grow flex overflow-y-scroll flex-col gap-4">{
                chats.map((chat, i) => {
                    const date = new Date(chat.updatedAt);
                    const formattedDate = `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`;
                    return (
                        <button key={chat._id} className="text-left" onClick={async () => await getChat(chat._id)}>
                            <div className="flex flex-col gap-2 p-4 rounded-sm bg-bg-200 dark:bg-dark-bg-200">
                                <div className="flex items-center justify-between">
                                    <p>{chat.title}</p>
                                    <button className="hover:scale-125" onClick={async (e) => {e.stopPropagation(); await deleteChat(chat._id)}}>
                                        <Image src={isDarkMode ? DeleteDark : Delete} width={16} alt="Delete chat" />
                                    </button>
                                </div>
                                <p className="text-text-100/75 dark:text-dark-text-100/75">{formattedDate}</p>
                            </div>
                        </button>
                    )
                })
            }</div>
            <div className="flex p-4 rounded-sm bg-bg-200 dark:bg-dark-bg-200">
                <div className="flex items-start flex-col gap-2">
                    <div className="flex gap-2 items-center">
                        <Image src={isDarkMode ? AccountDark : Account} width={16} alt="Profile placeholder image" />
                        <p>{session?.user?.name}</p>
                    </div>
                    <button className="text-body-dark" onClick={() => signOut()}>Log out</button>
                </div>
            </div>
        </aside>
    )
}