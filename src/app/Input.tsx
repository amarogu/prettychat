import { ReactNode } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

interface InputProps {
    placeholder: string;
    id?: string;
    type?: string;
    className?: string;
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLInputElement>) => void;
    value?: string;
    icon?: ReactNode;
}

export default function Input({placeholder, id, type, className, onChange, value, icon}: InputProps) {
    return (
        <>
            {
                type === 'textarea' 
                ? 
                <TextareaAutosize maxRows={20} className={`rounded-sm focus:outline outline-offset-2 placeholder-text-100 dark:placeholder-dark-text-100 resize-none ${className ? className : 'outline-bg-300 dark:outline-dark-bg-300 bg-bg-200 dark:bg-dark-bg-200'} px-4 py-2`} value={value} onChange={onChange} id={id} placeholder={placeholder} /> 
                : (icon 
                    ? 
                    <div className='flex gap-2 outline-bg-300 dark:outline-dark-bg-300 bg-bg-200 dark:bg-dark-bg-200 px-4 py-2'>
                        {icon}
                        <p>{placeholder}</p>
                    </div> 
                    : 
                    <input onChange={onChange} value={value} type={type ?? 'text'} id={id} placeholder={placeholder} className={`rounded-sm focus:outline outline-offset-2 placeholder-text-100 dark:placeholder-dark-text-100 ${className ? className : 'outline-bg-300 dark:outline-dark-bg-300 bg-bg-200 dark:bg-dark-bg-200'} px-4 py-2`} />
                )
            }
        </>
    )
}