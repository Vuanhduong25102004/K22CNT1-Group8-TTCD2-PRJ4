
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Logon from '../pages/Logon';
import RequireAuth from '../components/RequireAuth';
import AdminPage from '../pages/AdminPage';
import Products from '../components/Products';

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logon" element={<Logon />} />
            <Route
                path="/admin/*"
                element={
                    <RequireAuth>
                        <AdminPage />
                    </RequireAuth>
                }
            />
            <Route
                path="/product"
                element={
                    <RequireAuth>
                        <Products />
                    </RequireAuth>
                }
            />

        </Routes>
    );
}
