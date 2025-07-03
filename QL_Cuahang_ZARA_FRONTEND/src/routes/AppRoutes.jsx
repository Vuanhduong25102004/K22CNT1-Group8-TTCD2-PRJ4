
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Logon from '../pages/Logon';
import HomeProducts from '../pages/HomeProducts'
import RequireAuth from '../components/RequireAuth';
import AdminPage from '../pages/AdminPage';
import Products from '../components/Products';
import ProductDetail from '../components/ProductDetail';
import MyCart from '../components/MyCart';

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/logon" element={<Logon />} />
            <Route path='/home/search' element={<HomeProducts />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/mycart" element={<MyCart />} />
            {/* Route cha /admin với AdminPage làm layout */}
            <Route
                path="/admin"
                element={
                    <RequireAuth>
                        <AdminPage />
                    </RequireAuth>
                }
            >
                {/* Các route con (nested routes) */}
                <Route path="products" element={<Products />} />
                {/* Các route con khác nếu có */}
            </Route>

            {/* Nếu bạn muốn route /product riêng lẻ cũng có thể thêm */}
            {/* <Route path="/product" element={<RequireAuth><Products /></RequireAuth>} /> */}
        </Routes>
    );
}
