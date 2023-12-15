import { useGlobalState } from "../GlobalStateContext";

export const getChats = async () => {
    const { axiosInstance } = useGlobalState();
    const response = await axiosInstance.get('/chat');
    return response;
}