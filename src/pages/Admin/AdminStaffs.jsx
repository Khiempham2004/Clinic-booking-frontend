import React, { useEffect, useMemo, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import GroupsIcon from "@mui/icons-material/Groups";
import PersonIcon from "@mui/icons-material/Person";
import SearchIcon from "@mui/icons-material/Search";
import staffService from "../../services/staffService.js";
import { message } from "antd";

const initialFormData = {
    staffCode: "",
    fullName: "",
    email: "",
    phoneNumber: "",
    gender: "Male",
    role: "Staff",
    address: "",
    status: "active",
};

const AdminStaffs = () => {
    const [staffs, setStaffs] = useState([]);
    const [formData, setFormData] = useState({ ...initialFormData });
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [search, setSearch] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [selectedStaff, setSelectedStaff] = useState(null);
    const [openModal, setOpenModal] = useState(false);

    const loadStaffs = async () => {
        try {
            setLoading(true);
            setErrorMessage("");
            const response = await staffService.getAllStaff();
            setStaffs(response.data?.data || []);
        } catch (error) {
            setErrorMessage(error.message || "Failed to load staffs");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadStaffs();
    }, []);

    const filteredStaffs = useMemo(() => {
        const keyword = search.trim().toLowerCase();
        if (!keyword) return staffs;

        return staffs.filter((staff) =>
            [
                staff.staffCode,
                staff.fullName,
                staff.email,
                staff.phoneNumber,
                staff.gender,
                staff.role,
                staff.address,
                staff.status,
            ].some((value) => String(value || "").toLowerCase().includes(keyword))
        );
    }, [staffs, search]);

    const closeModal = () => {
        setOpenModal(false);
        setSelectedStaff(null);
        setFormData({ ...initialFormData });
    };

    const handleAdd = () => {
        setSelectedStaff(null);
        setFormData({ ...initialFormData });
        setOpenModal(true);
    };

    const handleEdit = (staff) => {
        setSelectedStaff(staff);
        setFormData({
            staffCode: staff.staffCode || "",
            fullName: staff.fullName || "",
            email: staff.email || "",
            phoneNumber: staff.phoneNumber || "",
            gender: staff.gender || "Male",
            role: staff.role || "Staff",
            address: staff.address || "",
            status: staff.status || "active",
        });
        setOpenModal(true);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSaveStaff = async (event) => {
        event.preventDefault();
        setErrorMessage("");
        try {
            setSaving(true);
            if (selectedStaff) {
                await staffService.updateStaff(selectedStaff._id, formData);
                message.success("Staff updated successfully");
            } else {
                await staffService.createStaff(formData);
                message.success("Staff created successfully");
            }
            closeModal();
            loadStaffs();
        } catch (error) {
            setErrorMessage(error.message || "Failed to save staff");
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this staff?")) return;
        try {
            setErrorMessage("");
            await staffService.deletedStaff(id);
            message.success("Staff deleted successfully");
            loadStaffs();
        } catch (error) {
            setErrorMessage(error.message || "Failed to delete staff");
        }
    };

    const activeStaffs = staffs.filter((staff) => staff.status === "active").length;
    const inactiveStaffs = staffs.filter((staff) => staff.status === "inactive").length;
    const departments = new Set(
        staffs.map((staff) => staff.role).filter(Boolean)
    ).size;

    return (
        <div className="space-y-6 rounded-3xl bg-gradient-to-br from-sky-50 via-white to-emerald-50 p-1">
            <div className="rounded-2xl border border-sky-100 bg-gradient-to-r from-sky-500 via-cyan-500 to-emerald-400 p-6 text-black shadow-md">
                <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-black/20 px-3 py-1 text-sm text-black">
                            <GroupsIcon fontSize="small" />
                            Admin workspace
                        </div>
                        <h1 className="text-3xl font-bold">Staff Management</h1>
                        <p className="mt-2 max-w-2xl text-sm text-sky-50">
                            Manage hospital employees, departments, and working status.
                        </p>
                    </div>

                    <button
                        onClick={handleAdd}
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-cyan-700 shadow-lg transition hover:bg-sky-50 md:w-auto"
                    >
                        <AddIcon fontSize="small" />
                        Add Staff
                    </button>
                </div>
            </div>

            {errorMessage && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-600">
                    {errorMessage}
                </div>
            )}

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
                <div className="rounded-2xl border border-sky-100 bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-500">Total Staff</p>
                            <h2 className="mt-2 text-3xl font-bold text-cyan-700">{staffs.length}</h2>
                        </div>
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-100 text-cyan-700">
                            <GroupsIcon />
                        </div>
                    </div>
                </div>

                <div className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
                    <p className="text-sm font-medium text-gray-500">Active</p>
                    <h2 className="mt-2 text-3xl font-bold text-emerald-600">{activeStaffs}</h2>
                </div>

                <div className="rounded-2xl border border-rose-100 bg-white p-6 shadow-sm">
                    <p className="text-sm font-medium text-gray-500">Inactive</p>
                    <h2 className="mt-2 text-3xl font-bold text-rose-600">{inactiveStaffs}</h2>
                </div>

                <div className="rounded-2xl border border-sky-100 bg-white p-6 shadow-sm">
                    <p className="text-sm font-medium text-gray-500">Roles</p>
                    <h2 className="mt-2 text-3xl font-bold text-sky-600">{departments}</h2>
                </div>
            </div>

            <div className="rounded-2xl border border-sky-100 bg-white p-5 shadow-sm">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="relative flex-1">
                        <SearchIcon
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                            fontSize="small"
                        />
                        <input
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                            placeholder="Search by code, name, role, email, phone, or address..."
                            className="w-full rounded-xl border border-sky-100 bg-sky-50 py-3 pl-11 pr-4 outline-none transition focus:border-cyan-400 focus:bg-white focus:ring-2 focus:ring-cyan-100"
                        />
                    </div>
                    <div className="rounded-xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
                        {filteredStaffs.length} result{filteredStaffs.length === 1 ? "" : "s"}
                    </div>
                </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-sky-100 bg-white shadow-sm">
                <div className="border-b border-sky-100 bg-gradient-to-r from-sky-50 to-emerald-50 px-6 py-4">
                    <h2 className="text-lg font-semibold text-cyan-800">Staff List</h2>
                    <p className="text-sm text-gray-500">View and update hospital employee records.</p>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full min-w-[1050px]">
                        <thead className="bg-sky-50 text-xs uppercase tracking-wide text-cyan-700">
                            <tr>
                                <th className="px-6 py-4 text-left">Staff Code</th>
                                <th className="px-6 py-4 text-left">fullName</th>
                                <th className="px-6 py-4 text-left">Email</th>
                                <th className="px-6 py-4 text-left">Phone</th>
                                <th className="px-6 py-4 text-left">Gender</th>
                                <th className="px-6 py-4 text-left">Role</th>
                                <th className="px-6 py-4 text-left">Address</th>
                                <th className="px-6 py-4 text-left">Status</th>
                                <th className="px-6 py-4 text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-sky-50">
                            {loading ? (
                                <tr>
                                    <td colSpan={9} className="py-14 text-center text-gray-400">
                                        Loading staffs...
                                    </td>
                                </tr>
                            ) : filteredStaffs.length === 0 ? (
                                <tr>
                                    <td colSpan={9} className="py-14 text-center text-gray-400">
                                        No staffs found.
                                    </td>
                                </tr>
                            ) : (
                                filteredStaffs.map((staff) => (
                                    <tr key={staff._id} className="transition hover:bg-sky-50">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-sky-100 to-emerald-100 font-semibold text-cyan-700">
                                                    {String(staff.fullName || "?").slice(0, 1).toUpperCase()}
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-cyan-900">{staff.fullName || "-"}</p>
                                                    <p className="text-xs text-gray-500">{staff.address || "Employee profile"}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="rounded-lg bg-sky-100 px-3 py-1 text-sm font-medium text-sky-700">
                                                {staff.staffCode || "-"}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-slate-600">{staff.email || "-"}</td>
                                        <td className="px-6 py-4 text-slate-600">{staff.phoneNumber || "-"}</td>
                                        <td className="px-6 py-4 text-slate-600">{staff.gender || "-"}</td>
                                        <td className="px-6 py-4 text-slate-600">{staff.role || "-"}</td>
                                        <td className="max-w-[220px] truncate px-6 py-4 text-slate-600">
                                            {staff.address || "-"}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span
                                                className={`rounded-full px-3 py-1 text-sm font-medium ${staff.status === "active"
                                                    ? "bg-emerald-50 text-emerald-700"
                                                    : "bg-rose-50 text-rose-700"
                                                    }`}
                                            >
                                                {staff.status === "active" ? "Active" : "Inactive"}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex justify-center gap-2">
                                                <button
                                                    onClick={() => handleEdit(staff)}
                                                    className="inline-flex items-center gap-1 rounded-lg bg-sky-100 px-3 py-2 text-sm font-medium text-sky-700 transition hover:bg-sky-200"
                                                >
                                                    <EditOutlinedIcon fontSize="small" />
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(staff._id)}
                                                    className="inline-flex items-center gap-1 rounded-lg bg-rose-50 px-3 py-2 text-sm font-medium text-rose-700 transition hover:bg-rose-100"
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
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-cyan-950/50 p-4">
                    <div className="w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl">
                        <div className="flex items-center justify-between border-b border-sky-100 bg-gradient-to-r from-sky-50 to-emerald-50 px-6 py-5">
                            <div>
                                <h2 className="text-2xl font-bold text-cyan-900">
                                    {selectedStaff ? "Edit Staff" : "Add Staff"}
                                </h2>
                                <p className="mt-1 text-sm text-gray-500">Enter employee information</p>
                            </div>
                            <button
                                onClick={closeModal}
                                className="flex h-10 w-10 items-center justify-center rounded-full text-gray-400 transition hover:bg-red-50 hover:text-red-500"
                                type="button"
                            >
                                <CloseIcon />
                            </button>
                        </div>

                        <form onSubmit={handleSaveStaff} className="p-6">
                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                                        Staff Code
                                    </label>
                                    <input
                                        name="staffCode"
                                        value={formData.staffCode}
                                        onChange={handleChange}
                                        required
                                        className="w-full rounded-xl border border-sky-100 bg-sky-50 px-4 py-3 outline-none transition focus:border-cyan-400 focus:bg-white focus:ring-2 focus:ring-cyan-100"
                                        placeholder="Staff code..."
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                                        Full Name
                                    </label>
                                    <input
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        required
                                        className="w-full rounded-xl border border-sky-100 bg-sky-50 px-4 py-3 outline-none transition focus:border-cyan-400 focus:bg-white focus:ring-2 focus:ring-cyan-100"
                                        placeholder="Full name..."
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                                        Email
                                    </label>
                                    <input
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full rounded-xl border border-sky-100 bg-sky-50 px-4 py-3 outline-none transition focus:border-cyan-400 focus:bg-white focus:ring-2 focus:ring-cyan-100"
                                        placeholder="Receptionist, nurse, accountant..."
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                                        PhoneNumber
                                    </label>
                                    <input
                                        name="phoneNumber"
                                        value={formData.phoneNumber}
                                        onChange={handleChange}
                                        className="w-full rounded-xl border border-sky-100 bg-sky-50 px-4 py-3 outline-none transition focus:border-cyan-400 focus:bg-white focus:ring-2 focus:ring-cyan-100"
                                        placeholder="Front desk, pharmacy, billing..."
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
                                        className="w-full rounded-xl border border-sky-100 bg-sky-50 px-4 py-3 outline-none transition focus:border-cyan-400 focus:bg-white focus:ring-2 focus:ring-cyan-100"
                                    >
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                                        Role
                                    </label>
                                    <select
                                        name="role"
                                        value={formData.role}
                                        onChange={handleChange}
                                        className="w-full rounded-xl border border-sky-100 bg-sky-50 px-4 py-3 outline-none transition focus:border-cyan-400 focus:bg-white focus:ring-2 focus:ring-cyan-100"
                                    >
                                        <option value="Staff">Staff</option>
                                        <option value="Nurse">Nurse</option>
                                        <option value="Receptionist">Receptionist</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                                        Address
                                    </label>
                                    <input
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        className="w-full rounded-xl border border-sky-100 bg-sky-50 px-4 py-3 outline-none transition focus:border-cyan-400 focus:bg-white focus:ring-2 focus:ring-cyan-100"
                                        placeholder="Address..."
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                                        Status
                                    </label>
                                    <select
                                        name="status"
                                        value={formData.status}
                                        onChange={handleChange}
                                        className="w-full rounded-xl border border-sky-100 bg-sky-50 px-4 py-3 outline-none transition focus:border-cyan-400 focus:bg-white focus:ring-2 focus:ring-cyan-100"
                                    >
                                        <option value="active">Active</option>
                                        <option value="inactive">Inactive</option>
                                    </select>
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
                                    className="rounded-xl border border-gray-200 px-6 py-3 font-medium text-slate-600 transition hover:bg-gray-100"
                                >
                                    {/* <PersonIcon fontSize="small" /> */}
                                    {saving ? "Saving..." : "Save"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminStaffs;
