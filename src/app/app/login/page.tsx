'use client';
import Btn from "../../Btn";
import Input from "../../Input";
import Popup from "../../Popup";
import axios from "axios";
import Res from "../../../../Classes/Res";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function App() {

    const router = useRouter();

    const handleContinue = async () => {
        const nameInput = document.getElementById('api-key-name') as HTMLInputElement;
        const passwordInput = document.getElementById('password') as HTMLInputElement;
        const name = nameInput.value;
        const password = passwordInput.value;

        try {
            const res = await signIn('credentials', {
                name, password, redirect: false 
            })
            if (res?.error) {
                return new Res('Invalid credentials.', 401);
            }
            router.replace('/app/chat');
        } catch(err: any) {
            console.log(err);
        }
        
    }

    const [res, setRes] = useState<Res | undefined>({message: '', status: 0});

    return (
        <main className="h-screen flex items-center justify-center p-8">
            <Popup title="Login 🚪" message="To login, please insert the name assigned to your API Key and its password, both of which were defined at the moment of registration.">
                <form className="flex flex-col gap-4">
                    <Input id="api-key-name" className="outline-bg-300 dark:outline-dark-bg-300 bg-bg-300 dark:bg-dark-bg-300" placeholder="API Key Name" />
                    <Input id="password" className="outline-bg-300 dark:outline-dark-bg-300 bg-bg-300 dark:bg-dark-bg-300" type="password" placeholder="API Key password" />
                    <Btn onClick={async (e) => {
                        e.preventDefault();
                        setRes(await handleContinue());
                    }} content="Continue" />
                </form>
                <p>{res?.message}</p>
            </Popup>
        </main>
    )
}