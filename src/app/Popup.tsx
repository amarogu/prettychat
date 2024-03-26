import Btn from "./Btn";

interface PopupProps {
    title: string;
    message: (string | JSX.Element)[];
    type: string;
    input?: string;
    btn?: string;
}

export default function Popup({title, message, type, input, btn}: PopupProps) {

    const render = () => {
        switch (type) {
            case 'input':
                return <input placeholder={input} className="rounded-sm focus:outline outline-offset-2 placeholder-body-dark outline-background bg-background p-2" />
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
                <Btn content={btn ?? ''} />
            </div>
        </div>
    )
}