'use client';
import Btn from "@/app/Btn";
import Input from "@/app/Input";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import Account from '../../../../public/account_circle.svg';
import axiosInstance from "../../../../axiosInstance";
import { useState } from "react";

export default function Sidebar() {

    const {data: session} = useSession();

    const [chats, setChats] = useState<any[]>([]);

    const createChat = async () => {
        await axiosInstance.post('/createChat', {name: session?.user?.name});
        const chats = await axiosInstance.post('/chats', {name: session?.user?.name});
        console.log(chats);
    }

    return (
        <aside className="h-full flex flex-col gap-8 w-2/3 max-w-xs">
            <div className="flex justify-between items-center">
                <h1 className="text-xl font-einaBold">Chats</h1>
                <button className="text-xl" onClick={createChat}>+</button>
            </div>
            <Input placeholder="Search" className="outline-gray bg-gray" />
            <div className="grow"></div>
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