'use client';
import Btn from "../../Btn";
import Input from "../../Input";
import Popup from "../../Popup";
import Res from "../../../../Classes/Res";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axiosInstance from "../../../../axiosInstance";
import { signIn } from "next-auth/react";

export default function App() {

    const router = useRouter();

    const handleContinue = async () => {
        const apiKeyInput = document.getElementById('api-key') as HTMLInputElement;
        const apiKeyNameInput = document.getElementById('api-key-name') as HTMLInputElement;
        const passwordInput = document.getElementById('password') as HTMLInputElement;
        if (apiKeyInput.value === '' || apiKeyNameInput.value === '' || passwordInput.value === '') {
            return new Res('Please fill out all the fields.', 0);
        } else {
            try {
                const res = await axiosInstance.post('/key', {name: apiKeyNameInput.value, key: apiKeyInput.value, password: passwordInput.value});
                return new Res(res.data.message, res.status);
            } catch(err: any) {
                return new Res(err.response.data.message, err.response.status);
            }
        }
    }

    const [res, setRes] = useState<Res>({message: '', status: 0});

    return (
        <main className="h-screen flex items-center justify-center p-8">
            <Popup title="Register" message="Remember. Everything here is self-hosted, so you're fine inserting your API key.">
                <form className="flex flex-col gap-4">
                    <Input id="api-key" placeholder="API Key" />
                    <Input id="api-key-name" placeholder="API Key Name" />
                    <Input type="password" id="password" placeholder="Password" />
                    <Btn onClick={async (e) => {
                        e.preventDefault();
                        const response = await handleContinue();
                        setRes(response);
                        const nameInput = document.getElementById('api-key-name') as HTMLInputElement;
                        const passwordInput = document.getElementById('password') as HTMLInputElement;
                        const name = nameInput.value;
                        const password = passwordInput.value;
                        if (response.message === 'The API key was successfully registered.') {
                            const signInRes = await signIn('credentials', {
                                name,
                                password,
                                redirect: false
                            });
                            if(signInRes?.error) {
                                console.log(signInRes.error);
                                setRes(new Res('Invalid credentials.', 401));
                                return;
                            }
                            setTimeout(() => {
                                router.replace('/app/chat');
                            }, 1500);
                        }
                    }} content="Continue" />
                </form>
                <p>{res.message}</p>
            </Popup>
        </main>
    )
}