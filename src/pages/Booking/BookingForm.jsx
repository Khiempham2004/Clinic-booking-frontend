import React from 'react'
import appointmentService from '../../services/appointmentService.js';

function BookingForm({ bookingData, setBookingData }) {
    const [errors, setErrors] = React.useState({});

    const handleChange = (field) => (e) => {
        const value = e.target.value;
        setBookingData({
            ...bookingData,
            patient: {
                ...bookingData.patient,
                [field]: value
            }
        });
    };

    const validate = () => {
        const e = {};
        if (!bookingData.doctorId || !bookingData.date || !bookingData.time) {
            e.booking = 'Vui lòng chọn bác sĩ, ngày và giờ.';
        }
        if (!bookingData.patient.name) e.name = 'Vui lòng nhập họ và tên.';
        const phoneRe = /^\+?[0-9]{7,15}$/;
        if (!bookingData.patient.phone) e.phone = 'Vui lòng nhập số điện thoại.';
        else if (!phoneRe.test(bookingData.patient.phone)) e.phone = 'Số điện thoại không hợp lệ.';
        const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (bookingData.patient.email && !emailRe.test(bookingData.patient.email)) e.email = 'Email không hợp lệ.';
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        const payload = {
            doctorId: bookingData.doctorId,
            date: bookingData.date,
            time: bookingData.time,
            patient: bookingData.patient
        };

        try {
            const booking = await appointmentService.createAppointment(payload);
            alert('Đặt lịch thành công');
            setBookingData({ ...bookingData, bookingId: booking._id || booking.id || null });
            console.log('Booking response', booking);
        } catch (err) {
            console.error('Booking failed', err);
            alert('Đặt lịch thất bại. Vui lòng thử lại.');
        }
    };

    return (
        <div className='mb-2'>
            <h2 className='text-lg font-semibold mb-3'>Bước 2: Thông tin bệnh nhân</h2>

            <form onSubmit={handleSubmit} className='space-y-4'>
                {errors.booking && <div className='text-sm text-red-600'>{errors.booking}</div>}
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                    <div>
                        <input value={bookingData.patient.name} onChange={handleChange('name')} type="text" className='border rounded-md px-3 py-2 focus:ring-2 focus:ring-teal-200 w-full' placeholder='Họ và Tên' />
                        {errors.name && <p className='mt-1 text-sm text-red-600'>{errors.name}</p>}
                    </div>

                    <div>
                        <input value={bookingData.patient.phone} onChange={handleChange('phone')} type="text" className='border rounded-md px-3 py-2 focus:ring-2 focus:ring-teal-200 w-full' placeholder='Số Điện Thoại' />
                        {errors.phone && <p className='mt-1 text-sm text-red-600'>{errors.phone}</p>}
                    </div>

                    <div>
                        <input value={bookingData.patient.email} onChange={handleChange('email')} type="email" className='border rounded-md px-3 py-2 focus:ring-2 focus:ring-teal-200 w-full' placeholder='Email' />
                        {errors.email && <p className='mt-1 text-sm text-red-600'>{errors.email}</p>}
                    </div>

                    <div>
                        <input value={bookingData.patient.birthYear} onChange={handleChange('birthYear')} type="text" className='border rounded-md px-3 py-2 focus:ring-2 focus:ring-teal-200 w-full' placeholder='Năm Sinh' />
                    </div>
                </div>

                <textarea value={bookingData.patient.notes} onChange={handleChange('notes')} name="" className='border rounded-md px-3 py-2 mt-2 w-full h-28 resize-none focus:ring-2 focus:ring-teal-200' placeholder='Triệu Chứng / Ghi chú' />

                <div className='mt-2'>
                    <button type='submit' className='w-full bg-teal-600 font-bold text-black px-4 py-2 rounded-md shadow'>Hoàn tất & Đặt lịch</button>
                </div>
            </form>
        </div>
    )
}

export default BookingForm;
