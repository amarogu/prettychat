import Btn from "../Btn";
import Input from "../Input";
import Popup from "../Popup";

export default function App() {
    return (
        <main className="h-screen flex items-center justify-center p-8">
            <Popup title="Great, you are in!" message="Remember. everything here is self-hosted, so you're fine inserting your API key.">
                <Input placeholder="API Key" />
                <Btn content="Continue" />
            </Popup>
        </main>
    )
}