interface InputProps {
    placeholder: string;
    id?: string;
    type?: string;
    className?: string;
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLInputElement>) => void;
    value?: string;
}

export default function Input({placeholder, id, type, className, onChange, value}: InputProps) {
    return (
        <>
            {
                type === 'textarea' ? <textarea value={value} onChange={onChange} id={id} placeholder={placeholder} className={`rounded-sm focus:outline outline-offset-2 placeholder-text-100 dark:placeholder-dark-text-100 ${className ? className : 'outline-bg-300 dark:outline-dark-bg-300 bg-bg-200 dark:bg-dark-bg-200'} px-4 py-2`} /> : <input onChange={onChange} value={value} type={type ?? 'text'} id={id} placeholder={placeholder} className={`rounded-sm focus:outline outline-offset-2 placeholder-text-100 dark:placeholder-dark-text-100 ${className ? className : 'outline-bg-300 dark:outline-dark-bg-300 bg-bg-200 dark:bg-dark-bg-200'} px-4 py-2`} />
            }
        </>
    )
}