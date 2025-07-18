import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Import các component của bạn
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
import GioHang from '../components/GioHang'; // Component liệt kê tất cả giỏ hàng (admin)
import DonHang from '../components/DonHang'; // Component liệt kê tất cả đơn hàng (admin)

// Nhập cả hai component OrderDetail (cho tất cả) và SingleOrderDetail (cho 1 đơn hàng cụ thể)
import OrderDetail from '../components/OrderDetail'; // Component hiện tại của bạn (hiển thị TẤT CẢ chi tiết đơn hàng)
import SingleOrderDetail from '../components/SingleOrderDetail'; // Component chi tiết 1 đơn hàng (admin/user)
import AdminPaymentManagement from '../components/AdminPaymentManagement';
import AdminPaymentMethodManagement from '../components/AdminPaymentMethodManagement';
import ChiTietGioHang from '../components/ChiTietGioHang'; // Component chi tiết 1 giỏ hàng (admin/user)

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

            {/* Route cho trang đơn hàng của người dùng (cần đăng nhập) */}
            <Route
                path="/orders"
                element={
                    <RequireAuth allowedRoles={['USER', 'ADMIN']}>
                        <UserOrders />
                    </RequireAuth>
                }
            />
            {/* Route độc lập cho chi tiết của MỘT đơn hàng cụ thể (có ID) */}
            <Route path="/donhang-chitiet/:maDonHang" element={<SingleOrderDetail />} />

            {/* Route độc lập cho chi tiết của MỘT giỏ hàng cụ thể (có ID) */}
            {/* Đây là route mà Link trong GioHang.jsx sẽ trỏ tới */}
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

            {/* Route cha /admin với AdminPage làm layout, được bảo vệ bởi RequireAuth */}
            <Route
                path="/admin"
                element={
                    <RequireAuth allowedRoles={['ADMIN']}>
                        <AdminPage />
                    </RequireAuth>
                }
            >
                {/* Các route con (nested routes) bên trong /admin */}
                <Route path="products" element={<Products />} />
                <Route path="users" element={<Users />} />
                <Route path="giohang" element={<GioHang />} /> {/* Hiển thị danh sách tất cả giỏ hàng */}
                <Route path="donhang" element={<DonHang />} /> {/* Hiển thị danh sách tất cả đơn hàng */}
                <Route path="adminpaymentmanagement" element={<AdminPaymentManagement />} />
                <Route path="adminpaymentmethodmanagement" element={<AdminPaymentMethodManagement />} />

                {/* ĐÃ XÓA: Route này gây lỗi vì không có tham số ID */}
                {/* <Route path="chitietgiohang" element={<ChiTietGioHang />} /> */}

                {/* Route cho component OrderDetail (hiển thị TẤT CẢ chi tiết đơn hàng) */}
                <Route path="orderdetail" element={<OrderDetail />} />

                {/* Các route con khác nếu có */}
                <Route index element={<div>Admin Dashboard Content Here</div>} />
            </Route>

        </Routes>
    );
}
