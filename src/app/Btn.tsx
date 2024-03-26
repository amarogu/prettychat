interface BtnProps {
    content: string;
    onClick?: () => void;
}

export default function Btn({content, onClick}: BtnProps) {
    return (
        <button onClick={onClick} className="bg-accent p-2 rounded-sm focus:outline outline-offset-2 outline-accent">{content}</button>
    )
}