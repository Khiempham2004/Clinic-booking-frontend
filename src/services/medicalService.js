import axiosClient from "../utils/axiosClient.js";

export const getAllMedical = () => {
    return axiosClient.get('/medicalrecord')
}

export const getMedicalById = (id) => {
    return axiosClient.get(`/medicalrecord/${id}`)
}

export const createMedical = (data) => {
    return axiosClient.post("/medicalrecord" , data)
}

export const updateMedical = (id ,data) => {
    return axiosClient.patch(`/medicalrecord/${id}`,data)
}

export const deleteMedical = (id) => {
    return axiosClient.delete(`/medicalrecord/${id}`)
}

const medicalService = {
    getAllMedical,
    getMedicalById,
    createMedical,
    updateMedical,
    deleteMedical,
}
export default medicalService;