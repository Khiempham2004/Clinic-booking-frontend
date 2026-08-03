import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as authService from "../../services/authClient.js";

const Header = () => {
    const [open, setOpen] = useState(false);
    const [token, setToken] = useState(authService.getToken());

    const navigate = useNavigate();

    // useEffect(() => {
    //     const updateToken = () => {
    //         setToken(authService.getToken());
    //     };
      
    // }, []);

    const handleLogout = () => {
        authService.setAuthToken(null);
        navigate("/");
    };

    return (
        <header className="sticky top-0 z-50 bg-white shadow-md backdrop-blur-lg shadow-md border-b border-gray-100">
            <div className="bg-gradient-to-r from-teal-700 to-cyan-600 text-black text-sm">
                <div className="max-w-7xl mx-auto flex justify-between items-center h-10 px-6">
                    <div className="flex gap-6">
                        <span className="hover:text-yellow-300 cursor-pointer duration-300">
                            📍 Hà Nội
                        </span>

                        <span className="hover:text-yellow-300 cursor-pointer duration-300">
                            🕘 07:00 - 20:00
                        </span>
                    </div>

                    <div className="flex gap-6">
                        <span className="hover:text-yellow-300 cursor-pointer duration-300">
                            📞 1900 9999
                        </span>

                        <span className="hover:text-yellow-300 cursor-pointer duration-300">
                            ✉ support@hoanmy.vn
                        </span>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-5">
                <div className="flex justify-between items-center h-20">
                    <Link
                        to="/"
                        className="flex items-center gap-3 group"
                    >
                        <img
                            src="https://isofhcare-backup.s3-ap-southeast-1.amazonaws.com/images/kham-benh-online-app-ivie-bac-si-oi_1ea94131_1421_49c8_9e13_cf81e97fb5bc.jpg"
                            alt=""
                            className="w-14 h-14 rounded-full object-cover border-2 border-teal-500 group-hover:scale-105 duration-300"
                        />

                        <div>
                            <h1 className="text-xl font-bold text-teal-700">
                                Hoàn Mỹ
                            </h1>

                            <p className="text-xs tracking-widest uppercase text-gray-500">
                                Clinic Booking
                            </p>
                        </div>
                    </Link>

                    <nav className="hidden md:flex items-center gap-10 text-gray-700 font-medium">
                        <Link
                            to="/"
                            className="hover:text-teal-600 duration-200"
                        >
                            Trang chủ
                        </Link>

                        <Link
                            to="/doctor"
                            className="hover:text-teal-600 duration-200"
                        >
                            Bác sĩ
                        </Link>

                        <Link
                            to="/specialty"
                            className="hover:text-teal-600 duration-200"
                        >
                            Chuyên khoa
                        </Link>

                        <Link
                            to="/booking"
                            className="hover:text-teal-600 duration-200"
                        >
                            Đặt lịch
                        </Link>

                        <Link
                            to="/contact"
                            className="hover:text-teal-600 duration-200"
                        >
                            Liên hệ
                        </Link>
                    </nav>
                    <div className="hidden md:flex items-center gap-4">
                        {!token ? (
                            <Link
                                to="/login"
                                className="font-medium hover:text-teal-600"
                            >
                                Đăng nhập
                            </Link>
                        ) : (
                            <>
                                <button
                                    onClick={() => navigate("/patient")}
                                    className="px-4 py-2 rounded-lg hover:bg-gray-100 duration-200"
                                >
                                    Tài khoản
                                </button>

                                <button
                                    onClick={handleLogout}
                                    className="px-4 py-2 rounded-lg text-red-600 hover:bg-red-50 duration-200"
                                >
                                    Đăng xuất
                                </button>
                            </>
                        )}

                        <Link
                            to="/booking"
                            className="bg-teal-600 hover:bg-teal-700 text-black px-5 py-3 rounded-full shadow-lg hover:shadow-xl duration-300"
                        >
                            Đặt lịch hẹn
                        </Link>
                    </div>

                    <button
                        onClick={() => setOpen(!open)}
                        className="md:hidden p-2 rounded-lg hover:bg-gray-100"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-7 h-7"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}

            {open && (
                <div className="md:hidden bg-black border-t shadow-lg">
                    <div className="flex flex-col p-5 gap-4">

                        <Link to="/" onClick={() => setOpen(false)}>
                            Trang chủ
                        </Link>

                        <Link to="/doctor" onClick={() => setOpen(false)}>
                            Bác sĩ
                        </Link>

                        <Link to="/specialty" onClick={() => setOpen(false)}>
                            Chuyên khoa
                        </Link>

                        <Link to="/booking" onClick={() => setOpen(false)}>
                            Đặt lịch
                        </Link>

                        <Link to="/contact" onClick={() => setOpen(false)}>
                            Liên hệ
                        </Link>

                        <hr />

                        {!token ? (
                            <Link
                                to="/login"
                                onClick={() => setOpen(false)}
                                className="font-semibold text-teal-600"
                            >
                                Đăng nhập
                            </Link>
                        ) : (
                            <>
                                <button
                                    onClick={() => {
                                        navigate("/user");
                                        setOpen(false);
                                    }}
                                    className="text-left"
                                >
                                    Tài khoản
                                </button>

                                <button
                                    onClick={() => {
                                        handleLogout();
                                        setOpen(false);
                                    }}
                                    className="text-left text-red-600"
                                >
                                    Đăng xuất
                                </button>
                            </>
                        )
                        }

                        <Link
                            to="/booking"
                            onClick={() => setOpen(false)}
                            className="mt-2 bg-teal-600 text-black rounded-full py-3 text-center hover:bg-teal-700 duration-300"
                        >
                            Đặt lịch hẹn
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;