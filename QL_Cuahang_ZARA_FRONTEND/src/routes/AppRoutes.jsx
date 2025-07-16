import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Logon from '../pages/Logon';
import HomeProducts from '../pages/HomeProducts';
import RequireAuth from '../components/RequireAuth';
import AdminPage from '../pages/AdminPage';
import Products from '../components/Products';
import ProductDetail from '../components/ProductDetail';
import MyCart from '../pages/MyCart';
import User from '../pages/User';
import Myinfo from '../pages/Myinfo';
import UserOrders from '../pages/UserOrders';

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/logon" element={<Logon />} />
            <Route path="/home/search" element={<HomeProducts />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/mycart" element={<MyCart />} />

            <Route
                path="/orders"
                element={
                    <RequireAuth allowedRoles={['USER', 'ADMIN']}>
                        <UserOrders />
                    </RequireAuth>
                }
            />

            {/* Khu vực /user có chứa các trang con như /user/myinfo */}
            <Route
                path="/user"
                element={
                    <RequireAuth allowedRoles={['USER', 'ADMIN']}>
                        <User />
                    </RequireAuth>
                }
            >
                <Route path="myinfo" element={<Myinfo />} />
            </Route>

            <Route
                path="/admin"
                element={
                    <RequireAuth allowedRoles={['ADMIN']}>
                        <AdminPage />
                    </RequireAuth>
                }
            >
                <Route path="products" element={<Products />} />
            </Route>
        </Routes>
    );
}
