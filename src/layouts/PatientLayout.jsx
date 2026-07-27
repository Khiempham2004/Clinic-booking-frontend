import React from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";

import HomeIcon from "@mui/icons-material/Home";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";

import * as authClient from "../services/authClient";

const PatientLayout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        authClient.setAuthToken(null);
        navigate("/login", { replace: true });
    };

    const navClass = ({ isActive }) =>
        `flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${isActive
            ? "bg-blue-600 text-white"
            : "text-slate-600 hover:bg-blue-100 hover:text-blue-600"
        }`;

    return (
        <div className="min-h-screen bg-slate-100">
            <header className="bg-white shadow sticky top-0 z-50">
                <div className="max-w-7xl mx-auto h-20 flex items-center justify-between px-6">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center text-white">
                            <LocalHospitalIcon />
                        </div>
                        <div>
                            <h2 className="font-bold text-xl text-slate-800">
                                Hospital Booking
                            </h2>
                            <p className="text-sm text-gray-500">
                                Healthcare Management
                            </p>
                        </div>
                    </div>
                    <nav className="flex items-center gap-3">
                        <NavLink end to="/patient" className={navClass}>
                            <HomeIcon fontSize="small" />
                            Home
                        </NavLink>
                        <NavLink to="/patient/doctors" className={navClass}>
                            <MedicalServicesIcon fontSize="small" />
                            Doctors
                        </NavLink>
                        <NavLink to="/patient/bookings" className={navClass}>
                            <EventAvailableIcon fontSize="small" />
                            Appointments
                        </NavLink>
                        <NavLink to="/patient/profile" className={navClass}>
                            <PersonIcon fontSize="small" />
                            Profile
                        </NavLink>
                    </nav>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center">
                                <PersonIcon />
                            </div>
                            <div>
                                <p className="font-semibold text-slate-700">
                                    Patient
                                </p>
                                <p className="text-xs text-gray-500">
                                    Welcome Back
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
                        >
                            <LogoutIcon fontSize="small" />
                            Sign Out
                        </button>
                    </div>
                </div>
            </header>
            <section className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white">
                <div className="max-w-7xl mx-auto py-10 px-6">
                    <h1 className="text-4xl font-bold mb-2">
                        Welcome to Hospital Booking
                    </h1>
                    <p className="text-blue-100">
                        Book appointments quickly and manage your healthcare easily.
                    </p>
                </div>
            </section>

            <main className="max-w-7xl mx-auto p-6">
                <div className="bg-white rounded-2xl shadow-md p-6 min-h-[600px]">
                    <Outlet />
                </div>
            </main>

            <footer className="bg-white border-t mt-10">
                <div className="max-w-7xl mx-auto py-6 text-center text-gray-500 text-sm">
                    © 2026 Hospital Booking System. All Rights Reserved.
                </div>
            </footer>

        </div>
    );
};

export default PatientLayout;