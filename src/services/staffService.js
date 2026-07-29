import axiosClient from "../utils/axiosClient.js";

export const getAllStaff = () => {
    return axiosClient.get("/staff");
};

export const getStaffById = (id) => {
    return axiosClient.get(`/staff/${id}`);
};

export const createStaff = (data) => {
    return axiosClient.post("/staff", data);
};

export const updateStaff = (id, data) => {
    return axiosClient.patch(`/staff/${id}`, data);
};

export const deletedStaff = (id) => {
    return axiosClient.delete(`/staff/${id}`);
};

const staffService = {
    getAllStaff,
    getStaffById,
    createStaff,
    updateStaff,
    deletedStaff
};

export default staffService;
