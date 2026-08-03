import React, { useEffect, useMemo, useState } from "react";
import {
  CalendarMonth,
  Search,
  FilterList,
  Visibility,
  Edit,
  DeleteOutline,
  CheckCircle,
  Schedule,
  Cancel,
  EventAvailable,
  Close,
} from "@mui/icons-material";
import { message } from "antd";
import appointmentService from "../../services/appointmentService.js";
import patientService from "../../services/patientService.js"
import doctorService from "../../services/doctorService.js";
import { getBookedByLabel, normalizeBookedBy } from "../../utils/appointmentUtils.js";


const statusConfig = {
  pending: {
    label: "Pending",
    className: "bg-amber-50 text-amber-700 border-amber-200",
    icon: <Schedule fontSize="small" />,
  },
  confirmed: {
    label: "Confirmed",
    className: "bg-blue-50 text-blue-700 border-blue-200",
    icon: <EventAvailable fontSize="small" />,
  },
  completed: {
    label: "Completed",
    className: "bg-emerald-50 text-emerald-700 border-emerald-200",
    icon: <CheckCircle fontSize="small" />,
  },
  cancelled: {
    label: "Cancelled",
    className: "bg-red-50 text-red-700 border-red-200",
    icon: <Cancel fontSize="small" />,
  },
};

const initialFormdata = {
  patient: "",
  doctor: "",
  appointmentDate: "",
  appointmentTime: "",
  reason: "",
  bookedBy: "",
  status: "Pending",
};

const AdminAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [formData, setFormdata] = useState({ ...initialFormdata })
  const [loading, setLoading] = useState(false);

  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loadingPatients, setLoadingPatients] = useState(false);
  const [loadingDoctors, setLoadingDoctors] = useState(false);

  const [searchKeyword, setSearchKeyword] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [bookedByFilter, setBookedByFilter] = useState("all");

  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!formData.patient) {
      message.error("Please select a patient");
      return;
    }
    if (!formData.doctor) {
      message.error("Please select a doctor");
      return;
    }
    if (!formData.appointmentDate) {
      message.error("Please select appointment date");
      return;
    }
    if (!formData.appointmentTime) {
      message.error("Please select appointment time");
      return;
    }

    const payload = {
      patient: formData.patient,
      doctor: formData.doctor,
      appointmentDate: formData.appointmentDate,
      appointmentTime: formData.appointmentTime,
      reason: formData.reason?.trim() || "",
      bookedBy: formData.bookedBy || "",
    };

    console.log("Payload:", payload);

    try {
      setSaving(true);
      if (selectedAppointment) {
        await appointmentService.updateAppointment(selectedAppointment._id, formData);
        message.success("Appointment update succesfully");
      } else {
        const response = await appointmentService.createAppointment(payload);
        console.log("CREATE RESPONSE:", response);
        message.success("Appointment created successfully");
      }

      setShowAddModal(false);
      setFormdata({
        patient: "",
        doctor: "",
        appointmentDate: "",
        appointmentTime: "",
        reason: "",
        status: "pending",
      });

      await getAppointments();
    } catch (error) {
      console.error("Error:", error);
      console.error("Status:", error.response?.status);
      console.error("Response:", error.response?.data);

      const errorMsg =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "Failed to create appointment";

      setErrorMessage(errorMsg);
      message.error(errorMsg);
    } finally {
      setSaving(false);
    }
  };

  const handleGetPatients = async () => {
    try {
      setLoadingPatients(true);
      const res = await patientService.getAllPatient();
      const dataPatient =
        res?.data?.data ||
        res?.data ||
        res?.data?.result ||
        res ||
        [];

      setPatients(Array.isArray(dataPatient) ? dataPatient : []);
    } catch (error) {
      console.log("Get patient error : ", error);
      message.error("Không thể tải danh sách bệnh nhân")
    } finally {
      setLoadingPatients(false)
    }
  }

  const handleGetDoctors = async () => {
    try {
      setLoadingDoctors(true);
      const res = await doctorService.getAllDoctor();
      const dataDoctor =
        res?.data?.data ||
        res?.data ||
        res?.data?.result ||
        res ||
        [];
      setDoctors(Array.isArray(dataDoctor) ? dataDoctor : []);
    } catch (error) {
      console.log("Get doctor error : ", error);
      message.error("Không thể tải danh sách bác sĩ");
    } finally {
      setLoadingDoctors(false);
    }
  }

  const getAppointments = async () => {
    try {
      setLoading(true);
      const response = await appointmentService.getAllAppointment();
      const data =
        response?.data?.data ||
        response?.data ||
        response?.result ||
        [];
      setAppointments(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Get appointments error:", error);
      message.error("Không thể tải danh sách lịch hẹn");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAppointments();
    handleGetPatients();
    handleGetDoctors();
  }, []);

  const normalizedAppointments = useMemo(() => {
    return appointments.map((item) => ({
      id: item._id || item.id,

      patientName:
        item.patient?.patientName ||
        item.patient?.fullName ||
        item.patientName ||
        "Unknown Patient",

      patientPhone:
        item.patient?.phoneNumber ||
        item.phoneNumber ||
        "—",

      doctorName:
        item.doctor?.fullName ||
        item.doctor?.doctorName ||
        item.doctorName ||
        "Unknown Doctor",

      appointmentDate:
        item.appointmentDate ||
        item.date ||
        null,

      appointmentTime:
        item.appointmentTime ||
        item.time ||
        "—",

      reason:
        item.reason ||
        item.note ||
        "No reason",

      status:
        String(item.status || "pending").toLowerCase(),

      bookedBy:
        getBookedByLabel(
          item.bookedBy?.role ||
          item.createdBy?.role ||
          item.bookedBy || "N/A"
        ),

      createdAt: item.createdAt,
      raw: item,
    }));
  }, [appointments]);

  const filteredAppointments = useMemo(() => {
    return normalizedAppointments.filter((item) => {
      const keyword = searchKeyword.toLowerCase().trim();
      const matchesSearch =
        !keyword ||
        item.patientName.toLowerCase().includes(keyword) ||
        item.doctorName.toLowerCase().includes(keyword) ||
        item.patientPhone.toLowerCase().includes(keyword);

      const matchesStatus =
        statusFilter === "all" ||
        item.status === statusFilter;

      const matchesBookedBy =
        bookedByFilter === "all" ||
        normalizeBookedBy(item.bookedBy) === bookedByFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesBookedBy
      );
    });
  }, [
    normalizedAppointments,
    searchKeyword,
    statusFilter,
    bookedByFilter,
  ]);

  const stats = useMemo(() => {
    return {
      total: normalizedAppointments.length,

      pending: normalizedAppointments.filter(
        (item) => item.status === "pending"
      ).length,

      confirmed: normalizedAppointments.filter(
        (item) => item.status === "confirmed"
      ).length,

      completed: normalizedAppointments.filter(
        (item) => item.status === "completed"
      ).length,

      cancelled: normalizedAppointments.filter(
        (item) => item.status === "cancelled"
      ).length,
    };
  }, [normalizedAppointments]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata((prev) => ({
      ...prev,
      [name]: value
    }))
  }
  const handleChangeStatus = async (appointmentId, status) => {
    try {
      await appointmentService.updateAppointmentStatus(
        appointmentId,
        status
      );
      message.success("Cập nhật trạng thái thành công");
      getAppointments();
    } catch (error) {
      console.error("Update status error:", error);
      message.error("Không thể cập nhật trạng thái");
    }
  };

  const handleEdit = async (appointment) => {
    setSelectedAppointment(appointment);
    setFormdata({
      patient: appointment.patient || "",
      doctor: appointment.doctor || "",
      appointmentDate: appointment.appointmentDate || "",
      appointmentTime: appointment.appointmentTime || "",
      reason: appointment.reason || "",
      bookedBy: normalizeBookedBy(appointment.raw?.bookedBy || appointment.bookedBy || "patient"),
    });
    setShowAddModal(true);
  }

  const handleDelete = async (appointment) => {
    const confirmed = window.confirm(
      `Bạn có chắc muốn xóa lịch hẹn của ${appointment.patientName}?`
    );
    if (!confirmed) {
      return
    };

    try {
      await appointmentService.deleteAppointment(
        appointment._id
      );
      message.success("Xóa lịch hẹn thành công");
      await getAppointments();
    } catch (error) {
      console.error("Delete appointment error:", error);
      message.error("Không thể xóa lịch hẹn");
    }
  };
  const formatDate = (date) => {
    if (!date) return "—";

    return new Date(date).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-full bg-slate-50 p-6">
      <div className="mb-6 flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        <div>
          <div className="mb-1 flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-100 text-sky-600">
              <CalendarMonth />
            </div>

            <h1 className="text-2xl font-bold text-slate-800">
              Appointments Management
            </h1>
          </div>

          <p className="text-sm text-slate-500">
            Quản lý toàn bộ lịch hẹn từ Patient, Doctor và Staff.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          type="button"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-sky-600 px-5 py-3 text-sm font-semibold text-black shadow-sm transition hover:bg-sky-700"
        >
          <CalendarMonth fontSize="small" />
          Add Appointment
        </button>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <StatCard
          title="Total Appointments"
          value={stats.total}
          icon={<CalendarMonth />}
          iconWrapper="bg-sky-100 text-sky-600"
        />
        <StatCard
          title="Pending"
          value={stats.pending}
          icon={<Schedule />}
          iconWrapper="bg-amber-100 text-amber-600"
        />
        <StatCard
          title="Confirmed"
          value={stats.confirmed}
          icon={<EventAvailable />}
          iconWrapper="bg-blue-100 text-blue-600"
        />
        <StatCard
          title="Completed"
          value={stats.completed}
          icon={<CheckCircle />}
          iconWrapper="bg-emerald-100 text-emerald-600"
        />
        <StatCard
          title="Cancelled"
          value={stats.cancelled}
          icon={<Cancel />}
          iconWrapper="bg-red-100 text-red-600"
        />
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 p-5">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div className="relative w-full">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                fontSize="small"
              />

              <input
                type="text"
                placeholder="Search patient, doctor, phone..."
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                className="
                      w-full
                      rounded-xl
                      border border-slate-200
                      bg-slate-50
                      py-3
                      pl-11
                      pr-4
                      text-sm
                      text-slate-700
                      placeholder:text-slate-400
                      outline-none
                      transition-all
                      focus:border-sky-400
                      focus:bg-white
                      focus:ring-2
                      focus:ring-sky-100
                    "
              />
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative">
                <FilterList
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  fontSize="small"
                />
                <select
                  value={statusFilter}
                  onChange={(e) =>
                    setStatusFilter(e.target.value)
                  }
                  className="appearance-none rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-10 text-sm outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              <select
                value={bookedByFilter}
                onChange={(e) =>
                  setBookedByFilter(e.target.value)
                }
                className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
              >
                <option value="all">All Sources</option>
                <option value="patient">Patient</option>
                <option value="doctor">Doctor</option>
                <option value="staff">Staff</option>
              </select>
            </div>
          </div>
          <div className="mt-4 text-sm text-slate-500">
            Showing{" "}
            <span className="font-semibold text-slate-700">
              {filteredAppointments.length}
            </span>{" "}
            appointments
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-[1200px] w-full">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/80">
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                  Patient
                </th>

                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                  Doctor
                </th>

                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                  Date & Time
                </th>


                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                  Booked By
                </th>

                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                  Status
                </th>

                <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider text-slate-500">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="7" className="px-6 py-16 text-center">
                    <div className="flex flex-col items-center">
                      <div className="mb-3 h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-sky-600" />

                      <p className="text-sm text-slate-500">
                        Loading appointments...
                      </p>
                    </div>
                  </td>
                </tr>
              ) : filteredAppointments.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-16 text-center">
                    <div className="mx-auto flex max-w-sm flex-col items-center">
                      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                        <CalendarMonth fontSize="large" />
                      </div>

                      <h3 className="mb-1 text-base font-semibold text-slate-700">
                        No appointments found
                      </h3>

                      <p className="text-sm text-slate-500">
                        Không tìm thấy lịch hẹn phù hợp với bộ lọc.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredAppointments.map((appointment) => {
                  const status =
                    statusConfig[appointment.status] ||
                    statusConfig.pending;
                  return (
                    <tr
                      key={appointment.id}
                      className="border-b border-slate-100 transition hover:bg-sky-50/30"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sky-100 font-bold text-sky-600">
                            {appointment.patientName
                              .charAt(0)
                              .toUpperCase()}
                          </div>
                          <div>
                            <p className="font-semibold text-slate-800">
                              {appointment.patientName}
                            </p>

                            <p className="text-xs text-slate-500">
                              {appointment.patientPhone}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <p className="font-medium text-slate-700">
                          Dr. {appointment.doctorName}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-semibold text-slate-700">
                          {formatDate(
                            appointment.appointmentDate
                          )}
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                          {status.icon}
                          {appointment.appointmentTime}
                        </p>
                      </td>

                      <td className="px-6 py-4">
                        <span className="capitalize rounded-lg bg-violet-50 px-3 py-1.5 text-xs font-semibold text-violet-600">
                          {appointment.bookedBy}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <div className="relative">
                          <select
                            value={appointment.status}
                            onChange={(e) =>
                              handleChangeStatus(
                                appointment.id,
                                e.target.value
                              )
                            }
                            className="mb-2 block text-sm font-semibold"
                          >
                            <option value="pending" className="inline-flex rounded-full bg-yellow-100 px-3 py-2 text-sm font-semibold text-yellow-700">
                              Pending
                            </option>
                            <option value="confirmed" className="inline-flex rounded-full bg-green-100 px-3 py-2 text-sm font-semibold text-green-700">
                              Confirmed
                            </option>
                            <option value="completed" className="inline-flex rounded-full bg-blue-100 px-3 py-2 text-sm font-semibold text-blue-700">
                              Completed
                            </option>
                            <option value="cancelled" className="inline-flex rounded-full bg-red-100 px-3 py-2 text-sm font-semibold text-red-700">
                              Cancelled
                            </option>
                          </select>
                          <span className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2">
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-end gap-2">
                          <ActionButton
                            title="View"
                            icon={<Visibility fontSize="small" />}
                            onClick={() => {
                              setSelectedAppointment(
                                appointment
                              );

                              setShowDetailModal(true);
                            }}
                          />
                          <ActionButton
                            title="Edit"
                            icon={<Edit fontSize="small" />}
                            onClick={() => {
                              handleEdit(appointment)
                            }}
                          />
                          <ActionButton
                            title="Delete"
                            danger
                            icon={
                              <DeleteOutline fontSize="small" />
                            }
                            onClick={() =>
                              handleDelete(appointment)
                            }
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm">
          <div className="w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
              <div>
                <h2 className="text-xl font-bold text-slate-800">
                  Add Appointment
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Tạo lịch hẹn mới
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition hover:bg-slate-200"
              >
                <Close fontSize="small" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
              <div className="p-6">
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Patient
                    </label>

                    <select
                      name="patient"
                      value={formData.patient}
                      onChange={handleChange}
                      required
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
                    >
                      <option value="">
                        {
                          loadingPatients
                            ? "Loading patient..."
                            : "Select patient"
                        }
                      </option>
                      {patients.map((patient) => (
                        <option
                          key={patient._id || patient.id}
                          value={patient._id || patient.id}
                        >
                          {patient.patientName}
                        </option>
                      ))
                      }
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Doctor
                    </label>
                    <select
                      name="doctor"
                      value={formData.doctor}
                      onChange={handleChange}
                      required
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
                    >
                      <option value="">
                        {loadingDoctors
                          ? "Loading doctors..."
                          : "Select doctors"}
                      </option>
                      {doctors.map((doctor) => (
                        <option
                          key={doctor._id || doctor.id}
                          value={doctor._id || doctor.id}
                        >
                          {doctor.fullName}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Appointment Date
                    </label>
                    <input
                      name="appointmentDate"
                      value={formData.appointmentDate}
                      onChange={handleChange}
                      required
                      type="date"
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Appointment Time
                    </label>
                    <input
                      name="appointmentTime"
                      value={formData.appointmentTime}
                      onChange={handleChange}
                      required
                      type="time"
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
                    />
                  </div>

                  <div>
                    <label>
                      Booked By: <span className="font-semibold">{formData.bookedBy || "N/A"}</span>
                    </label>
                    <select
                      name="bookedBy"
                      value={formData.bookedBy}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
                    >
                      <option value="">Select booked by</option>
                      <option value="patient">Patient</option>
                      <option value="doctor">Doctor</option>
                      <option value="staff">Staff</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Reason / Notes
                    </label>
                    <textarea
                      name="reason"
                      value={formData.reason}
                      onChange={handleChange}
                      rows="4"
                      placeholder="Nhập triệu chứng hoặc ghi chú..."
                      className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 border-t border-slate-200 px-6 py-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-xl bg-sky-600 px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-sky-700"
                >
                  {saving ? "Saving..." : "Save appointment"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showDetailModal && selectedAppointment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm">
          <div className="w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
              <div>
                <h2 className="text-xl font-bold text-slate-800">
                  Appointment Details
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Chi tiết thông tin lịch hẹn
                </p>
              </div>
              <button
                type="button"
                onClick={() =>
                  setShowDetailModal(false)
                }
                className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition hover:bg-slate-200"
              >
                <Close fontSize="small" />
              </button>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <DetailItem
                  label="Patient"
                  value={
                    selectedAppointment.patientName
                  }
                />
                <DetailItem
                  label="Phone"
                  value={
                    selectedAppointment.patientPhone
                  }
                />
                <DetailItem
                  label="Doctor"
                  value={`Dr. ${selectedAppointment.doctorName}`}
                />
                <DetailItem
                  label="Date"
                  value={formatDate(
                    selectedAppointment.appointmentDate
                  )}
                />
                <DetailItem
                  label="Time"
                  value={
                    selectedAppointment.appointmentTime
                  }
                />
                <DetailItem
                  label="Booked By"
                  value={
                    selectedAppointment.bookedBy
                  }
                />
                <DetailItem
                  label="Status"
                  value={
                    statusConfig[
                      selectedAppointment.status
                    ]?.label ||
                    selectedAppointment.status
                  }
                />
              </div>
              <div className="mt-5">
                <p className="mb-2 text-sm font-semibold text-slate-700">
                  Reason
                </p>

                <div className="rounded-xl bg-slate-50 p-4 text-sm leading-6 text-slate-600">
                  {selectedAppointment.reason}
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-3 border-t border-slate-200 px-6 py-4">
              <button
                type="button"
                onClick={() =>
                  setShowDetailModal(false)
                }
                className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
const StatCard = ({
  title,
  value,
  icon,
  iconWrapper,
}) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <h3 className="mt-2 text-3xl font-bold text-slate-800">
            {value}
          </h3>
        </div>

        <div
          className={`flex h-12 w-12 items-center justify-center rounded-xl ${iconWrapper}`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
};

const ActionButton = ({
  title,
  icon,
  onClick,
  danger = false,
}) => {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className={`flex h-9 w-9 items-center justify-center rounded-lg transition ${danger
        ? "text-red-500 hover:bg-red-50"
        : "text-slate-500 hover:bg-sky-50 hover:text-sky-600"
        }`}
    >
      {icon}
    </button>
  );
};
const DetailItem = ({ label, value }) => {
  return (
    <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-sm font-semibold text-slate-700">
        {value || "—"}
      </p>
    </div>
  );
};

export default AdminAppointments;