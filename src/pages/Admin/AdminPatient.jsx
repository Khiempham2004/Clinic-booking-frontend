import React, { useEffect, useMemo, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { message } from "antd";
import patientService from "../../services/patientService.js";

const initialFormData = {
  patientCode: "",
  patientName: "",
  dateOfBirth: "",
  gender: "Male",
  phoneNumber: "",
  address: "",
};

const formatDateForInput = (value) => {
  if (!value) return "";
  return new Date(value).toISOString().slice(0, 10);
};

const AdminPatient = () => {
  const [patients, setPatients] = useState([]);
  const [formData, setFormData] = useState({ ...initialFormData });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const fetchPatients = async () => {
    try {
      setLoading(true);
      setErrorMessage("");
      const response = await patientService.getAllPatient();
      setPatients(response.data?.data || []);
    } catch (error) {
      setErrorMessage(error.message || "Failed to load patients");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const filteredPatients = useMemo(() => {
    const keyword = search.trim().toLowerCase();
    if (!keyword) return patients;

    return patients.filter((patient) =>
      [
        patient.patientCode,
        patient.patientName,
        patient.gender,
        patient.phoneNumber,
        patient.address,
      ].some((value) => String(value || "").toLowerCase().includes(keyword))
    );
  }, [patients, search]);

  const closeModal = () => {
    setOpenModal(false);
    setSelectedPatient(null);
    setFormData({ ...initialFormData });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAdd = () => {
    setSelectedPatient(null);
    setFormData({ ...initialFormData });
    setOpenModal(true);
  };

  const handleEdit = (patient) => {
    setSelectedPatient(patient);
    setFormData({
      patientCode: patient.patientCode || "",
      patientName: patient.patientName || "",
      dateOfBirth: formatDateForInput(patient.dateOfBirth),
      gender: patient.gender || "Male",
      phoneNumber: patient.phoneNumber || "",
      address: patient.address || "",
    });
    setOpenModal(true);
  };

  const handleSavePatient = async (event) => {
    event.preventDefault();
    setErrorMessage("");

    try {
      setSaving(true);
      if (selectedPatient) {
        await patientService.updatePatient(selectedPatient._id, formData);
        message.success("Cap nhat benh nhan thanh cong");
      } else {
        await patientService.createPatient(formData);
        message.success("Tao moi benh nhan thanh cong");
      }

      closeModal();
      fetchPatients();
    } catch (error) {
      setErrorMessage(error.message || "Failed to save patient");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Ban co chac muon xoa benh nhan nay?")) return;

    try {
      setErrorMessage("");
      await patientService.deletedPatient(id);
      message.success("Xoa benh nhan thanh cong");
      fetchPatients();
    } catch (error) {
      setErrorMessage(error.message || "Failed to delete patient");
    }
  };

  const totalMale = patients.filter((patient) => patient.gender === "Male").length;
  const totalFemale = patients.filter((patient) => patient.gender === "Female").length;

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-cyan-700 p-6 text-black shadow-md">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-black/10 px-3 py-1 text-sm text-cyan-100">
              <PeopleAltOutlinedIcon fontSize="small" />
              Admin workspace
            </div>
            <h1 className="text-3xl font-bold">Patient Management</h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-200">
              Manage patient profiles, contact details, and quick lookup from one clean dashboard.
            </p>
          </div>

          <button
            onClick={handleAdd}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-400 px-5 py-3 font-semibold text-slate-900 shadow-lg transition hover:bg-cyan-300 md:w-auto"
          >
            <AddIcon fontSize="small" />
            Add Patient
          </button>
        </div>
      </div>

      {errorMessage && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-600">
          {errorMessage}
        </div>
      )}

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Patients</p>
              <h2 className="mt-2 text-3xl font-bold text-slate-800">{patients.length}</h2>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-100 text-cyan-700">
              <PeopleAltOutlinedIcon />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Male Patients</p>
              <h2 className="mt-2 text-3xl font-bold text-blue-600">{totalMale}</h2>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
              <MaleIcon />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Female Patients</p>
              <h2 className="mt-2 text-3xl font-bold text-pink-600">{totalFemale}</h2>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-pink-100 text-pink-600">
              <FemaleIcon />
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative flex-1">
            <SearchIcon
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              fontSize="small"
            />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by code, name, phone, gender, or address..."
              className="w-full rounded-xl border border-gray-200 bg-slate-50 py-3 pl-11 pr-4 outline-none transition focus:border-cyan-400 focus:bg-white focus:ring-2 focus:ring-cyan-100"
            />
          </div>
          <div className="rounded-xl bg-slate-100 px-4 py-3 text-sm font-medium text-slate-600">
            {filteredPatients.length} result{filteredPatients.length === 1 ? "" : "s"}
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-6 py-4">
          <h2 className="text-lg font-semibold text-slate-800">Patient List</h2>
          <p className="text-sm text-gray-500">View and update patient records.</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[920px]">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-6 py-4 text-left">Patient</th>
                <th className="px-6 py-4 text-left">Code</th>
                <th className="px-6 py-4 text-left">Birth Date</th>
                <th className="px-6 py-4 text-left">Gender</th>
                <th className="px-6 py-4 text-left">Phone</th>
                <th className="px-6 py-4 text-left">Address</th>
                <th className="px-6 py-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={7} className="py-14 text-center text-gray-400">
                    Loading patients...
                  </td>
                </tr>
              ) : filteredPatients.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-14 text-center text-gray-400">
                    No patients found.
                  </td>
                </tr>
              ) : (
                filteredPatients.map((patient) => (
                  <tr key={patient._id} className="transition hover:bg-cyan-50/70">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cyan-100 font-semibold text-cyan-700">
                          {String(patient.patientName || "?").slice(0, 1).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-800">{patient.patientName || "-"}</p>
                          <p className="text-xs text-gray-500">Patient profile</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="rounded-lg bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
                        {patient.patientCode || "-"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {formatDateForInput(patient.dateOfBirth) || "-"}
                    </td>
                    <td className="px-6 py-4">
                      <span className="rounded-full bg-cyan-50 px-3 py-1 text-sm font-medium text-cyan-700">
                        {patient.gender || "-"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{patient.phoneNumber || "-"}</td>
                    <td className="max-w-[220px] truncate px-6 py-4 text-slate-600">
                      {patient.address || "-"}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => handleEdit(patient)}
                          className="inline-flex items-center gap-1 rounded-lg bg-amber-100 px-3 py-2 text-sm font-medium text-amber-700 transition hover:bg-amber-200"
                        >
                          <EditOutlinedIcon fontSize="small" />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(patient._id)}
                          className="inline-flex items-center gap-1 rounded-lg bg-red-100 px-3 py-2 text-sm font-medium text-red-700 transition hover:bg-red-200"
                        >
                          <DeleteOutlineIcon fontSize="small" />
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {openModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4">
          <div className="w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b bg-slate-50 px-6 py-5">
              <div>
                <h2 className="text-2xl font-bold text-slate-800">
                  {selectedPatient ? "Edit Patient" : "Add Patient"}
                </h2>
                <p className="mt-1 text-sm text-gray-500">Enter patient information</p>
              </div>
              <button
                onClick={closeModal}
                className="flex h-10 w-10 items-center justify-center rounded-full text-gray-400 transition hover:bg-red-50 hover:text-red-500"
                type="button"
              >
                <CloseIcon />
              </button>
            </div>

            <form onSubmit={handleSavePatient} className="p-6">
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Patient Code
                  </label>
                  <input
                    name="patientCode"
                    value={formData.patientCode}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-gray-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-cyan-400 focus:bg-white focus:ring-2 focus:ring-cyan-100"
                    placeholder="Patient code..."
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Full Name
                  </label>
                  <input
                    name="patientName"
                    value={formData.patientName}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-gray-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-cyan-400 focus:bg-white focus:ring-2 focus:ring-cyan-100"
                    placeholder="Full name..."
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Birth Date
                  </label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-gray-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-cyan-400 focus:bg-white focus:ring-2 focus:ring-cyan-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Gender
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-gray-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-cyan-400 focus:bg-white focus:ring-2 focus:ring-cyan-100"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Phone Number
                  </label>
                  <input
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-gray-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-cyan-400 focus:bg-white focus:ring-2 focus:ring-cyan-100"
                    placeholder="Phone number..."
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Address
                  </label>
                  <input
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-gray-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-cyan-400 focus:bg-white focus:ring-2 focus:ring-cyan-100"
                    placeholder="Address..."
                  />
                </div>
              </div>

              <div className="mt-8 flex justify-end gap-3 border-t pt-5">
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-xl border border-gray-200 px-6 py-3 font-medium text-slate-600 transition hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-slate-900 transition hover:bg-cyan-400 disabled:opacity-60"
                >
                  {saving ? "Saving..." : "Save Patient"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPatient;
