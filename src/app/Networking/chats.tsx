import { Chat } from "../Classes";
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3277/',
    timeout: 1000,
    withCredentials: true,
});

export const getChats = async () => {
    const response = await axiosInstance.get('/chats');
    
    // Map the response data to Chat instances
    const chats = response.data.map((chatData: Chat) => new Chat(chatData._id, chatData.title, chatData.description, chatData.messages, chatData.user, chatData.__v));
    
    return chats;
}