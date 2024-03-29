'use client';
import Btn from "../../Btn";
import Input from "../../Input";
import Popup from "../../Popup";
import axios from "axios";
import Res from "../../../../Classes/Res";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function App() {

    const router = useRouter();

    const handleContinue = async () => {
        const nameInput = document.getElementById('api-key') as HTMLInputElement;
        
    }

    const [res, setRes] = useState<Res>({message: '', status: 0});

    return (
        <main className="h-screen flex items-center justify-center p-8">
            <Popup title="Login 🚪" message="To login, please insert the name assigned to your API Key and its password, both of which were defined at the moment of registration.">
                <form className="flex flex-col gap-4">
                    <Input id="api-key-name" placeholder="API Key Name" />
                    <Input id="password" placeholder="API Key password" />
                    <Btn onClick={async () => {
                        
                    }} content="Continue" />
                </form>
                <p>{res.message}</p>
            </Popup>
        </main>
    )
}