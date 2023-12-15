import { useGlobalState } from "../GlobalStateContext";
import { User } from "../Classes";

export const getUser = async () => {
    const { axiosInstance } = useGlobalState();
    const response = await axiosInstance.get('/user');
    // Map the response data to User instances
    const user = response.data.map((userData: User) => new User(userData._id, userData.username));
    return user;
}