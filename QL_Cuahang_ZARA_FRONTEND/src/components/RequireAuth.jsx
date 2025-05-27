import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

export default function RequireAuth({ children }) {
    const token = localStorage.getItem('token');
    const location = useLocation();

    if (!token) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    try {
        const decoded = jwtDecode(token);
        // Thay đổi từ roles/role sang scope
        // Nếu scope là string, ta cũng chuyển thành mảng để tiện xử lý nhiều quyền
        const scope = decoded.scope || '';
        const scopeArray = typeof scope === 'string' ? scope.split(' ') : Array.isArray(scope) ? scope : [];

        if (!scopeArray.includes('ADMIN')) {
            return <Navigate to="/login" state={{ from: location }} replace />;
        }
    } catch (error) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
}
