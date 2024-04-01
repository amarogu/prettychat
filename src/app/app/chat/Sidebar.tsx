'use client';
import Input from "@/app/Input";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import Account from '../../../../public/account_circle.svg';
import { IChat } from "../../../../models/Chat";
import Delete from "../../../../public/delete.svg";

interface SidebarProps {
    chats: IChat[];
    createChat: () => void;
    deleteChat: (chatID: string) => void;
}

export default function Sidebar({chats, createChat, deleteChat}: SidebarProps) {

    const {data: session} = useSession();

    return (
        <aside className="h-full flex flex-col gap-8 w-2/3 max-w-xs">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-einaBold">Chats</h2>
                <button className="text-xl" onClick={createChat}>+</button>
            </div>
            <Input placeholder="Search" className="outline-gray bg-gray" />
            <div className="grow flex overflow-y-scroll flex-col gap-4">{
                chats.map((chat) => {
                    const date = new Date(chat.updatedAt);
                    const formattedDate = `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`;
                    return (
                        <button className="text-left">
                            <div key={chat._id} className="flex flex-col gap-2 p-4 rounded-sm bg-gray">
                                <div className="flex items-center justify-between">
                                    <p>{chat.title}</p>
                                    <button className="hover:scale-125" onClick={() => deleteChat(chat._id)}>
                                        <Image src={Delete} width={16} alt="Delete chat" />
                                    </button>
                                </div>
                                <p className="text-body-dark">{formattedDate}</p>
                            </div>
                        </button>
                    )
                })
            }</div>
            <div className="flex p-4 rounded-sm bg-gray">
                <div className="flex items-start flex-col gap-2">
                    <div className="flex gap-2 items-center">
                        <Image src={Account} width={16} alt="Profile placeholder image" />
                        <p>{session?.user?.name}</p>
                    </div>
                    <button className="text-body-dark" onClick={() => signOut()}>Log out</button>
                </div>
            </div>
        </aside>
    )
}