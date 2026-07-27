import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import * as authService from '../services/authClient';

const PrivateRoute = ({ children , roles }) => {
    const token = authService.getToken();
    const location = useLocation();

    if (!token) {
        return <Navigate to="/login" replace state={{ from: location }} />;
    }
    return children;
};

export default PrivateRoute;