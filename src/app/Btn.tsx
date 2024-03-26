interface BtnProps {
    content: string;
}

export default function Btn({content}: BtnProps) {
    return (
        <button className="bg-accent p-2 rounded-sm focus:outline outline-offset-2 outline-accent">{content}</button>
    )
}