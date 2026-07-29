import { message } from 'antd';
import React, { useEffect, useState } from 'react';
import patientService from '../../services/patientService';
import doctorService from '../../services/doctorService';
import appointmentService from '../../services/appointmentService';
import medicalService from '../../services/medicalService';

const AdminDashboard = () => {
    const [dashboard, setDashboard] = useState({
        doctors: 0,
        patients: 0,
        services: 0,
        appointments: 0,
    });
    const [appointments, setAppointment] = useState([]);
    const [loading, setLoading] = useState(false);

    const loadDashboard = async () => {
        try {
            setLoading(true);
            const [
                patients,
                doctors,
                services,
                appointments
            ] = await Promise.all([
                patientService.getAllPatient(),
                doctorService.getAllDoctor(),
                medicalService.getAllMedical(),
                appointmentService.getAllAppointment()
            ]);

            setDashboard({
                patients: patients.length,
                doctors: doctors.length,
                services: services.length,
                appointments: appointments.length
            });
            message.success("Đã lấy danh sách bệnh nhân thành công")
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        loadDashboard();
    }, []);

    return (
        <div>
            <div className='font-bold text-xl'>
                <h1>Admin Dashboard</h1>
            </div>
            <div className="grid grid-cols-4 gap-6 top-4">
                <div className='bg-blue-500 rounded-xl p-6 text-white shadow'>
                    <h2 className='text-lg'>Doctors</h2>
                    <p className='text-4xl font-bold mt-3'>{dashboard.doctors}</p>
                </div>
                <div className='bg-green-500 rounded-xl p-6 text-white shadow'>
                    <h2 className='text-lg'>Patients</h2>
                    <p className='text-4xl font-bold mt-3'>{dashboard.patients}</p>
                </div>

                <div className='bg-red-500 rounded-xl p-6 text-white shadow'>
                    <h2 className='text-lg'>Services</h2>
                    <p className='text-4xl font-bold mt-3'>{dashboard.services}</p>
                </div>

                <div className='bg-pink-500 rounded-xl p-6 text-white shadow'>
                    <h2 className='text-lg'>Appointments</h2>
                    <p className='text-4xl font-bold mt-3'>{dashboard.appointments}</p>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow mt-8">
                <div className="p-5 border-b">
                    <h2 className="text-xl font-semibold">
                        Recent Appointments
                    </h2>
                </div>
                <table className="w-full">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-4 text-left">Patient</th>
                            <th className="p-4 text-left">Doctor</th>
                            <th className="p-4 text-left">Date</th>
                            <th className="p-4 text-left">Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {appointments.map(item => (
                            <tr key={item._id} className="border-b">
                                <td className="p-4">
                                    {item.patient.name}
                                </td>
                                <td className="p-4">
                                    {item.doctor.name}
                                </td>
                                <td className="p-4">
                                    {item.date}
                                </td>
                                <td className="p-4">
                                    <span
                                        className={`px-3 py-1 rounded-full text-sm ${item.status === "Pending"
                                            ? "bg-yellow-100 text-yellow-700"
                                            : item.status === "Approved"
                                                ? "bg-green-100 text-green-700"
                                                : "bg-red-100 text-red-700"
                                            }`}
                                    >
                                        {item.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AdminDashboard;
