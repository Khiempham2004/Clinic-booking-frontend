import axiosClient from "../utils/axiosClient.js";

export const login = (data) => axiosClient.post('/auth/login', data);

export const register = (data) => axiosClient.post('/auth/register', data);

export const setAuthToken = (token) => {
    if (token) {
        localStorage.setItem('token', token);
    } else {
        localStorage.removeItem('token');
    }
};

export const getToken = () => localStorage.getItem('token');

export const setUser = (user) => {
    if (user) localStorage.setItem('user', JSON.stringify(user));
    else localStorage.removeItem('user');
};

export const getUser = () => {
    try {
        return JSON.parse(localStorage.getItem('user'));
    } catch (err) {
        return null;
    }
};

export const clearUser = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
};

