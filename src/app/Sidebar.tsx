import Image from "next/image"
import { Create } from "@mui/icons-material"

export default function Sidebar() {
    return (
        <section className="max-w-xs">
            <div className="flex justify-between items-center">
                <h1 className="text-xl font-einaBold">Chats</h1>
                <Create className="text-sm" />
            </div>
        </section>
    )
}