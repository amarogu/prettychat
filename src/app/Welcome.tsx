'use client';
import { useState } from 'react';
import Btn from "./Btn";
import axios from "axios";
import { useRouter } from 'next/navigation';

interface PopupProps {
    title: string;
    message: (string | JSX.Element)[];
    type: string;
    input?: string;
    btn?: string;
}

function checkServerStatus(value: string): Promise<string> {
    return axios.get(`${value}${value.endsWith('/') ? '' : '/'}check-status`, {}).then(() => {
      return 'Server is up and running';
    }).catch(err => {
      return 'Server is down';
    });
}

export default function Welcome({title, message, type, input, btn}: PopupProps) {
    const router = useRouter();
    const [serverStatus, setServerStatus] = useState<string>('');

    const render = () => {
        switch (type) {
            case 'input':
                return <input id={input} placeholder={input} className="rounded-sm focus:outline outline-offset-2 placeholder-body-dark outline-background bg-background p-2" />
                break;
            case 'button':
                return <button className="p-2 border border-gray rounded-sm">Continue</button>
                break;
            default:
                break;
        }
    }

    return (
        <div className="p-4 bg-gray w-1/3 max-w-[350px] rounded-sm">
            <div className="flex flex-col gap-4">
                <p className="text-lg font-bold">{title}</p>
                <p>{message}</p>
                {render()}
                <Btn onClick={async () => {
                    const status = await checkServerStatus((document.getElementById(input ?? '') as HTMLInputElement).value);
                    setServerStatus(status);
                    if (status === 'Server is up and running') {
                        // Redirect to the next page
                        setTimeout(() => {
                            router.push('/dashboard');
                        }, 1000);
                    }
                }} content={btn ?? ''} />
                <p>{serverStatus}</p>
                {
                    serverStatus === 'Server is up and running' ? 
                        <div className='flex items-center gap-2'>
                            <p className="text-sm">Redirecting</p>
                            <div className="animate-pulse w-2 h-2 bg-body-dark-emphasized rounded-full"></div>
                        </div>
                    : ''
                }
            </div>
        </div>
    )
}