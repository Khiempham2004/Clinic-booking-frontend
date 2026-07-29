import React, { useEffect, useState } from 'react';
import doctorService from '../../services/doctorService';
import AddIcon from "@mui/icons-material/Add";
import { message } from 'antd';

const AdminDoctors = () => {
  const initialFormData = {
    doctorCode: '',
    fullName: '',
    specialty: '',
    degree: '',
    experience: '',
    phoneNumber: '',
    status: 'active'
  };

  const [formData, setFormData] = useState({
    ...initialFormData
  })
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const loadDoctors = async () => {
    try {
      setLoading(true);
      const response = await doctorService.getAllDoctor();
      setDoctors(response.data?.data || []);
    } catch (error) {
      console.log(error);
      setErrorMessage(error.message || "Failed to load doctors");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDoctors();
  }, [page]);

  const handleEdit = (doctor) => {
    setSelectedDoctor(doctor);
    setFormData({
      doctorCode: doctor.doctorCode || '',
      fullName: doctor.fullName || '',
      specialty: doctor.specialty || '',
      degree: doctor.degree || '',
      experience: doctor.experience || '',
      phoneNumber: doctor.phoneNumber || '',
      status: doctor.status || 'active'
    });
    setOpenModal(true);
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Deleted doctor')) {
      return
    };
    await doctorService.deletedDoctor(id);
    loadDoctors();
  }

  const handleSaveDoctor = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    try {
      setSaving(true);
      if (selectedDoctor) {
        await doctorService.updateDoctor(selectedDoctor._id, formData);
        message.success('Cập nhật doctor thành công')
      } else {
        await doctorService.createDoctor(formData);
        message.success("Tạo mới doctor thành công")
      }
      setOpenModal(false);
      setSelectedDoctor(null);
      setFormData({ ...initialFormData });
      loadDoctors();
    } catch (error) {
      setErrorMessage(error.message || "Failed to create doctor");
    } finally {
      setSaving(false);
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const filteredDoctors = doctors.filter((doctor) => {
    const keyword = search.trim().toLowerCase();
    if (!keyword) return true;

    return [
      doctor.fullName,
      doctor.doctorCode,
      doctor.specialty,
      doctor.degree,
      doctor.phoneNumber,
      doctor.status
    ].some((value) => String(value || "").toLowerCase().includes(keyword));
  });

  return (
    <div>
      <div className="space-y-6">
        <div className="bg-white rounded-2xl shadow-md p-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">
              Doctors Management
            </h1>
            <p className="text-gray-500 mt-1">
              Manage doctors information and schedules
            </p>
          </div>
          <button
            onClick={() => setOpenModal(true)}
            className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-black px-5 py-3 rounded-xl shadow hover:shadow-lg transition-all"
          >
            <AddIcon fontSize="small" />
            Add Doctor
          </button>
        </div>

        {errorMessage && (
          <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-3">
            {errorMessage}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
          <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-6">
            <p className="text-gray-500">Total Doctors</p>
            <h2 className="text-3xl font-bold mt-2">
              {doctors.length}
            </h2>
          </div>
          <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-6">
            <p className="text-gray-500">Active</p>
            <h2 className="text-3xl font-bold text-green-500 mt-2">
              {doctors.filter(x => x.status === "active").length}
            </h2>
          </div>
          <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-6">
            <p className="text-gray-500">Inactive</p>
            <h2 className="text-3xl font-bold text-red-500 mt-2">
              {doctors.filter(x => x.status === "inactive").length}
            </h2>
          </div>
          <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-6">
            <p className="text-gray-500">Departments</p>
            <h2 className="text-3xl font-bold mt-2">
              8
            </h2>
          </div>

        </div>

        <div className="bg-white rounded-2xl shadow-md p-5 flex gap-4">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search doctor..."
            className="flex-1 border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-400"
          />

          <button
            className="bg-cyan-500 hover:bg-cyan-600 text-black px-6 rounded-xl transition"
          >
            Search
          </button>
        </div>
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-100">
              <tr>
                <th className="text-left px-6 py-4">Name</th>
                <th className="text-left px-6 py-4">Specialty</th>
                <th className="text-left px-6 py-4">Degree</th>
                <th className="text-left px-6 py-4">Experience</th>
                <th className="text-left px-6 py-4">Phone</th>
                <th className="text-left px-6 py-4">Status</th>
                <th className="text-center px-6 py-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan={7}
                    className="text-center py-12 text-gray-400"
                  >
                    Loading doctors...
                  </td>
                </tr>
              ) : filteredDoctors.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="text-center py-12 text-gray-400"
                  >
                    No doctors found.
                  </td>
                </tr>
              ) : (
                filteredDoctors.map((doctor) => (
                  <tr
                    key={doctor._id}
                    className="border-t hover:bg-cyan-50 transition"
                  >
                    <td className="px-6 py-4">{doctor.fullName}</td>
                    <td className="px-6 py-4">{doctor.specialty}</td>
                    <td className="px-6 py-4">{doctor.degree}</td>
                    <td className="px-6 py-4">{doctor.experience}</td>
                    <td className="px-6 py-4">{doctor.phoneNumber}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${doctor.status === "active"
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                          }`}
                      >
                        {doctor.status === "active" ? "Active" : "Inactive"}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-center space-x-2">
                      <button
                        onClick={() => handleEdit(doctor)}
                        className="px-3 py-1 rounded-lg bg-yellow-400 hover:bg-yellow-500 transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(doctor._id)}
                        className="px-3 py-1 rounded-lg bg-red-500 hover:bg-red-600 text-white transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {openModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl">
              <div className="flex justify-between items-center border-b px-6 py-4">
                <div>
                  <h2 className="text-2xl font-bold text-slate-800">
                    {selectedDoctor ? "Edit Doctor" : "Add Doctor"}
                  </h2>
                  <p className="text-gray-500 text-sm mt-1">
                    Enter doctor's information
                  </p>
                </div>
                <button
                  onClick={() => {
                    setOpenModal(false);
                    setSelectedDoctor(null);
                    setFormData({ ...initialFormData });
                  }}
                  className="text-2xl text-gray-400 hover:text-red-500"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSaveDoctor} className="p-6">
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <label className="block mb-2 font-medium">
                      Doctor Code
                    </label>
                    <input
                      name="doctorCode"
                      value={formData.doctorCode}
                      onChange={handleChange}
                      className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-cyan-500 outline-none"
                      placeholder="doctorCode..."
                    />
                  </div>
                  <div>
                    <label className="block mb-2 font-medium">
                      Full Name
                    </label>
                    <input
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-cyan-500 outline-none"
                      placeholder="FullName..."
                    />
                  </div>
                  <div>
                    <label className="block mb-2 font-medium">
                      Specialty
                    </label>
                    <input
                      name="specialty"
                      value={formData.specialty}
                      onChange={handleChange}
                      className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-cyan-500 outline-none"
                      placeholder="ChuyenKhoa..."
                    />
                  </div>
                  <div>
                    <label className="block mb-2 font-medium">
                      Degree
                    </label>
                    <input
                      name="degree"
                      value={formData.degree}
                      onChange={handleChange}
                      className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-cyan-500 outline-none"
                      placeholder="Trình độ ..."
                    />
                  </div>
                  <div>
                    <label className="block mb-2 font-medium">
                      Experience
                    </label>

                    <input
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
                      className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-cyan-500 outline-none"
                      placeholder="Kinh nghiệm..."
                    />
                  </div>

                  <div>
                    <label className="block mb-2 font-medium">
                      Phone Number
                    </label>

                    <input
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-cyan-500 outline-none"
                      placeholder="số điện thoại..."
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="block mb-2 font-medium">
                      Status
                    </label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-cyan-500 outline-none"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end gap-3 mt-8 border-t pt-5">
                  <button
                    type="button"
                    onClick={() => {
                      setOpenModal(false);
                      setSelectedDoctor(null);
                      setFormData({ ...initialFormData });
                    }}
                    className="px-6 py-3 rounded-xl border hover:bg-gray-100 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-6 py-3 rounded-xl border hover:bg-gray-100 transition"
                  >
                    {saving ? "Saving..." : "Save Doctor"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDoctors;