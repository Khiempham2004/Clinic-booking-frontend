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
            const booking = await bookingService.createBooking(form);
            alert("Đặt lịch thành công")
            console.log("Đặt lịch thành công! ", booking.data)
        } catch (error) {
            console.log("Booking submit error!", Error);
            alert("Vui lòng đặt lịch lại!")
        }
    };

    return (
        <div>
            <div>
                {/* <h2>Đặt lịch khám bệnh</h2>

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
            </form> */}
            </div>


            <div className='mb-8'>
                <h2 className='text-lg font-semibold mb-3'>
                    Bước 2 : Thông tin bệnh nhân
                </h2>

                <div className='grid grid-cols-2 gap-4'>
                    <input type="text" className='border rounded px-3 py-2' placeholder='Họ và Tên' />
                    <input type="text" className='border rounded px-3 py-2' placeholder='Số Điện Thoại' />
                    <input type="text" className='border rounded px-3 py-2' placeholder='Email' />
                    <input type="text" className='border rounded px-3 py-2' placeholder='Năm Sinh' />
                </div>

                <textarea name="" className='border rounded px-3 py-2 mt-4 w-full'
                    placeholder='Triệu Chứng / Ghi chú'
                />
            </div>
        </div>
    )
}

export default BookingForm;
