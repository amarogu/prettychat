interface InputProps {
    placeholder: string;
}

export default function Input({placeholder}: InputProps) {
    return (
        <input placeholder={placeholder} className="rounded-sm focus:outline outline-offset-2 placeholder-body-dark outline-background bg-background p-2" />
    )
}