import axiosClient from "../utils/axiosClient.js";

export const getAllPrescription = () => {
    return axiosClient.get("/prescription");
};

export const getPrescriptionById = (id) => {
    return axiosClient.get(`/prescription/${id}`);
};

export const createPrescription = (data) => {
    return axiosClient.post("/prescription", data);
};

export const updatePrescription = (id, data) => {
    return axiosClient.patch(`/prescription/${id}`, data);
};

export const deletePrescription = (id) => {
    return axiosClient.delete(`/prescription/${id}`);
};

const prescriptionService = {
    getAllPrescription,
    getPrescriptionById,
    createPrescription,
    updatePrescription,
    deletePrescription,
};

export default prescriptionService;