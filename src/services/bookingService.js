import axios from "axios";
// import { data } from "react-router-dom";

const APIbooking = "";

// export const getMyBooking = () => {
//     return axios.get('/')
// };

// export const createBooking = () => {
//     return axios.post('/')
// };

// export const BookingForm = () => {
//     return axios.post('/')
// }

const createBooking = (data) => {
    axios.post(`${APIbooking}`, data)
}

const getMyBooking = (id) => {
    axios.get(`${APIbooking}/user/${id}`)
}

export default {
    createBooking,
    getMyBooking
}