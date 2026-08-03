import axiosClient from "../utils/axiosClient.js";

export const getAllClinic = () => {
    return axiosClient.get('/clinic');
};

export const getClinicById = (id) => {
    return axiosClient.get(`/clinic/${id}`);
}
export const createClinic = (data) => {
    return axiosClient.post('/clinic', data);
}
export const updateClinic = (id) => {
    return axiosClient.patch(`/clinic/${id}`);
}
export const deleteClinic = (id) => {
    return axiosClient.delete(`/clinic/${id}`)
}

const clinicService = {
    getAllClinic,
    getClinicById,
    createClinic,
    updateClinic,
    deleteClinic
};

export default clinicService;
