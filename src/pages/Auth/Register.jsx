import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import * as authService from '../../services/authClient';
import { message } from 'antd';

const Register = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirmPassword: '' });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const handleChange = (field) => (e) => setForm({ ...form, [field]: e.target.value });

    const validate = () => {
        const e = {};
        if (!form.name) e.name = 'Vui lòng nhập họ và tên';
        const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!form.email) e.email = 'Vui lòng nhập email';
        else if (!emailRe.test(form.email)) e.email = 'Email không hợp lệ';
        const phoneRe = /^\+?[0-9]{7,15}$/;
        if (form.phone && !phoneRe.test(form.phone)) e.phone = 'Số điện thoại không hợp lệ';
        if (!form.password) e.password = 'Vui lòng nhập mật khẩu';
        if (form.password !== form.confirmPassword) e.confirmPassword = 'Mật khẩu xác nhận không khớp';
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(e.preventDefault());

        if (!validate()) return;
        setLoading(true);
        try {
            const payload = { name: form.name, email: form.email, phone: form.phone, password: form.password };
            await authService.register(payload);
            navigate('/login');
            message.success('Đăng ký thành công', 3)
        } catch (err) {
            console.error(err);
            message.error("Đăng ký thất bại", 3)
            setErrors({ submit: 'Đăng ký thất bại. Vui lòng thử lại.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white flex items-center justify-center py-12 px-4">
            <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">
                <div className="hidden lg:flex relative bg-gradient-to-br from-teal-600 to-cyan-500 p-14 overflow-hidden">
                    <img
                        src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1f"
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover opacity-20"
                    />

                    <div className="relative z-10 flex flex-col justify-center text-black">
                        <h2 className="text-5xl font-bold leading-tight">
                            Tạo tài khoản
                            <br />
                            ngay hôm nay
                        </h2>

                        <p className="mt-6 text-lg leading-8 text-teal-100">
                            Quản lý hồ sơ bệnh nhân, đặt lịch khám nhanh chóng và theo dõi lịch sử khám bệnh mọi lúc.
                        </p>

                        <div className="space-y-8 mt-12">

                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-black/20 flex items-center justify-center text-xl">
                                    ❤️
                                </div>

                                <div>
                                    <h4 className="font-semibold text-lg">
                                        Lưu hồ sơ bệnh nhân
                                    </h4>

                                    <p className="text-teal-100 text-sm">
                                        Quản lý thông tin an toàn
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-black/20 flex items-center justify-center text-xl">
                                    📅
                                </div>

                                <div>
                                    <h4 className="font-semibold text-lg">
                                        Đặt lịch 24/7
                                    </h4>

                                    <p className="text-teal-100 text-sm">
                                        Chỉ mất vài phút
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-xl">
                                    👨‍⚕️
                                </div>
                                <div>
                                    <h4 className="font-semibold text-lg">
                                        Theo dõi lịch sử khám
                                    </h4>
                                    <p className="text-teal-100 text-sm">
                                        Dễ dàng xem lại mọi lần khám
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT */}
                <div className="flex items-center justify-center p-10 lg:p-14 bg-white">
                    <div className="w-full max-w-md">
                        <div className="flex flex-col items-center mb-8">
                            <img
                                src="https://isofhcare-backup.s3-ap-southeast-1.amazonaws.com/images/kham-benh-online-app-ivie-bac-si-oi_1ea94131_1421_49c8_9e13_cf81e97fb5bc.jpg"
                                alt=""
                                className="w-20 h-20 rounded-full border-4 border-teal-100 shadow-lg"
                            />
                            <h2 className="mt-4 text-3xl font-bold text-teal-700">
                                Hoàn Mỹ
                            </h2>
                            <p className="text-gray-500">
                                Clinic Booking
                            </p>
                        </div>

                        <h3 className="text-3xl font-bold text-center text-gray-800">
                            Tạo tài khoản
                        </h3>
                        <p className="text-center text-gray-500 mt-2 mb-8">
                            Đăng ký để bắt đầu đặt lịch khám
                        </p>
                        {errors.submit && (
                            <div className="mb-5 rounded-lg bg-red-50 border border-red-200 p-3 text-center text-red-600">
                                {errors.submit}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="block font-medium text-gray-700 mb-2">
                                    Họ và tên
                                </label>
                                <input
                                    value={form.name}
                                    onChange={handleChange("name")}
                                    placeholder="Nhập họ và tên..."
                                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-4 focus:ring-teal-100 focus:border-teal-500 transition"
                                />

                                {errors.name && (
                                    <p className="mt-1 text-red-500 text-sm">
                                        {errors.name}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block font-medium text-gray-700 mb-2">
                                    Email
                                </label>

                                <input
                                    type="email"
                                    value={form.email}
                                    onChange={handleChange("email")}
                                    placeholder="Nhập email..."
                                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-4 focus:ring-teal-100 focus:border-teal-500 transition"
                                />
                                {errors.email && (
                                    <p className="mt-1 text-red-500 text-sm">
                                        {errors.email}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block font-medium text-gray-700 mb-2">
                                    Số điện thoại
                                </label>

                                <input
                                    value={form.phone}
                                    onChange={handleChange("phone")}
                                    placeholder="Nhập số điện thoại..."
                                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-4 focus:ring-teal-100 focus:border-teal-500 transition"
                                />

                                {errors.phone && (
                                    <p className="mt-1 text-red-500 text-sm">
                                        {errors.phone}
                                    </p>
                                )}
                            </div>

                            <div 
                            className="grid grid-cols-1 md:grid-cols-1"
                            >
                                <div>
                                    <label className="block font-medium text-gray-700 mb-2">
                                        Mật khẩu
                                    </label>
                                    <input
                                        type="password"
                                        value={form.password}
                                        onChange={handleChange("password")}
                                        placeholder="********"
                                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-4 focus:ring-teal-100 focus:border-teal-500 transition"
                                    />

                                    {errors.password && (
                                        <p className="mt-1 text-red-500 text-sm">
                                            {errors.password}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-500 text-black font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] transition duration-300"
                            >
                                {loading ? "Đang đăng ký..." : "Đăng ký"}
                            </button>
                        </form>
                        <p className="mt-8 text-center text-gray-500">
                            Đã có tài khoản?
                            <Link
                                to="/login"
                                className="ml-1 text-teal-600 font-semibold hover:underline"
                            >
                                Đăng nhập
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
