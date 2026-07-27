import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import * as authClient from '../../services/authClient.js';
import { message } from 'antd';

const Login = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const handleChange = (field) => (e) => {
        setForm({ ...form, [field]: e.target.value });
    };

    const validate = () => {
        const e = {};
        const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!form.email) e.email = 'Vui lòng nhập email';
        else if (!emailRe.test(form.email)) e.email = 'Email không hợp lệ';
        if (!form.password) e.password = 'Vui lòng nhập mật khẩu';
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("submit");

        if (!validate()) return;
        setLoading(true);
        try {
            const res = await authClient.login({
                email: form.email,
                password: form.password
            });
            const token = res.data?.token;
            const user = res.data?.data;

            if (token) {
                authClient.setAuthToken(token)
            }
            if (user) {
                authClient.setUser(user)
            }

            if (user.role === "admin") {
                navigate("/admin")
            } else if (user.role === "doctor") {
                navigate("/doctor")
            } else if (user.role === "patient") {
                navigate("/patient")
            } else if (user.role === "staff") {
                navigate("/staff")
            } else {
                navigate("/")
            }
            message.success('Đăng nhập thành công' , 5)
        } catch (err) {
            console.error(err);
            message.error('Đăng nhập thất bại' , 5)
            setErrors({ submit: 'Đăng nhập thất bại. Kiểm tra thông tin và thử lại.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-teal-100 flex items-center justify-center px-6 py-10">
            <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden grid lg:grid-cols-2">
                <div className="hidden lg:flex relative bg-gradient-to-br from-teal-600 to-cyan-500 p-14 text-black">
                    <img
                        src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1f"
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover opacity-20"
                    />
                    <div className="relative z-10 flex flex-col justify-center">
                        <h2 className="text-5xl font-bold leading-tight">
                            Chăm sóc sức khỏe
                            <br />
                            dễ dàng hơn
                        </h2>
                        <p className="mt-6 text-lg leading-8 text-teal-100">
                            Đặt lịch khám với bác sĩ chỉ trong vài phút.
                            Quản lý lịch hẹn nhanh chóng và an toàn.
                        </p>
                        <div className="mt-12 space-y-6">

                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-xl">
                                    🩺
                                </div>
                                <div>
                                    <h4 className="font-semibold">
                                        Hơn 200 bác sĩ
                                    </h4>
                                    <p className="text-sm text-teal-100">
                                        Đội ngũ giàu kinh nghiệm
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-xl">
                                    📅
                                </div>
                                <div>
                                    <h4 className="font-semibold">
                                        Đặt lịch 24/7
                                    </h4>

                                    <p className="text-sm text-teal-100">
                                        Nhanh chóng chỉ vài bước
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-xl">
                                    ❤️
                                </div>
                                <div>
                                    <h4 className="font-semibold">
                                        Hồ sơ điện tử
                                    </h4>
                                    <p className="text-sm text-teal-100">
                                        Theo dõi lịch sử khám bệnh
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT */}
                <div className="flex items-center justify-center p-10 lg:p-14">
                    <div className="w-full max-w-md">
                        <div className="flex flex-col items-center mb-10">
                            <img
                                src="https://isofhcare-backup.s3-ap-southeast-1.amazonaws.com/images/kham-benh-online-app-ivie-bac-si-oi_1ea94131_1421_49c8_9e13_cf81e97fb5bc.jpg"
                                className="w-20 h-20 rounded-full border-4 border-teal-100 shadow-lg"
                                alt=""
                            />

                            <h2 className="mt-4 text-3xl font-bold text-teal-700">
                                Hoàn Mỹ
                            </h2>

                            <p className="text-gray-500">
                                Clinic Booking
                            </p>
                        </div>
                        <h3 className="text-3xl font-bold text-center text-gray-800">
                            Đăng nhập
                        </h3>
                        <p className="text-center text-gray-500 mt-2 mb-8">
                            Chào mừng bạn quay trở lại
                        </p>

                        {/* Form */}
                        <form className="space-y-5" onSubmit={handleSubmit}>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Email
                                </label>
                                <input
                                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-4 focus:ring-teal-100 focus:border-teal-500 transition"
                                    placeholder="Nhập email..."
                                    value={form.email}
                                    onChange={handleChange('email')}
                                />
                                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Mật khẩu
                                </label>

                                <input
                                    type="password"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-4 focus:ring-teal-100 focus:border-teal-500 transition"
                                    placeholder="••••••••"
                                    value={form.password}
                                    onChange={handleChange('password')}
                                />
                            </div>

                            <div className="flex justify-between items-center text-sm">
                                <label className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        className="rounded text-teal-600"
                                    />
                                    <span className="text-gray-600">
                                        Ghi nhớ đăng nhập
                                    </span>
                                </label>
                                <Link
                                    to=""
                                    className="text-teal-600 hover:underline"
                                >
                                    Quên mật khẩu?
                                </Link>
                            </div>

                            <button
                                type='submit'
                                className="w-full py-3 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-500 text-black font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] transition duration-300"
                            >
                                Đăng nhập
                            </button>
                        </form>

                        <div className="my-8 flex items-center">
                            <div className="flex-1 h-px bg-gray-200"></div>
                            <span className="px-4 text-sm text-gray-500">
                                Hoặc
                            </span>
                            <div className="flex-1 h-px bg-gray-200"></div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <button className="border rounded-xl py-3 hover:bg-gray-50 transition">
                                Google
                            </button>
                            <button className="border rounded-xl py-3 hover:bg-gray-50 transition">
                                Facebook
                            </button>
                        </div>

                        <p className="text-center mt-8 text-gray-500">
                            Chưa có tài khoản?
                            <Link
                                to="/register"
                                className="ml-1 text-teal-600 font-semibold hover:underline"
                            >
                                Đăng ký
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
