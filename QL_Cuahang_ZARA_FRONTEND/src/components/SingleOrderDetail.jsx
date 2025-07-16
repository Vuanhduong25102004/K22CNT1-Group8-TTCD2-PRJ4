// src/components/SingleOrderDetail.jsx
// Component này dùng để hiển thị chi tiết của MỘT đơn hàng cụ thể
// Nó lấy maDonHang từ URL params.

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import chiTietDonHangService from '../services/chiTietDonHangService';
import { format } from 'date-fns';

// --- Styles (Giữ nguyên) ---
const containerStyle = {
    padding: '20px',
    maxWidth: '900px',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif',
};

const headerStyle = {
    textAlign: 'center',
    color: '#333',
    marginBottom: '30px',
};

const sectionStyle = {
    backgroundColor: '#fff',
    padding: '25px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    marginBottom: '20px',
};

const sectionTitleStyle = {
    fontSize: '1.4em',
    color: '#0056b3',
    borderBottom: '2px solid #eee',
    paddingBottom: '10px',
    marginBottom: '15px',
};

const infoRowStyle = {
    display: 'flex',
    marginBottom: '8px',
};

const infoLabelStyle = {
    fontWeight: 'bold',
    minWidth: '150px',
    color: '#555',
};

const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '15px',
};

const tableHeaderStyle = {
    padding: '12px',
    border: '1px solid #ddd',
    textAlign: 'left',
    backgroundColor: '#f2f2f2',
};

const tableCellStyle = {
    padding: '10px',
    border: '1px solid #ddd',
    textAlign: 'left',
};

const backButtonStyle = {
    display: 'inline-block',
    marginTop: '20px',
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '5px',
    transition: 'background-color 0.3s ease',
};
// --- Hết Styles ---


function SingleOrderDetail() {
    const { maDonHang } = useParams(); // Lấy maDonHang từ URL params
    const [orderData, setOrderData] = useState(null); // Lưu trữ dữ liệu đơn hàng đã nhóm
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrderDetail = async () => {
            try {
                setLoading(true);
                setError(null);

                // Lấy các chi tiết sản phẩm của ĐƠN HÀNG CỤ THỂ này
                const rawDetails = await chiTietDonHangService.getChiTietByMaDonHang(maDonHang);
                console.log(`Raw details for order #${maDonHang}:`, rawDetails);

                if (!rawDetails || rawDetails.length === 0) {
                    setError({ message: `Không tìm thấy chi tiết sản phẩm cho đơn hàng #${maDonHang}.` });
                    setLoading(false);
                    return;
                }

                // Trích xuất thông tin tổng quan của đơn hàng từ chi tiết đầu tiên
                const firstDetail = rawDetails[0];
                if (!firstDetail || !firstDetail.donHang) {
                    setError({ message: "Dữ liệu đơn hàng tổng quan không hợp lệ trong chi tiết." });
                    setLoading(false);
                    return;
                }

                const donHangInfo = firstDetail.donHang;

                // Chuẩn bị mảng chi tiết sản phẩm để hiển thị
                const chiTietDonHangParsed = rawDetails.map(item => ({
                    maChiTiet: item.maChiTiet,
                    soLuong: item.soLuong,
                    donGia: item.donGia,
                    sanPham: item.sanPham
                }));

                setOrderData({
                    ...donHangInfo,
                    diaChiGiaoHang: donHangInfo.nguoiDung?.diaChi || donHangInfo.diaChiGiaoHang || 'N/A',
                    soDienThoai: donHangInfo.nguoiDung?.soDienThoai || donHangInfo.soDienThoai || 'N/A',
                    ghiChu: donHangInfo.ghiChu || 'Không có',
                    chiTietDonHang: chiTietDonHangParsed
                });

            } catch (err) {
                console.error(`Lỗi khi tải chi tiết đơn hàng #${maDonHang}:`, err);
                if (err.response && err.response.status === 401) {
                    setError({ message: "Phiên đăng nhập đã hết hạn hoặc không hợp lệ. Vui lòng đăng nhập lại." });
                } else if (err.response && err.response.status === 404) {
                    setError({ message: `Không tìm thấy đơn hàng với mã: ${maDonHang}.` });
                } else {
                    setError({ message: err.message || `Đã xảy ra lỗi không xác định khi tải chi tiết đơn hàng #${maDonHang}.` });
                }
            } finally {
                setLoading(false);
            }
        };

        fetchOrderDetail();
    }, [maDonHang]);

    if (loading) {
        return <div style={{ textAlign: 'center', padding: '20px' }}>Đang tải chi tiết đơn hàng...</div>;
    }

    if (error) {
        return <div style={{ color: 'red', textAlign: 'center', padding: '20px' }}>
            Lỗi: {error.message}. <Link to="/all-order-details">Quay lại danh sách chi tiết đơn hàng</Link>
        </div>;
    }

    if (!orderData) {
        return <div style={{ textAlign: 'center', padding: '20px' }}>Không có dữ liệu đơn hàng.</div>;
    }

    return (
        <div style={containerStyle}>
            <h1 style={headerStyle}>Chi tiết Đơn hàng #{orderData.maDonHang}</h1>

            <div style={sectionStyle}>
                <h3 style={sectionTitleStyle}>Thông tin chung</h3>
                <div style={infoRowStyle}><span style={infoLabelStyle}>Mã Đơn hàng:</span> {orderData.maDonHang}</div>
                <div style={infoRowStyle}><span style={infoLabelStyle}>Ngày đặt:</span> {orderData.ngayDat ? format(new Date(orderData.ngayDat), 'dd/MM/yyyy HH:mm') : 'N/A'}</div>
                <div style={infoRowStyle}><span style={infoLabelStyle}>Tổng tiền:</span> {orderData.tongTien ? orderData.tongTien.toLocaleString('vi-VN') + ' VND' : '0 VND'}</div>
                <div style={infoRowStyle}><span style={infoLabelStyle}>Trạng thái đơn hàng:</span> {orderData.trangThaiDonHang}</div>
                <div style={infoRowStyle}><span style={infoLabelStyle}>Trạng thái thanh toán:</span> {orderData.trangThaiThanhToan}</div>
                <div style={infoRowStyle}><span style={infoLabelStyle}>Phương thức thanh toán:</span> {orderData.phuongThucThanhToan ? orderData.phuongThucThanhToan.tenPhuongThuc : 'N/A'}</div>
            </div>

            <div style={sectionStyle}>
                <h3 style={sectionTitleStyle}>Thông tin khách hàng</h3>
                <div style={infoRowStyle}><span style={infoLabelStyle}>ID Người dùng:</span> {orderData.nguoiDung ? orderData.nguoiDung.maNguoiDung : 'N/A'}</div>
                <div style={infoRowStyle}><span style={infoLabelStyle}>Tên Người dùng:</span> {orderData.nguoiDung ? orderData.nguoiDung.hoTen : 'N/A'}</div>
                <div style={infoRowStyle}><span style={infoLabelStyle}>Email:</span> {orderData.nguoiDung ? orderData.nguoiDung.email : 'N/A'}</div>
                <div style={infoRowStyle}><span style={infoLabelStyle}>Địa chỉ giao hàng:</span> {orderData.diaChiGiaoHang}</div>
                <div style={infoRowStyle}><span style={infoLabelStyle}>Số điện thoại:</span> {orderData.soDienThoai}</div>
                <div style={infoRowStyle}><span style={infoLabelStyle}>Ghi chú:</span> {orderData.ghiChu}</div>
            </div>

            <div style={sectionStyle}>
                <h3 style={sectionTitleStyle}>Sản phẩm trong đơn hàng</h3>
                {orderData.chiTietDonHang && orderData.chiTietDonHang.length > 0 ? (
                    <table style={tableStyle}>
                        <thead>
                            <tr>
                                <th style={tableHeaderStyle}>Mã SP</th>
                                <th style={tableHeaderStyle}>Tên SP</th>
                                <th style={tableHeaderStyle}>Số lượng</th>
                                <th style={tableHeaderStyle}>Giá bán</th>
                                <th style={tableHeaderStyle}>Thành tiền</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orderData.chiTietDonHang.map(detail => (
                                <tr key={detail.maChiTiet}>
                                    <td style={tableCellStyle}>{detail.sanPham ? detail.sanPham.maSanPham : 'N/A'}</td>
                                    <td style={tableCellStyle}>{detail.sanPham ? detail.sanPham.tenSanPham : 'N/A'}</td>
                                    <td style={tableCellStyle}>{detail.soLuong}</td>
                                    <td style={tableCellStyle}>{detail.donGia.toLocaleString('vi-VN') + ' VND'}</td>
                                    <td style={tableCellStyle}>{(detail.soLuong * detail.donGia).toLocaleString('vi-VN') + ' VND'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>Không có chi tiết sản phẩm cho đơn hàng này.</p>
                )}
            </div>

            <Link to="/admin/orderdetail" style={backButtonStyle}>
                &larr; Quay lại tất cả chi tiết đơn hàng
            </Link>
        </div>
    );
}

export default SingleOrderDetail;