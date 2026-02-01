import React from 'react';
import { Link, Outlet } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import PeopleIcon from "@mui/icons-material/People";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";

const AdminLayout = () => {
    console.log("outlet: ", Outlet);


    return (
        <div className="flex min-h-screen mb-6">
            <aside className="w-64 bg-slate-900 text-black p-4 flex-shrink-0 " style={{ margin: "20px", padding: "20px" }}>
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <LocalHospitalIcon /> ADMIN HOSPITAL
                </h2>

                <div className="space-y-4 " >
                    <Link className="flex items-center gap-2" to="/admin">
                        <DashboardIcon /> Dashboard
                    </Link>

                    <Link className="flex items-center gap-2" to="/admin/doctors">
                        <MedicalServicesIcon /> Bác sĩ
                    </Link>

                    <Link className="flex items-center gap-2" to="/admin/services">
                        <MedicalServicesIcon /> Dịch vụ khám
                    </Link>

                    <Link className="flex items-center gap-2" to="/admin/appointments">
                        <EventAvailableIcon /> Lịch hẹn
                    </Link>
                </div>
            </aside>

            <main className="flex-1 p-6 bg-gray-100">
                <Outlet />
            </main>

        </div>
    );
}

export default AdminLayout;
