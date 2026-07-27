import React, { useEffect, useState } from 'react';
import { getAllDoctor, getAvailability } from '../../services/doctorService';

function BookingTimeSlot({ bookingData, setBookingData }) {
    const [doctors, setDoctors] = useState([]);
    const [availableTimes, setAvailableTimes] = useState([]);
    const [loadingDoctors, setLoadingDoctors] = useState(false);
    const [loadingTimes, setLoadingTimes] = useState(false);

    useEffect(() => {
        // Load doctors list from API
        setLoadingDoctors(true);
        getAllDoctor()
            .then(res => {
                setDoctors(res.data || []);
            })
            .catch(err => {
                console.error('Failed to load doctors', err);
                setDoctors([]);
            })
            .finally(() => setLoadingDoctors(false));
    }, []);

    const { doctorId, date } = bookingData;

    useEffect(() => {
        // When doctorId and date chosen, fetch availability
        if (doctorId && date) {
            setLoadingTimes(true);
            getAvailability(doctorId, date)
                .then(res => {
                    // expect res.data = array of time strings
                    setAvailableTimes(res.data || []);
                })
                .catch(err => {
                    console.error('Failed to load availability', err);
                    // Fall back to a default set of times if backend unavailable
                    setAvailableTimes(["08:00", "09:00", "10:00", "15:00", "17:00"]);
                })
                .finally(() => setLoadingTimes(false));
        } else {
            setAvailableTimes([]);
        }
    }, [doctorId, date]);

    const handleDoctorChange = (e) => {
        const id = e.target.value || null;
        const selected = doctors.find(d => String(d.id) === String(id));
        setBookingData({ ...bookingData, doctorId: id, doctorName: selected ? selected.name : '' });
    };

    const handleDateChange = (e) => {
        setBookingData({ ...bookingData, date: e.target.value });
    };

    const handleTimeSelect = (time) => {
        setBookingData({ ...bookingData, time });
    };

    return (
        <div className='mb-2'>
            <h2 className='text-lg font-semibold mb-3'>Bước 1: Chọn bác sĩ, ngày và giờ khám</h2>

            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 items-center mb-4'>
                <div>
                    <label className='block text-sm font-medium mb-1 text-gray-700'>Chọn bác sĩ</label>
                    <select className='border rounded px-3 py-2 w-full text-sm bg-white' value={bookingData.doctorId || ''} onChange={handleDoctorChange}>
                        <option value=''>-- Chọn bác sĩ --</option>
                        {loadingDoctors ? (
                            <option>Đang tải...</option>
                        ) : (
                            doctors.map(doc => (
                                <option key={doc.id} value={doc.id}>{doc.name} - {doc.specialty}</option>
                            ))
                        )}
                    </select>
                </div>

                <div>
                    <label className='block text-sm font-medium mb-1 text-gray-700'>Chọn ngày</label>
                    <input type="date" className='border rounded px-3 py-2 w-full text-sm bg-white' value={bookingData.date || ''} onChange={handleDateChange} />
                </div>
            </div>

            <div>
                <label className='block text-sm font-medium mb-2 text-gray-700'>Chọn giờ</label>
                <div className='flex flex-wrap gap-2'>
                    {loadingTimes ? (
                        <div className='text-sm text-gray-500'>Đang tải giờ trống...</div>
                    ) : (
                        (availableTimes.length ? availableTimes : ["08:00", "09:00", "10:00", "15:00", "17:00"]).map(t => (
                            <button
                                key={t}
                                onClick={() => handleTimeSelect(t)}
                                className={`border rounded-md py-2 px-3 text-sm focus:outline-none transition ${bookingData.time === t ? 'bg-teal-600 text-white border-teal-600' : 'bg-white text-gray-700 hover:bg-teal-50 hover:border-teal-200'}`}>
                                {t}
                            </button>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default BookingTimeSlot;
