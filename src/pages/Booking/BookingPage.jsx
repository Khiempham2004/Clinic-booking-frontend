import React, { useState } from "react";
import BookingTimeSlot from "../../components/booking/BookingTimeSlot.jsx";
import BookingForm from "./BookingForm.jsx";
import BookingSummary from "../../components/booking/BookingSummary.jsx";
import Header from "../../components/common/Header.jsx";

function BookingPage() {
  // bookingData holds selections and patient info across steps
  const [bookingData, setBookingData] = useState({
    doctorId: null,
    doctorName: '',
    date: '',
    time: '',
    patient: {
      name: '',
      phone: '',
      email: '',
      birthYear: '',
      notes: ''
    }
  });

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />

      <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold text-teal-700 mb-6">Đặt lịch khám bệnh</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: steps (take up 2 cols on large) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <BookingTimeSlot bookingData={bookingData} setBookingData={setBookingData} />
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <BookingForm bookingData={bookingData} setBookingData={setBookingData} />
            </div>
          </div>
          <div className="">
            <div className="sticky top-24 bg-white rounded-lg shadow p-6">
              <BookingSummary bookingData={bookingData} setBookingData={setBookingData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingPage;
