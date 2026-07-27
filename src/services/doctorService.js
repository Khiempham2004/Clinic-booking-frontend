import axiosClient from "../utils/axiosClient.js";


export const getAllDoctor = () => {
    return axiosClient.get('/doctor')
};

export const getAvailability = (id) => {
    return axiosClient.get(`/doctor/${id}/availability`)
};

export const getDoctorDetail = (id) => {
    return axiosClient.get(`/doctor/${id}`)
};

export const createDoctor = (data) => {
    return axiosClient.post('/doctor', data)
}

export const updateDoctor = (id, data) => {
    return axiosClient.patch(`/doctor/${id}`, data)
}

export const deletedDoctor = (id) => {
    return axiosClient.delete(`/doctor/${id}`)
}

const doctorService = {
    getAllDoctor,
    getAvailability,
    getDoctorDetail,
    createDoctor,
    updateDoctor,
    deletedDoctor,
}

export default doctorService;
