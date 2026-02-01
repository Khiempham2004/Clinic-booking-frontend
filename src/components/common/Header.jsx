import React, { useState } from 'react';
import { Link } from 'react-router-dom';


const Header = () => {
    const [open, setOpen] = useState(false);

    return (
        <div style={{ margin: "50px" , display:"flex"}}>
            <header className="w-full bg-white shadow-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex items-center justify-between h-16">
                        <Link to="/" className="flex items-center space-x-2">
                            <span className="text-xl font-bold text-teal-700 item-center">
                                <img style={{ width: "50px" }} src='https://isofhcare-backup.s3-ap-southeast-1.amazonaws.com/images/kham-benh-online-app-ivie-bac-si-oi_1ea94131_1421_49c8_9e13_cf81e97fb5bc.jpg' logo="Hoàn Mỹ" />
                                Hoàn Mỹ
                            </span>
                        </Link>

                        {/* MENU DESKTOP */}
                        <nav className="hidden md:flex space-x-6 text-gray-700 font-medium">
                            <Link to="/" className="hover:text-teal-600">
                                Trang chủ
                            </Link>
                            <Link to="/doctor" className="hover:text-teal-600">
                                Bác sĩ
                            </Link>
                            <Link to="/specialty" className="hover:text-teal-600">
                                Chuyên khoa
                            </Link>
                            <Link to="/booking" className="hover:text-teal-600">
                                Đặt lịch
                            </Link>
                            <Link to="/news" className="hover:text-teal-600">
                                Tin tức
                            </Link>
                            <Link to="/contact" className="hover:text-teal-600">
                                Liên hệ
                            </Link>
                        </nav>

                        {/* RIGHT ACTION */}
                        <div className="hidden md:flex items-center space-x-4">
                            <Link
                                to="/login"
                                className="text-gray-600 hover:text-teal-600"
                            >
                                Đăng nhập
                            </Link>

                            <Link
                                to="/booking"
                                className="bg-teal-600 text-white px-4 py-2 rounded-full hover:bg-teal-700 transition"
                            >
                                Đặt lịch hẹn
                            </Link>
                        </div>

                        {/* MOBILE BUTTON */}
                        <button
                            className="md:hidden text-gray-600"
                            onClick={() => setOpen(!open)}
                        >
                            ☰
                        </button>
                    </div>
                </div>

                {/* MOBILE MENU */}
                {open && (
                    <div className="md:hidden bg-white shadow-lg">
                        <nav className="flex flex-col px-4 py-4 space-y-3">
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
                            <Link to="/news" onClick={() => setOpen(false)}>
                                Tin tức
                            </Link>
                            <Link to="/contact" onClick={() => setOpen(false)}>
                                Liên hệ
                            </Link>

                            <Link
                                to="/login"
                                className="text-teal-600 font-medium"
                                onClick={() => setOpen(false)}
                            >
                                Đăng nhập
                            </Link>

                            <Link
                                to="/booking"
                                className="bg-teal-600 text-white text-center py-2 rounded-full"
                                onClick={() => setOpen(false)}
                            >
                                Đặt lịch hẹn
                            </Link>
                        </nav>
                    </div>
                )}
            </header>
        </div>
    );
}

export default Header;
