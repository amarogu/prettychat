import Input from "@/app/Input";

export default function Sidebar() {
    return (
        <aside className="h-full flex flex-col gap-8 w-2/3 max-w-xs">
            <div className="flex justify-between items-center">
                <h1 className="text-xl font-einaBold">Chats</h1>
                <p className="text-xl">+</p>
            </div>
            <Input placeholder="Search" className="outline-gray bg-gray" />
        </aside>
    )
}