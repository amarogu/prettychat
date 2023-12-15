import { useGlobalState } from "../GlobalStateContext";
import { User } from "../Classes";

export const getUser = async () => {
    const { axiosInstance } = useGlobalState();
    const response = await axiosInstance.get('/user');
    // Map the response data to User instances
    const user = response.data.map((userData: User) => new User(userData._id, userData.username));
    return user;
}

export const login = async (username: String, password: String) => {
    const {axiosInstance} = useGlobalState();
    const response = await axiosInstance.post('/login', {username: username, password: password});
}