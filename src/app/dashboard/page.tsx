import Input from "../Input";
import Popup from "../Popup";

export default function Dashboard() {
    return (
        <main className="h-screen p-8">
            <Popup title="Great, you are in!" message="Remember. everything here is self-hosted, so you're fine inserting your API key.">
                <Input placeholder="API Key" />
            </Popup>
        </main>
    )
}