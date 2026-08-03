import React, { useState } from 'react';
import appointmentService from '../../services/appointmentService';

function BookingSummary({ bookingData, setBookingData }) {
    const [loading, setLoading] = useState(false);
    const handleConfirm = async () => {
        if (
            !bookingData.doctorId ||
            !bookingData.date ||
            !bookingData.time ||
            !bookingData.patient.name ||
            !bookingData.patient.phone
        ) {
            alert('Thông tin chưa đầy đủ. Vui lòng chọn bác sĩ, ngày, giờ và điền đầy đủ thông tin bệnh nhân.');
            return;
        }
        setLoading(true);
        const payload = appointmentService.buildAppointmentPayload(bookingData);
        try {
            const booking = await appointmentService.createAppointment(payload);
            alert('Đặt lịch thành công. Mã: ' + (booking._id || booking.id || 'N/A'));
            setBookingData({ ...bookingData, bookingId: booking._id || booking.id || null });
        } catch (err) {
            console.error(err);
            alert('Đặt lịch thất bại. Vui lòng thử lại.');
        } finally {
            setLoading(false);
        }
    };

    

    return (
        <div>
            <h2 className='text-lg font-semibold mb-3'>Tóm tắt & xác nhận</h2>

            <div className='bg-white border rounded-lg p-4 mb-4 shadow-sm'>
                <div className='text-sm text-gray-600 mb-2'><span className='font-medium'>Bác sĩ:</span> {bookingData.doctorName || '—'}</div>
                <div className='text-sm text-gray-600 mb-2'><span className='font-medium'>Ngày:</span> {bookingData.date || '—'}</div>
                <div className='text-sm text-gray-600 mb-2'><span className='font-medium'>Giờ:</span> {bookingData.time || '—'}</div>
                <hr className='my-2' />
                <div className='text-sm text-gray-600'><span className='font-medium'>Bệnh nhân:</span> {bookingData.patient.name || '—'}</div>
                <div className='text-sm text-gray-600'><span className='font-medium'>SĐT:</span> {bookingData.patient.phone || '—'}</div>
                <div className='text-sm text-gray-600'><span className='font-medium'>Email:</span> {bookingData.patient.email || '—'}</div>
            </div>

            <div className='flex gap-2'>
                <button onClick={handleConfirm} disabled={loading} className='flex-1 bg-teal-600 text-black px-4 py-2 rounded-md shadow'>
                    {loading ? 'Đang gửi...' : 'Xác nhận đặt lịch'}
                </button>
                <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className='px-4 py-2 border rounded-md'>Chỉnh sửa</button>
            </div>
        </div>
    );
}

export default BookingSummary;
