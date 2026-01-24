import axios from "axios";

const APIdoctor = "";

export const DoctorList = () => {
    return axios.get('/');
};

export const DoctorDetail = () => {
    return axios.post('/')
};