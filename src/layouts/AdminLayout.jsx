import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

import DashboardIcon from "@mui/icons-material/Dashboard";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import MiscellaneousServicesIcon from "@mui/icons-material/MiscellaneousServices";
import GroupIcon from "@mui/icons-material/Groups"
import PeopleAltIcon from "@mui/icons-material/PeopleAlt"

import * as authService from "../services/authService";

const AdminLayout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        authService.setAuthToken(null);
        navigate("/", { replace: true });
    };

    const menuStyle = ({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
        ${isActive
            ? "bg-cyan-500 text-black shadow-lg"
            : "text-slate-300 hover:bg-slate-700 hover:text-pink"
        }`;

    return (
        <div className="min-h-screen flex bg-slate-100">
            <aside className="w-72 bg-slate-900 flex flex-col">
                <div className="h-20 flex items-center px-6 border-b border-slate-700">
                    <LocalHospitalIcon className="text-cyan-400 mr-3" />
                    <h2 className="text-black text-2xl font-bold">
                        ADMIN
                    </h2>
                </div>
                <div className="flex-1 px-4 py-6 space-y-3">
                    <NavLink end to="/admin" className={menuStyle}>
                        <DashboardIcon />
                        Dashboard
                    </NavLink>
                    <NavLink to="/admin/doctors" className={menuStyle}>
                        <MedicalServicesIcon />
                        Doctors
                    </NavLink>
                    <NavLink to="/admin/staffs" className={menuStyle}>
                        <GroupIcon />
                        Staffs
                    </NavLink>

                    <NavLink to="/admin/patients" className={menuStyle}>
                        <PeopleAltIcon />
                        Patients
                    </NavLink>
                    <NavLink to="/admin/services" className={menuStyle}>
                        <MiscellaneousServicesIcon />
                        Services
                    </NavLink>
                    <NavLink to="/admin/appointments" className={menuStyle}>
                        <EventAvailableIcon />
                        Appointments
                    </NavLink>
                </div>
                <div className="p-4 border-t border-slate-700">
                    <button
                        onClick={handleLogout}
                        className="w-full flex justify-center items-center gap-2 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl transition"
                    >
                        <LogoutIcon />
                        Sign Out
                    </button>
                </div>
            </aside>
            <div className="flex-1 flex flex-col">
                <header className="h-20 bg-white shadow-sm flex items-center justify-between px-8">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-800">
                            Dashboard
                        </h1>
                        <p className="text-slate-500 text-sm">
                            Welcome back, Administrator
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-6">
                            <NotificationsNoneIcon className="cursor-pointer text-gray-500 hover:text-cyan-500" />
                            <div className="flex items-center gap-3 border-l pl-5">
                                <div className="w-11 h-11 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-white">
                                    <PersonIcon />
                                </div>
                                <div>
                                    <p className="font-semibold text-slate-700">
                                        Admin
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        Super Administrator
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                </header>
                <main className="flex-1 p-8 overflow-auto">
                    <div className="bg-white rounded-2xl shadow p-6 min-h-[calc(100vh-150px)]">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;