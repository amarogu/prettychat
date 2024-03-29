interface InputProps {
    placeholder: string;
    id?: string;
    type?: string;
}

export default function Input({placeholder, id, type}: InputProps) {
    return (
        <input type={type ?? 'text'} id={id} placeholder={placeholder} className="rounded-sm focus:outline outline-offset-2 placeholder-body-dark outline-background bg-background p-2" />
    )
}