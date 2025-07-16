import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

export default function RequireAuth({ children, allowedRoles }) {
    const token = localStorage.getItem('token');
    const location = useLocation();

    if (!token) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    try {
        const decoded = jwtDecode(token);
        const scope = decoded.scope || '';
        const scopeArray = typeof scope === 'string' ? scope.split(' ') : Array.isArray(scope) ? scope : [];

        const hasRole = allowedRoles.some(role => scopeArray.includes(role));

        if (!hasRole) {
            // Nếu đã login nhưng không đúng quyền → redirect về homepage hoặc 403 page
            return <Navigate to="/" replace />;
        }

        return children;
    } catch (error) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
}
