import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MyCart = () => {
    const [gioHang, setGioHang] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Lấy token JWT từ localStorage (hoặc từ nơi bạn lưu trữ token)
    const token = localStorage.getItem('token');

    useEffect(() => {
        // Gửi yêu cầu GET đến API backend để lấy giỏ hàng của người dùng
        if (token) {
            axios.get('http://localhost:8080/giohang/mycart', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then((response) => {
                    setGioHang(response.data);
                    setLoading(false);
                })
                .catch((err) => {
                    setError("Không thể lấy giỏ hàng");
                    setLoading(false);
                });
        } else {
            setError("Bạn chưa đăng nhập.");
            setLoading(false);
        }
    }, [token]);

    if (loading) return <div>Đang tải giỏ hàng...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h2>Giỏ hàng của bạn</h2>
            {gioHang && gioHang.sanPhams && gioHang.sanPhams.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>Tên sản phẩm</th>
                            <th>Số lượng</th>
                            <th>Giá</th>
                        </tr>
                    </thead>
                    <tbody>
                        {gioHang.sanPhams.map((sanPham, index) => (
                            <tr key={index}>
                                <td>{sanPham.tenSanPham}</td>
                                <td>{sanPham.soLuong}</td>
                                <td>{sanPham.gia.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div>Giỏ hàng của bạn đang trống.</div>
            )}
        </div>
    );
};

export default MyCart;
