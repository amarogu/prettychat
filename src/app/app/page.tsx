'use client';
import Btn from "../Btn";
import Input from "../Input";
import Popup from "../Popup";
import axios from "axios";
import Error from "../../../Interfaces/Error";
import Res from "../../../Interfaces/Res";

export default function App() {

    const handleContinue = async () => {
        // Continue to the next page
        const apiKeyInput = document.getElementById('api-key') as HTMLInputElement;
        try {
            const res = await axios.post('/api/key', {key: apiKeyInput.value});
            return {status: res.status, msg: (res.data as Res).message};
        } catch(err: any) {
            return {status: err.response.status, msg: (err.response.data as Error).message};
        }
    }

    return (
        <main className="h-screen flex items-center justify-center p-8">
            <Popup title="Great, you are in!" message="Remember. everything here is self-hosted, so you're fine inserting your API key.">
                <Input id="api-key" placeholder="API Key" />
                <Btn onClick={handleContinue} content="Continue" />
            </Popup>
        </main>
    )
}