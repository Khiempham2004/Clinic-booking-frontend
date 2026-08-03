import axiosClient from "../utils/axiosClient.js";
import { normalizeBookedBy } from "../utils/appointmentUtils.js";

export const getAllAppointment = () => {
    return axiosClient.get('/appointment')
}

export const getAppointmentById = (id) => {
    return axiosClient.get(`/appointment/${id}`)
}

export const createAppointment = (data) => {
    return axiosClient.post('/appointment', data)
}

export const buildAppointmentPayload = (bookingData) => {
    return {
        doctor: bookingData.doctorId,
        appointmentDate: bookingData.date,
        appointmentTime: bookingData.time,
        reason: bookingData.patient.notes || "",
        bookedBy: normalizeBookedBy(bookingData.bookedBy || 'patient'),
        patient: {
            name: bookingData.patient.name,
            phone: bookingData.patient.phone,
            email: bookingData.patient.email,
            birthYear: bookingData.patient.birthYear,
            notes: bookingData.patient.notes || "",
        },
    };
};

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
    buildAppointmentPayload,
    updateAppointment,
    deletedAppointment,
    updateAppointmentStatus
}
export default appointmentService;