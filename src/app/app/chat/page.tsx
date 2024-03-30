'use client';
import Popup from "@/app/Popup";
import Btn from "@/app/Btn";
import { useSession, signOut } from "next-auth/react";

export default function Chat() {

    const {data: session} = useSession();

    if (session) {
        return (
            <main>
                <h1>{session?.user?.name}</h1>
                <Btn content="logout" onClick={() => {
                    signOut();
                }} />
            </main>
        )
    } else {
        return (
            <Popup title="Unauthorized" message="You must be logged in to access this page.">
                <Btn content="Login page" href="/app/login" />
            </Popup>
        )
    }
}