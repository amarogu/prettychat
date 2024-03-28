interface InputProps {
    placeholder: string;
    id?: string;
}

export default function Input({placeholder, id}: InputProps) {
    return (
        <input id={id} placeholder={placeholder} className="rounded-sm focus:outline outline-offset-2 placeholder-body-dark outline-background bg-background p-2" />
    )
}