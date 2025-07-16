// src/components/ChiTietGioHang.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import gioHangService from '../services/gioHangService'; // Để lấy thông tin giỏ hàng cha
import chiTietGioHangService from '../services/chiTietGioHangService'; // Để quản lý chi tiết từng sản phẩm trong giỏ hàng

// --- Styles (Tái sử dụng từ GioHang.jsx để giữ nhất quán) ---
const containerStyle = {
    padding: '20px',
    maxWidth: '1200px',
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
    marginRight: '5px',
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

const updateButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#28a745', // Xanh lá cây
};

const deleteButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#dc3545', // Đỏ
};
// --- Hết Styles ---


function ChiTietGioHang() {
    const { maGioHang } = useParams(); // Lấy maGioHang từ URL
    const navigate = useNavigate(); // Dùng để điều hướng
    const [gioHang, setGioHang] = useState(null); // State cho giỏ hàng cha
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchGioHangDetail = async () => {
        try {
            setLoading(true);
            setError(null);
            // Gọi API từ gioHangService để lấy chi tiết giỏ hàng cha
            const data = await gioHangService.getGioHangById(maGioHang);
            setGioHang(data);
            console.log("Chi tiết giỏ hàng:", data);
        } catch (err) {
            console.error(`Lỗi khi tải chi tiết giỏ hàng ${maGioHang}:`, err);
            if (err.response && err.response.status === 401) {
                setError({ message: "Phiên đăng nhập đã hết hạn hoặc không hợp lệ. Vui lòng đăng nhập lại." });
            } else if (err.response && err.response.status === 404) {
                setError({ message: `Không tìm thấy giỏ hàng với mã: ${maGioHang}` });
            }
            else {
                setError({ message: err.message || "Đã xảy ra lỗi không xác định khi tải chi tiết giỏ hàng." });
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchGioHangDetail();
    }, [maGioHang]); // maGioHang là dependency, component sẽ fetch lại khi maGioHang thay đổi

    // Xử lý cập nhật số lượng chi tiết giỏ hàng
    const handleUpdateQuantity = async (maChiTietGioHang, currentSoLuong) => {
        const newSoLuong = prompt(`Nhập số lượng mới cho sản phẩm (ID: ${maChiTietGioHang}):`, currentSoLuong);
        if (newSoLuong !== null && !isNaN(newSoLuong) && parseInt(newSoLuong) > 0) {
            try {
                // Giả định backend của bạn cần MaChiTietGioHang và SoLuong mới
                const updatedItem = await chiTietGioHangService.updateChiTietGioHang(maChiTietGioHang, { soLuong: parseInt(newSoLuong) });
                alert('Cập nhật số lượng thành công!');
                fetchGioHangDetail(); // Tải lại chi tiết giỏ hàng để cập nhật hiển thị
            } catch (err) {
                console.error('Lỗi khi cập nhật số lượng:', err);
                alert('Lỗi khi cập nhật số lượng. Vui lòng kiểm tra console.');
            }
        } else if (newSoLuong !== null) {
            alert('Số lượng không hợp lệ. Vui lòng nhập một số dương.');
        }
    };

    // Xử lý xóa một sản phẩm trong giỏ hàng (chi tiết giỏ hàng)
    const handleDeleteChiTietGioHang = async (maChiTietGioHang) => {
        if (window.confirm(`Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng? (Mã Chi Tiết: ${maChiTietGioHang})`)) {
            try {
                await chiTietGioHangService.deleteChiTietGioHang(maChiTietGioHang);
                alert('Xóa sản phẩm khỏi giỏ hàng thành công!');
                fetchGioHangDetail(); // Tải lại chi tiết giỏ hàng để cập nhật hiển thị
            } catch (err) {
                console.error('Lỗi khi xóa chi tiết giỏ hàng:', err);
                alert('Có lỗi xảy ra khi xóa sản phẩm khỏi giỏ hàng. Vui lòng kiểm tra console.');
            }
        }
    };


    if (loading) {
        return <div style={{ textAlign: 'center', padding: '20px' }}>Đang tải chi tiết giỏ hàng...</div>;
    }

    if (error) {
        return <div style={{ color: 'red', textAlign: 'center', padding: '20px' }}>
            Lỗi: {error.message}.
            <Link to="/giohang">Quay lại danh sách giỏ hàng</Link>
        </div>;
    }

    if (!gioHang) {
        return <div style={{ textAlign: 'center', padding: '20px' }}>Không tìm thấy giỏ hàng.</div>;
    }

    return (
        <div style={containerStyle}>
            <h1 style={headerStyle}>Chi tiết Giỏ hàng #{gioHang.maGioHang}</h1>

            <div style={sectionStyle}>
                <h3 style={sectionTitleStyle}>Thông tin tổng quan Giỏ hàng</h3>
                <p><strong>Mã Giỏ hàng:</strong> {gioHang.maGioHang}</p>
                <p><strong>Người dùng:</strong> {gioHang.nguoiDung?.hoTen || 'N/A'} (ID: {gioHang.nguoiDung?.maNguoiDung || 'N/A'})</p>
                <p><strong>Email Người dùng:</strong> {gioHang.nguoiDung?.email || 'N/A'}</p>
                <p><strong>Tổng tiền:</strong> {(gioHang.tongTien || 0).toLocaleString('vi-VN') + ' VND'}</p>
                <p><strong>Ngày tạo:</strong> {gioHang.ngayTao ? new Date(gioHang.ngayTao).toLocaleString('vi-VN') : 'N/A'}</p>
                <p><strong>Trạng thái:</strong> {gioHang.trangThai || 'Active'}</p>
            </div>

            <div style={sectionStyle}>
                <h3 style={sectionTitleStyle}>Các sản phẩm trong giỏ hàng</h3>
                {gioHang.chiTietGioHang && gioHang.chiTietGioHang.length > 0 ? (
                    <table style={tableStyle}>
                        <thead>
                            <tr>
                                <th style={tableHeaderStyle}>Mã CTGH</th>
                                <th style={tableHeaderStyle}>Tên Sản phẩm</th>
                                <th style={tableHeaderStyle}>Giá (SP)</th>
                                <th style={tableHeaderStyle}>Số lượng</th>
                                <th style={tableHeaderStyle}>Thành tiền</th>
                                <th style={tableHeaderStyle}>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {gioHang.chiTietGioHang.map(item => (
                                <tr key={item.maChiTietGioHang}>
                                    <td style={tableCellStyle}>{item.maChiTietGioHang}</td>
                                    <td style={tableCellStyle}>{item.sanPham?.tenSanPham || 'Sản phẩm không rõ'}</td>
                                    <td style={tableCellStyle}>{(item.sanPham?.gia || 0).toLocaleString('vi-VN') + ' VND'}</td>
                                    <td style={tableCellStyle}>{item.soLuong}</td>
                                    {/* Giả định item.gia là giá của sản phẩm tại thời điểm thêm vào giỏ */}
                                    <td style={tableCellStyle}>{(item.soLuong * (item.gia || 0)).toLocaleString('vi-VN') + ' VND'}</td>
                                    <td style={tableCellStyle}>
                                        <button
                                            style={updateButtonStyle}
                                            onClick={() => handleUpdateQuantity(item.maChiTietGioHang, item.soLuong)}
                                        >
                                            Cập nhật SL
                                        </button>
                                        <button
                                            style={deleteButtonStyle}
                                            onClick={() => handleDeleteChiTietGioHang(item.maChiTietGioHang)}
                                        >
                                            Xóa SP
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>Giỏ hàng này hiện không có sản phẩm nào.</p>
                )}
            </div>

            <Link to="/giohang" style={backButtonStyle}>
                &larr; Quay lại danh sách Giỏ hàng
            </Link>
        </div>
    );
}

export default ChiTietGioHang;