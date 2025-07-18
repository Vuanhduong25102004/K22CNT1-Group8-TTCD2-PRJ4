import React, { useEffect, useState } from 'react';
import axios from 'axios';
import HeaderComponents from '../components/HeaderComponents';
import FooterComponents from '../components/FooterComponents';
import '../styles/UserOrders.scss';

export default function UserOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState('');
    const [qrUrl, setQrUrl] = useState('');

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const token = localStorage.getItem("token");
                const decoded = JSON.parse(atob(token.split('.')[1]));
                const maNguoiDung = decoded.maNguoiDung;

                const res = await axios.get(`http://localhost:8080/don-hang/nguoi-dung/${maNguoiDung}/chi-tiet`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                const sortedOrders = res.data.sort((a, b) => {
                    if (a.trangThaiThanhToan === "Chưa thanh toán" && b.trangThaiThanhToan !== "Chưa thanh toán") return -1;
                    if (a.trangThaiThanhToan !== "Chưa thanh toán" && b.trangThaiThanhToan === "Chưa thanh toán") return 1;
                    return 0;
                });

                setOrders(sortedOrders);
            } catch (error) {
                console.error("Lỗi khi lấy đơn hàng:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const handleThanhToan = (maDonHang) => {
        setSelectedOrder(maDonHang);
        setPaymentMethod('');
        setQrUrl('');
    };

    const handlePaymentMethodChange = (e) => {
        const method = e.target.value;
        setPaymentMethod(method);

        if (method) {
            const randomData = `ThanhToan-${method}-${selectedOrder}-${Math.floor(Math.random() * 1000000)}`;
            const qr = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(randomData)}&size=200x200`;
            setQrUrl(qr);
        } else {
            setQrUrl('');
        }
    };

    const handleXacNhanThanhToan = async () => {
        if (!paymentMethod) {
            alert("Vui lòng chọn phương thức thanh toán.");
            return;
        }

        try {
            const token = localStorage.getItem("token");
            await axios.post(`http://localhost:8080/don-hang/thanh-toan/${selectedOrder}`, null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setOrders(prevOrders =>
                prevOrders.map(order =>
                    order.maDonHang === selectedOrder
                        ? { ...order, trangThaiThanhToan: "Đã thanh toán" }
                        : order
                )
            );

            alert("Thanh toán thành công!");
            setSelectedOrder(null);
            setPaymentMethod('');
            setQrUrl('');
        } catch (error) {
            console.error("Lỗi khi thanh toán:", error);
            alert("Thanh toán thất bại!");
        }
    };

    return (
        <>
            <HeaderComponents />
            <main style={{ paddingTop: '300px', paddingBottom: '123px' }}>
                <div className="container">
                    <h2>Đơn hàng của bạn</h2>
                    {loading ? (
                        <p>Đang tải dữ liệu...</p>
                    ) : orders.length === 0 ? (
                        <p>Không có đơn hàng nào.</p>
                    ) : (
                        orders.map(order => (
                            <div className="order-card" key={order.maDonHang}>
                                <div className="order-header">
                                    <p><strong>Ngày đặt:</strong> {new Date(order.ngayDat).toLocaleDateString('vi-VN')}</p>
                                    <p><strong>Tổng tiền:</strong> {order.tongTien?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                                    <p><strong>Thanh toán:</strong> {order.trangThaiThanhToan}</p>
                                    <p><strong>Trạng thái:</strong> {order.trangThaiDonHang}</p>
                                </div>
                                <div className="order-products">
                                    <ul>
                                        {order.chiTietDonHang?.map((sp, index) => (
                                            <li key={index}>
                                                <strong>{sp.tenSanPham}</strong> - SL: {sp.soLuong} - Đơn giá: {sp.donGia?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {order.trangThaiThanhToan === "Chưa thanh toán" && (
                                    <>
                                        <button
                                            onClick={() => handleThanhToan(order.maDonHang)}
                                            className="pay-button"
                                        >
                                            Thanh toán
                                        </button>

                                        {selectedOrder === order.maDonHang && (
                                            <div className="payment-form">
                                                <div>
                                                    <label>Chọn phương thức thanh toán:</label>
                                                    <select
                                                        value={paymentMethod}
                                                        onChange={handlePaymentMethodChange}
                                                    >
                                                        <option value="">-- Chọn --</option>
                                                        <option value="Momo">Momo</option>
                                                        <option value="ZaloPay">ZaloPay</option>
                                                        <option value="Chuyển khoản">Chuyển khoản</option>
                                                    </select>
                                                </div>

                                                {qrUrl && (
                                                    <div style={{ marginTop: '10px' }}>
                                                        <p>Quét mã QR để thanh toán ({paymentMethod}):</p>
                                                        <img
                                                            src={qrUrl}
                                                            alt="QR Code"
                                                            style={{ width: '200px', borderRadius: '8px' }}
                                                        />
                                                    </div>
                                                )}

                                                <button
                                                    onClick={handleXacNhanThanhToan}
                                                    className="confirm-button"
                                                >
                                                    Xác nhận thanh toán
                                                </button>
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </main>
            <FooterComponents />
        </>
    );
}
