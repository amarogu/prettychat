'use client';
import Btn from "../Btn";
import Input from "../Input";
import Popup from "../Popup";
import axios from "axios";
import Res from "../../../Classes/Res";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function App() {

    const router = useRouter();

    const handleContinue = async () => {
        const apiKeyInput = document.getElementById('api-key') as HTMLInputElement;
        if (apiKeyInput.value === '') {
            return new Res('Please insert your API key.', 0);
        } else {
            try {
                const res = await axios.post('/api/key', {key: apiKeyInput.value});
                return new Res(res.data.message, res.status);
            } catch(err: any) {
                return new Res(err.response.data.message, err.response.status);
            }
        }
    }

    const [res, setRes] = useState<Res>({message: '', status: 0});

    return (
        <main className="h-screen flex items-center justify-center p-8">
            <Popup title="Great, you are in!" message="Remember. everything here is self-hosted, so you're fine inserting your API key.">
                <Input id="api-key" placeholder="API Key" />
                <Btn onClick={async () => {
                    const response = await handleContinue();
                    setRes(response);
                    if (response.message === 'The API key was successfully registered.') {
                        setTimeout(() => {
                            const input = document.getElementById('api-key') as HTMLInputElement;
                            router.push(`/app/chat?key=${input.value}`,);
                        }, 1500);
                    }
                }} content="Continue" />
                <p>{res.message}</p>
            </Popup>
        </main>
    )
}