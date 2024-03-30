'use client';
import Popup from "@/app/Popup";
import Btn from "@/app/Btn";
import { useSession, signOut } from "next-auth/react";
import Sidebar from "./Sidebar";

export default function Chat() {
    const {data: session} = useSession();
    return (
        <main className="p-8 h-screen">
            <Sidebar />
        </main>
    )
}