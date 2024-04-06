import React from "react";

interface PopupProps {
    title: string;
    message: (string | JSX.Element)[] | (string | JSX.Element);
    children: React.ReactNode;
}

export default function Popup({title, message, children}: PopupProps) {
    return (
        <div className="p-4 bg-bg-200 dark:bg-dark-bg-200 w-1/3 max-w-[350px] rounded-sm">
                <div className="flex flex-col gap-4">
                    <p className="text-lg font-bold">{title}</p>
                    <p>{message}</p>
                    {children}
                </div>
            </div>
    )
}