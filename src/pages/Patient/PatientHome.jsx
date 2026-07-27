import React, { useState } from "react";
import { Link } from "react-router-dom";

const PatientHome = () => {
    const [doctor ,setDoctor] = useState([]);
    
    const quickActions = [
        {
            title: "Book Appointment",
            description: "Schedule a visit with a doctor",
            link: "/patient/bookings",
            icon: "📅",
        },
        {
            title: "Find Doctors",
            description: "Browse available doctors",
            link: "/patient/doctors",
            icon: "👨‍⚕️",
        },
        {
            title: "My Appointments",
            description: "View your appointment history",
            link: "/patient/bookings",
            icon: "📋",
        },
        {
            title: "My Profile",
            description: "Update your personal information",
            link: "/patient/profile",
            icon: "👤",
        },
    ];

    const departments = [
        "Cardiology",
        "Neurology",
        "Orthopedics",
        "Pediatrics",
        "Dermatology",
        "Dentistry",
    ];

    return (
        <div className="space-y-8">
            <div className="bg-blue-600 text-white rounded-xl p-8 shadow">
                <h1 className="text-3xl font-bold">
                    Welcome Back 👋
                </h1>

                <p className="mt-3 text-blue-100">
                    Book appointments with trusted doctors anytime, anywhere.
                </p>
                <Link
                    to="/patient/bookings"
                    className="inline-block mt-6 bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100"
                >
                    Book Appointment
                </Link>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
                <h2 className="text-xl font-semibold mb-4">
                    Upcoming Appointment
                </h2>

                <div className="border rounded-lg p-4">
                    <p><strong>Doctor:</strong> Dr. John Smith</p>
                    <p><strong>Department:</strong> Cardiology</p>
                    <p><strong>Date:</strong> July 28, 2026</p>
                    <p><strong>Time:</strong> 09:30 AM</p>

                    <span className="inline-block mt-3 px-3 py-1 rounded-full bg-green-100 text-green-700">
                        Confirmed
                    </span>
                </div>
            </div>

            <div>
                <h2 className="text-xl font-semibold mb-4">
                    Quick Actions
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
                    {quickActions.map((item) => (
                        <Link
                            key={item.title}
                            to={item.link}
                            className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition"
                        >
                            <div className="text-4xl">{item.icon}</div>

                            <h3 className="font-semibold mt-3">
                                {item.title}
                            </h3>

                            <p className="text-gray-500 text-sm mt-2">
                                {item.description}
                            </p>
                        </Link>
                    ))}
                </div>
            </div>

            <div>
                <h2 className="text-xl font-semibold mb-4">
                    Popular Departments
                </h2>

                <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {departments.map((department) => (
                        <div
                            key={department}
                            className="bg-white rounded-lg shadow p-4 text-center font-medium"
                        >
                            {department}
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <h2 className="text-xl font-semibold mb-4">
                    Recommended Doctors
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                    {[1, 2, 3].map((doctor) => (
                        <div
                            key={doctor}
                            className="bg-white rounded-xl shadow p-6"
                        >
                            <div className="w-20 h-20 rounded-full bg-gray-300 mx-auto"></div>
                            <h3 className="font-semibold text-center mt-4">
                                Dr. John Smith
                            </h3>
                            <p className="text-center text-gray-500">
                                Cardiology
                            </p>
                            <button className="w-full mt-5 bg-blue-600 text-white py-2 rounded-lg">
                                View Profile
                            </button>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default PatientHome;