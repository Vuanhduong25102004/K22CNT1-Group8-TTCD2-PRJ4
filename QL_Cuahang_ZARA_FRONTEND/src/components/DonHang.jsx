// src/components/DonHang.jsx

import React, { useState, useEffect } from 'react';
import donHangService from '../services/donHangService';
import { format } from 'date-fns';

// Styles (giữ nguyên)
const tableHeaderStyle = {
    padding: '12px',
    border: '1px solid #ddd',
    textAlign: 'left',
    backgroundColor: '#f2f2f2',
};

const tableCellStyle = {
    padding: '8px',
    border: '1px solid #ddd',
    textAlign: 'left',
};

const expandButtonStyle = {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '1.2em',
    color: '#007bff',
    marginLeft: '5px',
};

function DonHang() {
    const [donHangList, setDonHangList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [expandedOrders, setExpandedOrders] = useState({});

    const fetchDonHang = async () => {
        try {
            setLoading(true);
            setError(null);

            // Giả định: donHangService.getAllDonHang() trả về một MẢNG CÁC ĐƠN HÀNG,
            // trong đó mỗi đơn hàng ĐÃ CÓ MẢNG 'chiTietDonHang' LỒNG BÊN TRONG.
            const data = await donHangService.getAllDonHang();

            // Thêm logic kiểm tra dữ liệu trước khi set state
            const processedData = data.map(order => {
                // Kiểm tra và gán giá trị mặc định cho các trường cần thiết
                return {
                    ...order,
                    // Đảm bảo các trường địa chỉ, SĐT, ghi chú có giá trị mặc định
                    // Nếu backend trả về trực tiếp trong order thì dùng nó,
                    // nếu không thì có thể lấy từ nguoiDung hoặc mặc định 'N/A'
                    diaChiGiaoHang: order.diaChiGiaoHang || order.nguoiDung?.diaChi || 'N/A',
                    soDienThoai: order.soDienThoai || order.nguoiDung?.soDienThoai || 'N/A',
                    ghiChu: order.ghiChu || 'Không có',
                    // Đảm bảo chiTietDonHang là một mảng
                    chiTietDonHang: Array.isArray(order.chiTietDonHang) ? order.chiTietDonHang : []
                };
            }).filter(order => order.maDonHang !== undefined && order.maDonHang !== null); // Lọc bỏ đơn hàng không có mã

            setDonHangList(processedData);

        } catch (err) {
            console.error('Lỗi khi tải đơn hàng:', err);
            if (err.response && err.response.status === 401) {
                setError({ message: "Phiên đăng nhập đã hết hạn hoặc không hợp lệ. Vui lòng đăng nhập lại." });
            } else {
                setError({ message: err.message || "Đã xảy ra lỗi không xác định khi tải đơn hàng." });
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDonHang();
    }, []);

    const handleToggleExpand = (orderId) => {
        setExpandedOrders(prev => ({
            ...prev,
            [orderId]: !prev[orderId]
        }));
    };

    const handleChangeStatus = async (orderId, currentStatus) => {
        const newStatus = prompt(`Nhập trạng thái mới cho đơn hàng ${orderId} (hiện tại: ${currentStatus}):`);
        if (newStatus && newStatus.trim() !== '' && newStatus !== currentStatus) {
            try {
                await donHangService.updateTrangThaiDonHang(orderId, newStatus);
                alert('Cập nhật trạng thái đơn hàng thành công!');
                fetchDonHang();
            } catch (err) {
                console.error('Lỗi khi cập nhật trạng thái đơn hàng:', err);
                alert('Có lỗi xảy ra khi cập nhật trạng thái. Vui lòng kiểm tra console.');
            }
        } else if (newStatus !== null && newStatus !== '') {
            alert('Trạng thái không đổi hoặc không hợp lệ.');
        }
    };

    const handleDeleteOrder = async (orderId) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa đơn hàng này? Thao tác này không thể hoàn tác!')) {
            try {
                await donHangService.deleteDonHang(orderId);
                alert('Xóa đơn hàng thành công!');
                fetchDonHang();
            } catch (err) {
                console.error('Lỗi khi xóa đơn hàng:', err);
                alert('Có lỗi xảy ra khi xóa đơn hàng. Vui lòng kiểm tra console.');
            }
        }
    };

    if (loading) {
        return <div style={{ textAlign: 'center', padding: '20px' }}>Đang tải đơn hàng...</div>;
    }

    if (error) {
        return <div style={{ color: 'red', textAlign: 'center', padding: '20px' }}>
            Lỗi: {error.message}.
        </div>;
    }

    if (donHangList.length === 0) {
        return <div style={{ textAlign: 'center', padding: '20px' }}>Không có đơn hàng nào để hiển thị.</div>;
    }

    return (
        <div style={{ padding: '20px' }}>
            <h1>Quản lý Đơn hàng</h1>

            <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #ddd', marginTop: '20px' }}>
                <thead>
                    <tr>
                        <th style={tableHeaderStyle}>Mã Đơn hàng</th>
                        <th style={tableHeaderStyle}>ID Người dùng</th>
                        <th style={tableHeaderStyle}>Tên Người dùng</th>
                        <th style={tableHeaderStyle}>Ngày đặt</th>
                        <th style={tableHeaderStyle}>Tổng tiền</th>
                        <th style={tableHeaderStyle}>Trạng thái</th>
                        <th style={tableHeaderStyle}>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {donHangList.map(order => (
                        <React.Fragment key={order.maDonHang}>
                            <tr>
                                <td style={tableCellStyle}>{order.maDonHang}</td>
                                <td style={tableCellStyle}>{order.nguoiDung ? order.nguoiDung.maNguoiDung : 'N/A'}</td>
                                <td style={tableCellStyle}>{order.nguoiDung ? order.nguoiDung.hoTen : 'N/A'}</td>
                                <td style={tableCellStyle}>
                                    {order.ngayDat ? format(new Date(order.ngayDat), 'dd/MM/yyyy HH:mm') : 'N/A'}
                                </td>
                                <td style={tableCellStyle}>{order.tongTien ? order.tongTien.toLocaleString('vi-VN') + ' VND' : '0 VND'}</td>
                                <td style={tableCellStyle}>{order.trangThaiDonHang}</td>
                                <td style={tableCellStyle}>
                                    <button
                                        onClick={() => handleChangeStatus(order.maDonHang, order.trangThaiDonHang)}
                                        style={{ marginRight: '10px', padding: '5px 10px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}
                                    >
                                        Đổi trạng thái
                                    </button>
                                    <button
                                        onClick={() => handleDeleteOrder(order.maDonHang)}
                                        style={{ padding: '5px 10px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}
                                    >
                                        Xóa
                                    </button>
                                    <button
                                        onClick={() => handleToggleExpand(order.maDonHang)}
                                        style={expandButtonStyle}
                                    >
                                        {expandedOrders[order.maDonHang] ? '▲' : '▼'}
                                    </button>
                                </td>
                            </tr>
                            {expandedOrders[order.maDonHang] && (
                                <tr className="detail-row">
                                    <td colSpan="7" style={{ padding: '10px 20px', backgroundColor: '#f9f9f9', borderTop: '1px solid #ddd' }}>
                                        <h4 style={{ marginBottom: '10px' }}>Chi tiết đơn hàng #{order.maDonHang}</h4>
                                        <p>Địa chỉ: {order.diaChiGiaoHang}</p>
                                        <p>SĐT: {order.soDienThoai}</p>
                                        <p>PTTT: {order.phuongThucThanhToan ? order.phuongThucThanhToan.tenPhuongThuc : 'N/A'}</p>
                                        <p>Ghi chú: {order.ghiChu}</p>

                                        {/* Kiểm tra mảng chiTietDonHang của từng đơn hàng */}
                                        {order.chiTietDonHang && order.chiTietDonHang.length > 0 ? (
                                            <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #eee', marginTop: '10px' }}>
                                                <thead>
                                                    <tr style={{ backgroundColor: '#e9ecef' }}>
                                                        <th style={{ ...tableHeaderStyle, padding: '8px' }}>Mã SP</th>
                                                        <th style={{ ...tableHeaderStyle, padding: '8px' }}>Tên SP</th>
                                                        <th style={{ ...tableHeaderStyle, padding: '8px' }}>Số lượng</th>
                                                        <th style={{ ...tableHeaderStyle, padding: '8px' }}>Giá bán</th>
                                                        <th style={{ ...tableHeaderStyle, padding: '8px' }}>Thành tiền</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {order.chiTietDonHang.map(detail => (
                                                        // maChiTiet có thể nằm trực tiếp trong detail nếu đó là đối tượng ChiTietDonHang
                                                        // hoặc detail.maChiTietDonHang nếu backend dùng tên khác
                                                        <tr key={detail.maChiTiet || detail.maChiTietDonHang}>
                                                            <td style={{ ...tableCellStyle, padding: '8px' }}>{detail.sanPham ? detail.sanPham.maSanPham : 'N/A'}</td>
                                                            <td style={{ ...tableCellStyle, padding: '8px' }}>{detail.sanPham ? detail.sanPham.tenSanPham : 'N/A'}</td>
                                                            <td style={{ ...tableCellStyle, padding: '8px' }}>{detail.soLuong}</td>
                                                            <td style={{ ...tableCellStyle, padding: '8px' }}>{detail.donGia.toLocaleString('vi-VN') + ' VND'}</td>
                                                            <td style={{ ...tableCellStyle, padding: '8px' }}>{(detail.soLuong * detail.donGia).toLocaleString('vi-VN') + ' VND'}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        ) : (
                                            <p>Không có chi tiết sản phẩm cho đơn hàng này.</p>
                                        )}
                                    </td>
                                </tr>
                            )}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default DonHang;