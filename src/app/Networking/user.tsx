import { User } from "../Classes";
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3277/',
    timeout: 1000,
});

export const getUser = async () => {
    const response = await axiosInstance.get('/user');
    // Map the response data to User instances
    const user = response.data.map((userData: User) => new User(userData._id, userData.username));
    return user;
}

export const login = async (username: String, password: String) => {
    const response = await axiosInstance.post('/login', {username: username, password: password});
    return response.data;
}