
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Logon from '../pages/Logon';
import AdminPage from '../pages/AdminPage';

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logon" element={<Logon />} />
            <Route path="/admin" element={<AdminPage />} />
        </Routes>
    );
}
