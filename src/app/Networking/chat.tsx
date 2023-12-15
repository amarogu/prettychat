import { useGlobalState } from "../GlobalStateContext";
import { Chat } from "../Classes";

export const getChats = async () => {
    const { axiosInstance } = useGlobalState();
    const response = await axiosInstance.get('/chat');
    
    // Map the response data to Chat instances
    const chats = response.data.map((chatData: Chat) => new Chat(chatData._id, chatData.title, chatData.description, chatData.messages, chatData.user, chatData.__v));
    
    return chats;
}