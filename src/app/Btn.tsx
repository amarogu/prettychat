import Link from "next/link";

interface BtnProps {
    content: string;
    onClick?: (() => void) | ((e: React.MouseEvent<HTMLButtonElement>) => void);
    href?: string;
}

export default function Btn({content, onClick, href}: BtnProps) {
    if (onClick) {
        return (
            <button onClick={onClick} className="bg-accent py-2 px-4 rounded-sm focus:outline outline-offset-2 outline-accent">{content}</button>
        )
    } else if (href) {
        return (
            <Link className="bg-accent text-center px-4 py-2 rounded-sm focus:outline outline-offset-2 outline-accent" href={href}>{content}</Link>
        )
    } else {
        return (
            <button className="bg-accent px-4 py-2 rounded-sm focus:outline outline-offset-2 outline-accent">{content}</button>
        )
    }
}