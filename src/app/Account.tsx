import { useGlobalState } from './GlobalStateContext';
import { getUser } from './Networking/user';
import LoginIcon from '@mui/icons-material/Login';

export function Account() {
    const { user, setUser, isLoggedIn } = useGlobalState();
    getUser().then((user) => setUser(user));

    return (
        <div className="p-4 bg-gray rounded">
            <button className='flex w-full justify-between items-center'>
                <p className='font-einaBold'>Login</p>
                <LoginIcon className='text-sm' />
            </button>
        </div>
    )
}