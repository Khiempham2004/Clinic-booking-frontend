import React from "react";
import appointmentService from "../../services/appointmentService.js";

function BookingForm({ bookingData, setBookingData }) {
    const [errors, setErrors] = React.useState({});

    const handleChange = (field) => (e) => {
        const value = e.target.value;

        setBookingData((prev) => ({
            ...prev,
            patient: {
                ...prev.patient,
                [field]: value,
            },
        }));
    };

    const validate = () => {
        const e = {};
        if (
            !bookingData.doctorId ||
            !bookingData.date ||
            !bookingData.time
        ) {
            e.booking =
                "Vui lòng chọn bác sĩ, ngày, giờ.";
        }
        if (!bookingData.patient.name) {
            e.name = "Vui lòng nhập họ và tên.";
        }
        const phoneRe = /^\+?[0-9]{7,15}$/;
        if (!bookingData.patient.phone) {
            e.phone = "Vui lòng nhập số điện thoại.";
        } else if (!phoneRe.test(bookingData.patient.phone)) {
            e.phone = "Số điện thoại không hợp lệ.";
        }

        const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (
            bookingData.patient.email &&
            !emailRe.test(bookingData.patient.email)
        ) {
            e.email = "Email không hợp lệ.";
        }
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("bookingData:", bookingData);
        if (!validate()) return;

        try {
            const payload = appointmentService.buildAppointmentPayload(bookingData);
            console.log("Appointment payload:", payload);

            const booking = await appointmentService.createAppointment(payload);
            alert("Đặt lịch thành công");
            setBookingData((prev) => ({
                ...prev,
                bookingId: booking?._id || booking?.id || null,
            }));
            console.log("Booking response:", booking);
        } catch (err) {
            console.error("Booking failed:", err);
            alert("Đặt lịch thất bại. Vui lòng thử lại.");
        }
    };

    return (
        <div className="mb-2">
            <h2 className="mb-3 text-lg font-semibold">
                Bước 2: Thông tin bệnh nhân
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                {errors.booking && (
                    <div className="text-sm text-red-600">
                        {errors.booking}
                    </div>
                )}

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                        <input
                            value={bookingData.patient.name}
                            onChange={handleChange("name")}
                            type="text"
                            className="w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-teal-200"
                            placeholder="Họ và Tên"
                        />
                        {errors.name && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.name}
                            </p>
                        )}
                    </div>

                    <div>
                        <input
                            value={bookingData.patient.phone}
                            onChange={handleChange("phone")}
                            type="text"
                            className="w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-teal-200"
                            placeholder="Số Điện Thoại"
                        />
                        {errors.phone && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.phone}
                            </p>
                        )}
                    </div>

                    <div>
                        <input
                            value={bookingData.patient.email}
                            onChange={handleChange("email")}
                            type="email"
                            className="w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-teal-200"
                            placeholder="Email"
                        />
                        {errors.email && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.email}
                            </p>
                        )}
                    </div>
                    <div>
                        <input
                            value={bookingData.patient.birthYear}
                            onChange={handleChange("birthYear")}
                            type="text"
                            className="w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-teal-200"
                            placeholder="Năm Sinh"
                        />
                    </div>
                </div>
                <textarea
                    value={bookingData.patient.notes}
                    onChange={handleChange("notes")}
                    className="mt-2 h-28 w-full resize-none rounded-md border px-3 py-2 focus:ring-2 focus:ring-teal-200"
                    placeholder="Triệu Chứng / Ghi chú"
                />
                <div className="mt-2">
                    <button
                        type="submit"
                        className="w-full rounded-md bg-teal-600 px-4 py-2 font-bold text-black shadow"
                    >
                        Hoàn tất & Đặt lịch
                    </button>
                </div>
            </form>
        </div>
    );
}

export default BookingForm;