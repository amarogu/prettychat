interface InputProps {
    placeholder: string;
    id?: string;
    type?: string;
    className?: string;
}

export default function Input({placeholder, id, type, className}: InputProps) {
    return (
        <input type={type ?? 'text'} id={id} placeholder={placeholder} className={`rounded-sm focus:outline outline-offset-2 placeholder-body-dark ${className ? className : 'outline-background bg-background'} px-4 py-2`} />
    )
}