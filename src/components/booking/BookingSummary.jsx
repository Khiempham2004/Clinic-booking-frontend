import React from 'react';

function BookingSummary() {
    return (
        <div>
            {/* <h3>Booking Summary</h3> */}
            {/* <p>Xac nhan thong tin</p> */}

            <div className='border-t pt-6'>
                <h2 className='text-lg font-semibold mb-3'>
                    Bước 3 : Xác nhận đặt lịch
                </h2>

                <div className='bg-gray-100 p-4 rounded mb-4'>
                    <p><b>Bác sĩ : </b> Nguyễn Văn A</p>
                    <p><b>Chuyên khoa : </b>Nhi Khoa</p>
                    <p><b>Trình độ : </b>Tiến Sĩ</p>
                    <p><b>Ngày : </b> 02/02/2026</p>
                    <p><b>Giờ : </b>9:00</p>
                </div>
                <button className=''>
                    Xác nhận đặt lịch
                </button>
            </div>
        </div>
    );
}

export default BookingSummary;
