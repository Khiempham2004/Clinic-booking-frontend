import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import * as authClient from "../services/authClient";

const AdminRoutes = ({ children }) => {
    const token = authClient.getToken();
    const user = authClient.getUser();
    const location = useLocation();

    if (!token) {
        return <Navigate to='/login' replace state={{ from: location }} />
    }

    if (!user || user.role !== "admin") {
        return <Navigate to="/403" replace />
    }

    return children;
}

export default AdminRoutes;