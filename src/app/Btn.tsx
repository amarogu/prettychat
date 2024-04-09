import Link from "next/link";

interface BtnProps {
    content: string | React.ReactNode;
    onClick?: (() => void) | ((e: React.MouseEvent<HTMLButtonElement>) => void);
    href?: string;
    type?: 'button' | 'submit' | 'reset' | 'file';
    disabled?: boolean;
    className?: string;
    id?: string;
}

export default function Btn({content, onClick, href, disabled, type, className, id}: BtnProps) {
    if (type === 'file') {
        return (
            <>
                <label htmlFor={id} className={`bg-accent-100 self-stretch flex items-center justify-center cursor-pointer dark:bg-dark-accent-100 py-2 px-4 rounded-sm focus:outline outline-offset-2 outline-accent`}>{content}</label>
                <input id={id} type={type} className="hidden" />
            </>
        )
    } else if (onClick) {
        return (
            <button type={type} disabled={disabled} onClick={onClick} className={`bg-accent-100 ${className ? className : ''} dark:bg-dark-accent-100 py-2 px-4 rounded-sm focus:outline outline-offset-2 outline-accent`}>{content}</button>
        )
    } else if (href) {
        return (
            <Link aria-disabled={disabled} className="bg-accent-100 dark:bg-dark-accent-100 text-center px-4 py-2 rounded-sm focus:outline outline-offset-2 outline-accent" href={href}>{content}</Link>
        )
    } else {
        return (
            <button type={type} disabled={disabled} className={`bg-accent-100 ${className ? className : ''} dark:bg-dark-accent-100 px-4 py-2 rounded-sm focus:outline outline-offset-2 outline-accent`}>{content}</button>
        )
    }
}