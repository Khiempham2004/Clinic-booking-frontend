import axiosClient from "../utils/axiosClient.js";


export const getAllPatient = () => {
    return axiosClient.get('/patient')
};

export const getPatientById = (id) => {
    return axiosClient.get(`/patient/${id}`);
};

export const createPatient = (data) => {
    return axiosClient.post('/patient', data)
};

export const updatePatient = (id, data) => {
    return axiosClient.put(`/patient/${id}`, data);
};

export const deletedPatient = (id) => {
    return axiosClient.delete(`/patient/${id}`);
};

const patientService = {
    getAllPatient,
    getPatientById,
    createPatient,
    updatePatient,
    deletedPatient
}
export default patientService;