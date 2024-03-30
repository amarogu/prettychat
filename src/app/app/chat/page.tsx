'use client';
import Popup from "@/app/Popup";
import Btn from "@/app/Btn";
import { useSession, signOut } from "next-auth/react";

export default function Chat() {
    const {data: session} = useSession();
    return (
        <main>
            <h1>{session?.user?.name}</h1>
            <Btn content="logout" onClick={() => {
                signOut();
            }} />
        </main>
    )
}