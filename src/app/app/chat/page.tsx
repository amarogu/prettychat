import Popup from "@/app/Popup";
import Res from "../../../../Classes/Res";
import axiosInstance from "../../../../axiosInstance";
import Btn from "@/app/Btn";

export default async function Chat({searchParams}: {searchParams: {key: string}}) {

    const key = searchParams.key;
    const res = await axiosInstance.post('/validate-key', {key: key});
    const data: Res = res.data;

    if (data.message === 'match found') {
        return (
            <main>
                <h1>Chat</h1>
            </main>
        )
    } else {
        return (
            <main className="flex h-screen items-center justify-center">
                <Popup title="401 Unauthorized" message="Unregistered API key">
                    <p>Please register an API key before trying to access this page.</p>
                    <Btn content="Go back" href='/app' />
                </Popup>
            </main>
        )
    }
}