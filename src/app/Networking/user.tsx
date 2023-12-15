import { User } from "../Classes";
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3277/',
    timeout: 1000,
    withCredentials: true,
});

export const getUser = async () => {
    const response = await axiosInstance.get('/user');
    // Map the response data to User instances
    const user = new User(response.data._id, response.data.username);
    console.log(response)
    return user;
}

export const login = async (username: String, password: String) => {
    const response = await axiosInstance.post('/login', {username: username, password: password});
    return response.data;
}

export const logout = async () => {
    const response = await axiosInstance.get('/logout');
    return response.data;
}

export const register = async (username: String, password: String) => {
    const response = await axiosInstance.post('/register', {username: username, password: password});
    return response.data;
}