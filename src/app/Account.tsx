import { useGlobalState } from './GlobalStateContext';
import { getUser } from './Networking/user';

export function Account() {
    const { user, setUser } = useGlobalState();
    getUser().then((user) => setUser(user));

    return (
        <div className="p-4">
            <p>{user?.username}</p>
        </div>
    )
}