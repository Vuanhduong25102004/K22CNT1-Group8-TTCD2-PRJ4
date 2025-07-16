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

import Users from '../components/Users';
import GioHang from '../components/GioHang';
import DonHang from '../components/DonHang';

// Nhập cả hai component OrderDetail (cho tất cả) và SingleOrderDetail (cho 1 đơn hàng cụ thể)
import OrderDetail from '../components/OrderDetail'; // Component hiện tại của bạn (hiển thị TẤT CẢ)
import SingleOrderDetail from '../components/SingleOrderDetail'; // Component mới tạo (hiển thị 1 đơn hàng)
import AdminPaymentManagement from '../components/AdminPaymentManagement';
import AdminPaymentMethodManagement from '../components/AdminPaymentMethodManagement';
import ChiTietGioHang from '../components/ChiTietGioHang';

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
            <Route path="/donhang-chitiet/:maDonHang" element={<SingleOrderDetail />} />
            <Route path="/giohang-chitiet/:maGioHang" element={<ChiTietGioHang />} />
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
                <Route path="users" element={<Users />} />
                <Route path="giohang" element={<GioHang />} />
                <Route path="donhang" element={<DonHang />} />
                <Route path="adminpaymentmanagement" element={<AdminPaymentManagement />} />
                <Route path="adminpaymentmethodmanagement" element={<AdminPaymentMethodManagement />} />
                <Route path="chitietgiohang" element={<ChiTietGioHang />} />

                {/* Route cho component OrderDetail (hiển thị TẤT CẢ chi tiết đơn hàng) */}
                {/* Đảm bảo tên path này khớp với Link quay lại từ SingleOrderDetail */}
                <Route path="orderdetail" element={<OrderDetail />} />
            </Route>
        </Routes>
    );
}
