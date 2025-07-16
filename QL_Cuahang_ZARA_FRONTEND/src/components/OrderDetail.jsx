// src/components/OrderDetail.jsx
// LƯU Ý: Component này đã được sửa đổi để hiển thị TẤT CẢ chi tiết đơn hàng
// thay vì chỉ chi tiết của MỘT đơn hàng cụ thể.
// Tên component 'OrderDetail' sẽ không còn phù hợp với chức năng này.
// Khuyến nghị tạo một component mới như 'AllChiTietDonHang.jsx' thay vì sửa đổi component này.

import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom'; // Không còn cần useParams nếu hiển thị tất cả
import { Link } from 'react-router-dom';
import chiTietDonHangService from '../services/chiTietDonHangService';
import { format } from 'date-fns';

// --- Styles (Giữ nguyên như đã định nghĩa trước đó) ---
const containerStyle = {
    padding: '20px',
    maxWidth: '1200px', // Mở rộng maxWidth để chứa nhiều cột hơn
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

// InfoRowStyle và InfoLabelStyle không còn được sử dụng trực tiếp nếu hiển thị dạng bảng tất cả chi tiết

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

const buttonStyle = {
    padding: '8px 12px',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
    color: 'white',
    fontSize: '0.9em',
    marginRight: '5px', // Thêm margin cho nút nếu có nhiều nút
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


function OrderDetail() {
    const [allChiTiet, setAllChiTiet] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAllChiTietDonHang = async () => {
            try {
                setLoading(true);
                setError(null);

                const data = await chiTietDonHangService.getAllChiTietDonHang();
                setAllChiTiet(data);
                console.log("All raw details:", data);

            } catch (err) {
                console.error(`Lỗi khi tải tất cả chi tiết đơn hàng:`, err);
                if (err.response && err.response.status === 401) {
                    setError({ message: "Phiên đăng nhập đã hết hạn hoặc không hợp lệ. Vui lòng đăng nhập lại." });
                } else {
                    setError({ message: err.message || `Đã xảy ra lỗi không xác định khi tải tất cả chi tiết đơn hàng.` });
                }
            } finally {
                setLoading(false);
            }
        };

        fetchAllChiTietDonHang();
    }, []);

    const handleDeleteChiTiet = async (maChiTiet) => {
        try {
            await chiTietDonHangService.deleteChiTietDonHang(maChiTiet);
            setAllChiTiet(prevList => prevList.filter(detail => detail.maChiTiet !== maChiTiet));
            alert(`Chi tiết đơn hàng ${maChiTiet} đã được xóa thành công.`);
        } catch (err) {
            console.error(`Lỗi khi xóa chi tiết đơn hàng ${maChiTiet}:`, err);
            alert(`Không thể xóa chi tiết đơn hàng ${maChiTiet}. Lỗi: ${err.message}`);
        }
    };

    if (loading) {
        return <div style={{ textAlign: 'center', padding: '20px' }}>Đang tải tất cả chi tiết đơn hàng...</div>;
    }

    if (error) {
        return <div style={{ color: 'red', textAlign: 'center', padding: '20px' }}>
            Lỗi: {error.message}. <Link to="/">Quay lại trang chủ</Link>
        </div>;
    }

    if (!allChiTiet || allChiTiet.length === 0) {
        return <div style={{ textAlign: 'center', padding: '20px' }}>Không có chi tiết đơn hàng nào trong hệ thống.</div>;
    }

    return (
        <div style={containerStyle}>
            <h1 style={headerStyle}>Tất cả Chi tiết Đơn hàng</h1>

            <div style={sectionStyle}>
                <h3 style={sectionTitleStyle}>Danh sách Chi tiết Sản phẩm</h3>
                <table style={tableStyle}>
                    <thead>
                        <tr>
                            <th style={tableHeaderStyle}>Mã CT</th>
                            <th style={tableHeaderStyle}>Mã ĐH</th>
                            <th style={tableHeaderStyle}>Ngày đặt ĐH</th>
                            <th style={tableHeaderStyle}>Trạng thái ĐH</th>
                            <th style={tableHeaderStyle}>Khách hàng</th>
                            <th style={tableHeaderStyle}>Mã SP</th>
                            <th style={tableHeaderStyle}>Tên SP</th>
                            <th style={tableHeaderStyle}>Số lượng</th>
                            <th style={tableHeaderStyle}>Giá bán</th>
                            <th style={tableHeaderStyle}>Thành tiền</th>
                            <th style={tableHeaderStyle}>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allChiTiet.map(detail => (
                            <tr key={detail.maChiTiet}>
                                <td style={tableCellStyle}>{detail.maChiTiet}</td>
                                <td style={tableCellStyle}>
                                    {detail.donHang ? (
                                        // Dòng này đã được cập nhật để trỏ đến route của SingleOrderDetail
                                        <Link to={`/donhang-chitiet/${detail.donHang.maDonHang}`} style={{ textDecoration: 'none', color: '#007bff' }}>
                                            {detail.donHang.maDonHang}
                                        </Link>
                                    ) : 'N/A'}
                                </td>
                                <td style={tableCellStyle}>{detail.donHang?.ngayDat ? format(new Date(detail.donHang.ngayDat), 'dd/MM/yyyy HH:mm') : 'N/A'}</td>
                                <td style={tableCellStyle}>{detail.donHang?.trangThaiDonHang || 'N/A'}</td>
                                <td style={tableCellStyle}>{detail.donHang?.nguoiDung?.hoTen || 'N/A'}</td>
                                <td style={tableCellStyle}>{detail.sanPham ? detail.sanPham.maSanPham : 'N/A'}</td>
                                <td style={tableCellStyle}>{detail.sanPham ? detail.sanPham.tenSanPham : 'N/A'}</td>
                                <td style={tableCellStyle}>{detail.soLuong}</td>
                                <td style={tableCellStyle}>{detail.donGia.toLocaleString('vi-VN') + ' VND'}</td>
                                <td style={tableCellStyle}>{(detail.soLuong * detail.donGia).toLocaleString('vi-VN') + ' VND'}</td>
                                <td style={tableCellStyle}>
                                    <button
                                        style={{ ...buttonStyle, backgroundColor: '#dc3545' }}
                                        onClick={() => handleDeleteChiTiet(detail.maChiTiet)}
                                    >
                                        Xóa
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Link to="/admin/donhang" style={backButtonStyle}>
                &larr; Quay lại danh sách đơn hàng
            </Link>
        </div>
    );
}

export default OrderDetail;