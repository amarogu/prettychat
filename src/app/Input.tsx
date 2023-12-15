import React from "react"

interface InputProps {
    icon: React.ReactElement;
    placeholder: string;
    type: string;
    value: string;
    onChange: (value: string) => void;
}

export function Input({placeholder, icon, type, value, onChange}: InputProps) {
    return (
        <div className="bg-gray border border-body-dark-emphasized text-body-dark-emphasized rounded py-2 px-3 w-full flex items-center gap-2">
            {icon}
            <input placeholder={placeholder} className="outline-none bg-transparent" type={type} value={value} onChange={e => onChange(e.target.value)}></input>
        </div>
    )
}