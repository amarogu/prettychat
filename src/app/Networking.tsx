import { User, Chat } from "./Classes";
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3277/',
    withCredentials: true,
});

export const getUser = async () => {
    const response = await axiosInstance.get('/user');
    // Map the response data to User instances
    console.log(response.data)
    const user = new User(response.data._id, response.data.username);
    return user;
}

export const login = async (username: String, password: String) => {
    const response = await axiosInstance.post('/login', {username: username, password: password});
    return response.data;
}

export const getChats = async () => {
    const response = await axiosInstance.get('/chats');
    
    // Map the response data to Chat instances
    const chats = response.data.map((chatData: Chat) => new Chat(chatData._id, chatData.title, chatData.description, chatData.messages, chatData.user, chatData.__v));
    
    return chats;
}