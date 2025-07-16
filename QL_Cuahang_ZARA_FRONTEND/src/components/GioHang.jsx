// src/components/GioHang.jsx
// Component này được thiết kế để hiển thị TẤT CẢ CÁC GIỎ HÀNG
// Mỗi hàng trong bảng là một "giỏ hàng cha" với thông tin tổng quan.
// Khi nhấp vào mã giỏ hàng, nó sẽ điều hướng đến trang chi tiết của giỏ hàng đó.

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link
import gioHangService from '../services/gioHangService'; // Đảm bảo đúng tên file/module

// --- Styles (Tái sử dụng từ OrderDetail để giữ nhất quán) ---
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
// --- Hết Styles ---


function GioHang() {
    const [allGioHang, setAllGioHang] = useState([]); // State để lưu tất cả các đối tượng giỏ hàng (cha)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Function to load all cart data
    const fetchAllGioHangData = async () => {
        try {
            setLoading(true);
            setError(null);

            // Gọi API để lấy TẤT CẢ các đối tượng giỏ hàng (cha)
            // Giả định API này trả về một mảng các đối tượng giỏ hàng hoàn chỉnh
            const data = await gioHangService.getAllGioHang();
            setAllGioHang(data);
            console.log("All GioHang data:", data);

        } catch (err) {
            setError(err);
            console.error('Lỗi khi tải tất cả giỏ hàng:', err);
            if (err.response && err.response.status === 401) {
                setError({ message: "Phiên đăng nhập đã hết hạn hoặc không hợp lệ. Vui lòng đăng nhập lại." });
            } else {
                setError({ message: err.message || "Đã xảy ra lỗi không xác định khi tải giỏ hàng." });
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllGioHangData();
    }, []); // Run once on component mount

    // Handle item deletion (của một giỏ hàng cha)
    // Lưu ý: gioHangService.deleteGioHang hiện tại của bạn đang xóa gioHangItem (maChiTietGioHang)
    // Nếu bạn muốn xóa toàn bộ giỏ hàng cha, bạn cần một API khác hoặc điều chỉnh service
    const handleDeleteGioHang = async (maGioHang) => {
        if (window.confirm(`Bạn có chắc chắn muốn xóa toàn bộ giỏ hàng với Mã ${maGioHang} này không?`)) {
            try {
                // Tùy thuộc vào backend của bạn, bạn cần một API để xóa toàn bộ giỏ hàng.
                // Giả sử có gioHangService.deleteFullGioHang(maGioHang) hoặc tương tự.
                // Hiện tại, gioHangService.deleteGioHang() đang dùng cho maChiTietGioHang.
                // Vui lòng kiểm tra lại gioHangService.js và API backend của bạn.
                // Ví dụ:
                // await gioHangService.deleteFullGioHang(maGioHang); 

                // Tạm thời, để code không lỗi, tôi sẽ dùng alert và không gọi API thực tế
                alert(`Chức năng xóa toàn bộ giỏ hàng ${maGioHang} đang được phát triển hoặc API cần được điều chỉnh.`);
                // Nếu có API, sau khi xóa thành công:
                // fetchAllGioHangData(); // Re-fetch all carts to ensure data consistency
            } catch (err) {
                console.error('Lỗi khi xóa giỏ hàng:', err);
                alert('Có lỗi xảy ra khi xóa giỏ hàng. Vui lòng kiểm tra console.');
            }
        }
    };


    if (loading) {
        return <div style={{ textAlign: 'center', padding: '20px' }}>Đang tải tất cả giỏ hàng...</div>;
    }

    if (error) {
        return <div style={{ color: 'red', textAlign: 'center', padding: '20px' }}>
            Lỗi: {error.message}.
            <Link to="/admin">Quay lại trang quản trị</Link>
        </div>;
    }

    if (!allGioHang || allGioHang.length === 0) {
        return <div style={{ textAlign: 'center', padding: '20px' }}>Không có giỏ hàng nào trong hệ thống.</div>;
    }

    return (
        <div style={containerStyle}>
            <h1 style={headerStyle}>Quản lý Tất cả Giỏ hàng</h1>

            <div style={sectionStyle}>
                <h3 style={sectionTitleStyle}>Danh sách Giỏ hàng tổng quan</h3>
                <table style={tableStyle}>
                    <thead>
                        <tr>
                            <th style={tableHeaderStyle}>Mã Giỏ hàng</th>
                            <th style={tableHeaderStyle}>Người dùng</th>
                            <th style={tableHeaderStyle}>Tổng tiền</th>
                            <th style={tableHeaderStyle}>Số lượng SP</th>
                            <th style={tableHeaderStyle}>Ngày tạo</th>
                            <th style={tableHeaderStyle}>Trạng thái</th>
                            <th style={tableHeaderStyle}>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allGioHang.map(gioHang => (
                            <tr key={gioHang.maGioHang}>
                                <td style={tableCellStyle}>
                                    {/* Link đến trang chi tiết của giỏ hàng cụ thể */}
                                    <Link to={`/giohang-chitiet/${gioHang.maGioHang}`} style={{ textDecoration: 'none', color: '#007bff' }}>
                                        {gioHang.maGioHang}
                                    </Link>
                                </td>
                                <td style={tableCellStyle}>{gioHang.nguoiDung?.hoTen || 'N/A'}</td>
                                <td style={tableCellStyle}>{(gioHang.tongTien || 0).toLocaleString('vi-VN') + ' VND'}</td>
                                <td style={tableCellStyle}>{gioHang.chiTietGioHang?.length || 0}</td>
                                <td style={tableCellStyle}>{gioHang.ngayTao ? new Date(gioHang.ngayTao).toLocaleDateString('vi-VN') : 'N/A'}</td>
                                <td style={tableCellStyle}>{gioHang.trangThai || 'Active'}</td>
                                <td style={tableCellStyle}>
                                    <button
                                        style={{ ...buttonStyle, backgroundColor: '#dc3545' }}
                                        onClick={() => handleDeleteGioHang(gioHang.maGioHang)}
                                    >
                                        Xóa Giỏ hàng
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Link to="/admin" style={backButtonStyle}>
                &larr; Quay lại trang quản trị
            </Link>
        </div>
    );
}

export default GioHang;