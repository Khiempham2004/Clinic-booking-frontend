import React, { useState } from 'react';
import BookingTimeSlot from '../../components/booking/BookingTimeSlot.jsx';
import BookingForm from './BookingForm.jsx';
import BookingSummary from '../../components/booking/BookingSummary.jsx';
import bookingService from '../../services/bookingService.js';


function BookingPage() {
    const [bookingData , setBookingData] = useState({
        
    })
    return (
        <div>

            {/* <h3>Booking page</h3>
            <p>Chọn bác sĩ lịch</p> */}

            <div className='bg-gray-50 min-h-screen py-10'>
                <div className='max-n-5xl mx-auto bg-white rounded-xl shadow-md p-8'>
                    <h1 className='text-2xl font-bold text-blue-700 mb-6'>
                        Đặt lịch khám bệnh
                    </h1>

                    {/* Buoc 1  :Chọn time */}
                    <BookingTimeSlot />
                    
                    {/* Buoc 2 : Nhap thong tin */}
                    <BookingForm />
                    
                    {/* Buoc 3 : Xac nhan thong tin */}
                    <BookingSummary />

                </div>
            </div>
        </div>
    );
}

export default BookingPage;
