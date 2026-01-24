import React, { useState } from 'react'
import bookingService from '../../services/bookingService.js';
// import { FormLabel, TextField, Button, MenuItem } from '@mui/material';

function BookingForm() {
    const [form, setForm] = useState({
        doctorID: "",
        date: "",
        time: ""
    });

    const handleBookingSubmit = async (event) => {
        event.preventDefault();
        try {
            await bookingService.createBooking(form);
            alert("Đặt lịch thành công")
        } catch (error) {
            console.log("Booking submit error!", Error);
            alert("Vui lòng đặt lịch lại!")
        }
    };

    return (
        <div>
            <h2>Đặt lịch khám bệnh</h2>

            <form onSubmit={handleBookingSubmit}>
                <input
                    placeholder="Doctor ID"
                    onChange={e => setForm({ ...form, doctorId: e.target.value })}
                />
                <input
                    type="date"
                    onChange={e => setForm({ ...form, date: e.target.value })}
                />
                <input
                    type="time"
                    onChange={e => setForm({ ...form, time: e.target.value })}
                />
                <button type="submit">Đặt lịch</button>
            </form>
        </div>
    )
}

export default BookingForm;
