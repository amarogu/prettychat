import Link from "next/link";

interface BtnProps {
    content: string;
    onClick?: (() => void) | ((e: React.MouseEvent<HTMLButtonElement>) => void);
    href?: string;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
}

export default function Btn({content, onClick, href, disabled, type}: BtnProps) {
    if (onClick) {
        return (
            <button type={type} disabled={disabled} onClick={onClick} className="bg-accent py-2 px-4 rounded-sm focus:outline outline-offset-2 outline-accent">{content}</button>
        )
    } else if (href) {
        return (
            <Link aria-disabled={disabled} className="bg-accent text-center px-4 py-2 rounded-sm focus:outline outline-offset-2 outline-accent" href={href}>{content}</Link>
        )
    } else {
        return (
            <button type={type} disabled={disabled} className="bg-accent px-4 py-2 rounded-sm focus:outline outline-offset-2 outline-accent">{content}</button>
        )
    }
}