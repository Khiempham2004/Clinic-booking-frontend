import axiosClient from "../utils/axiosClient.js";

export const getAllAppointment = () => {
    return axiosClient.get('/appointment')
}

export const getAppointmentById = (id) => {
    return axiosClient.get(`/appointment/${id}`)
}

export const createAppointment = (data) => {
    return axiosClient.post('/appointment', data)
}

export const updateAppointment = (id, data) => {
    return axiosClient.patch(`/appointment/${id}`, data)
}

export const deletedAppointment = (id) => {
    return axiosClient.delete(`/appointment/${id}`)
}

export const updateAppointmentStatus = (id , status) => {
    return axiosClient.patch(`/appointment/${id}/status` , status)
}

const appointmentService = {
    getAllAppointment,
    getAppointmentById,
    createAppointment,
    updateAppointment,
    deletedAppointment,
    updateAppointmentStatus
}
export default appointmentService;