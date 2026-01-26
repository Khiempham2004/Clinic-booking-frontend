import React from 'react';
import { Outlet, Link } from 'react-router-dom';
const UserLayout = () => {
    return (
        <div>
            <div>
                {/* Header */}
                <div className="bg-blue-600 text-white px-6 py-4 flex justify-between">
                    <h1 className="font-bold text-lg">Garage Booking</h1>
                    <div className="space-x-4">
                        <Link to="/user">Trang chủ</Link>
                        <Link to="/user/vehicles">Xe của tôi</Link>
                        <Link to="/user/bookings">Lịch sửa</Link>
                    </div>
                </div>

                {/* Main Content */}
                <div className="p-6 bg-gray-100 min-h-screen">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default UserLayout;
