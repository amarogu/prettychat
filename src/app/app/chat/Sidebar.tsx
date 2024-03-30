'use client';
import Btn from "@/app/Btn";
import Input from "@/app/Input";
import { useSession, signOut } from "next-auth/react";

export default function Sidebar() {

    const {data: session} = useSession();

    return (
        <aside className="h-full flex flex-col gap-8 w-2/3 max-w-xs">
            <div className="flex justify-between items-center">
                <h1 className="text-xl font-einaBold">Chats</h1>
                <p className="text-xl">+</p>
            </div>
            <Input placeholder="Search" className="outline-gray bg-gray" />
            <div className="grow"></div>
            <div className="flex p-2 rounded-sm bg-gray">
                <div className="flex items-start flex-col gap-2">
                    <p>{session?.user?.name}</p>
                    <button className="text-body-dark" onClick={() => signOut()}>Log out</button>
                </div>
            </div>
        </aside>
    )
}