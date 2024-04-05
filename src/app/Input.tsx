interface InputProps {
    placeholder: string;
    id?: string;
    type?: string;
    className?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value?: string;
}

export default function Input({placeholder, id, type, className, onChange, value}: InputProps) {
    return (
        <input onChange={onChange} value={value} type={type ?? 'text'} id={id} placeholder={placeholder} className={`rounded-sm focus:outline outline-offset-2 placeholder-text-100 ${className ? className : 'outline-bg-300 bg-bg-200'} px-4 py-2`} />
    )
}