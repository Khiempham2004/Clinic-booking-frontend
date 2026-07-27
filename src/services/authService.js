import axiosClient from "../utils/axiosClient.js";

export const login = (data) => {
    return axiosClient.post('/auth/login', data);
};

export const register = (data) => {
    return axiosClient.post('/auth/register', data);
};

export const getProfile = (data) => {
    return axiosClient.get('/auth/profile', data);
};
export const patchProfile = (data) => {
    return axiosClient.patch('/auth/profile', data);
}


export const setAuthToken = (token) => {
    if (token) {
        localStorage.setItem("token", token);
    } else {
        localStorage.removeItem("token");
    }
};

export const getToken = () => {
    return localStorage.getItem("token");
};

const authService = {
    login,
    register,
    getProfile,
    patchProfile,
    setAuthToken,
    getToken,
}
export default authService;