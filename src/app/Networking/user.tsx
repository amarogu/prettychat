import { User } from "../Classes";
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3277/',
    timeout: 1000,
    withCredentials: true,
});

export const getUser = async () => {
    const response = await axiosInstance.get('/user');
    const user = new User(response.data._id, response.data.username);
    return user;
}

export const login = async (username: String, password: String) => {
    const response = await axiosInstance.post('/login', { username: username, password: password });
    return { data: response.data, status: response.status };
}

export const logout = async () => {
    const response = await axiosInstance.get('/logout');
    return response.data;
}

export const register = async (username: String, password: String) => {
    const response = await axiosInstance.post('/register', { username: username, password: password });
    return { data: response.data, status: response.status };
}