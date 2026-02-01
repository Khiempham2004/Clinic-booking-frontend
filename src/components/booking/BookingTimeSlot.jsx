import React from 'react';

function BookingTimeSlot( ) {
    const times = ["8:00", "9:00", "10:00", "15:00", "17:00"]
    return (
        <div>
            {/* <h3>Booking Time Slot</h3> */}
            {/* <p>Chon gio kham</p> */}

            <div className='mb-8'>
                <h2 className='text-lg font-semibold mb-3'>
                    Bước 1 : Chọn Day và Clock khám
                </h2>

                <input type="date" className='border rounded px-3 py-2 mb-4' />

                <div>
                    {times.map((time) => (
                        <button className="border rounded py-2 hover:bg-blue-600 hover:text-white">
                            {time}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default BookingTimeSlot;
