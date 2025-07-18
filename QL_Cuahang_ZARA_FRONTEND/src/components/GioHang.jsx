// src/components/GioHang.jsx
// Component này được thiết kế để hiển thị TẤT CẢ CÁC GIỎ HÀNG
// Mỗi hàng trong bảng là một "giỏ hàng cha" với thông tin tổng quan.
// Khi nhấp vào mã giỏ hàng, nó sẽ điều hướng đến trang chi tiết của giỏ hàng đó.

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import gioHangService from '../services/gioHangService';
import chiTietGioHangService from '../services/chiTietGioHangService'; // <-- THÊM DÒNG NÀY

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
    const [allGioHang, setAllGioHang] = useState([]); // State để lưu tất cả các đối tượng giỏ hàng (cha) đã được làm giàu
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    // const [allChiTietGioHangData, setAllChiTietGioHangData] = useState([]); // Không cần thiết lưu vào state riêng nếu chỉ dùng trong hàm fetch

    // Hàm tính tổng tiền và số lượng sản phẩm cho một giỏ hàng cụ thể
    // Dựa vào maGioHang và toàn bộ danh sách chi tiết giỏ hàng
    const calculateCartTotals = (maGioHangId, chiTietItems) => {
        let totalAmount = 0;
        let totalQuantity = 0;

        // Lọc ra các chi tiết giỏ hàng thuộc về giỏ hàng cha hiện tại
        const cartItemsForThisCart = chiTietItems.filter(
            item => String(item.gioHang?.maGioHang) === String(maGioHangId)
        );

        cartItemsForThisCart.forEach(item => {
            // Đảm bảo truy cập đúng giá sản phẩm và số lượng
            const itemPrice = item.sanPham?.gia || 0; 
            totalAmount += itemPrice * (item.soLuong || 0);
            totalQuantity += (item.soLuong || 0);
        });

        return { totalAmount, totalQuantity };
    };

    // Function to load all cart data and enrich it
    const fetchAllGioHangData = async () => {
        try {
            setLoading(true);
            setError(null);

            // Bước 1: Gọi API để lấy TẤT CẢ các đối tượng giỏ hàng (cha)
            const gioHangResponse = await gioHangService.getAllGioHang();
            console.log("GioHang.jsx - Dữ liệu giỏ hàng (cha) đã fetched:", gioHangResponse);

            // Bước 2: Gọi API để lấy TẤT CẢ các chi tiết giỏ hàng (con)
            // (Chứa thông tin sản phẩm và số lượng)
            const chiTietGioHangResponse = await chiTietGioHangService.getAllChiTietGioHang();
            console.log("GioHang.jsx - Dữ liệu chi tiết giỏ hàng (con) đã fetched:", chiTietGioHangResponse);

            // Bước 3: Làm giàu dữ liệu giỏ hàng (cha) với tổng tiền và số lượng sản phẩm
            const enrichedGioHangList = gioHangResponse.map(gioHang => {
                const { totalAmount, totalQuantity } = calculateCartTotals(
                    gioHang.maGioHang,
                    chiTietGioHangResponse // Truyền toàn bộ danh sách chi tiết để tính toán
                );
                return {
                    ...gioHang,
                    tongTien: totalAmount,      // Thêm trường tongTien đã tính toán
                    soLuongSanPham: totalQuantity, // Thêm trường soLuongSanPham đã tính toán
                };
            });

            setAllGioHang(enrichedGioHangList); // Cập nhật state với danh sách giỏ hàng đã làm giàu
            console.log("GioHang.jsx - Danh sách giỏ hàng đã được làm giàu (enriched):", enrichedGioHangList);

        } catch (err) {
            console.error('GioHang.jsx - Lỗi khi tải tất cả giỏ hàng:', err);
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
        // Chạy hàm fetch dữ liệu khi component được mount
        fetchAllGioHangData();
    }, []); // Empty dependency array means this runs once after the initial render

    // Handle item deletion (của một giỏ hàng cha)
    const handleDeleteGioHang = async (maGioHang) => {
        if (!maGioHang) {
            alert('Không thể xóa giỏ hàng vì mã giỏ hàng không hợp lệ.');
            return;
        }

        if (window.confirm(`Bạn có chắc chắn muốn xóa toàn bộ giỏ hàng với Mã ${maGioHang} này không?`)) {
            try {
                // Đảm bảo gioHangService có hàm deleteGioHang tương ứng với DELETE /giohang/{id}
                await gioHangService.deleteGioHang(maGioHang); 
                alert(`Xóa giỏ hàng ${maGioHang} thành công!`);
                fetchAllGioHangData(); // Tải lại danh sách sau khi xóa
            } catch (err) {
                console.error('GioHang.jsx - Lỗi khi xóa giỏ hàng:', err);
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
                        {allGioHang.map((gioHang, index) => {
                            // DÒNG CONSOLE.LOG CỰC KỲ QUAN TRỌNG ĐỂ DEBUG
                            // Kiểm tra giá trị của tongTien và soLuongSanPham ở đây
                            console.log(`GioHang.jsx - Đang render hàng: maGioHang=${gioHang.maGioHang}, nguoiDung=${gioHang.nguoiDung?.hoTen}, TongTien=${gioHang.tongTien}, SoLuongSP=${gioHang.soLuongSanPham}`);
                            return (
                                // Sử dụng maGioHang làm key, hoặc fallback nếu không có
                                <tr key={gioHang.maGioHang || `giohang-${index}`}>
                                    <td style={tableCellStyle}>
                                        {/* Tạo Link đến trang chi tiết giỏ hàng */}
                                        {gioHang.maGioHang ? (
                                            <Link to={`/giohang-chitiet/${gioHang.maGioHang}`} style={{ textDecoration: 'none', color: '#007bff' }}>
                                                {gioHang.maGioHang}
                                            </Link>
                                        ) : (
                                            <span style={{ color: 'red' }}>Lỗi ID</span> 
                                        )}
                                    </td>
                                    <td style={tableCellStyle}>{gioHang.nguoiDung?.hoTen || 'N/A'}</td>
                                    {/* Hiển thị Tổng tiền đã được tính toán */}
                                    <td style={tableCellStyle}>{(gioHang.tongTien || 0).toLocaleString('vi-VN') + ' VND'}</td>
                                    {/* Hiển thị Số lượng SP đã được tính toán */}
                                    <td style={tableCellStyle}>{gioHang.soLuongSanPham || 0}</td> 
                                    <td style={tableCellStyle}>{gioHang.ngayTao ? new Date(gioHang.ngayTao).toLocaleDateString('vi-VN') : 'N/A'}</td>
                                    <td style={tableCellStyle}>{gioHang.trangThai || 'Active'}</td>
                                    <td style={tableCellStyle}>
                                        <button
                                            style={{ ...buttonStyle, backgroundColor: '#dc3545' }}
                                            onClick={() => handleDeleteGioHang(gioHang.maGioHang)}
                                            // Vô hiệu hóa nút nếu maGioHang không có giá trị
                                            disabled={!gioHang.maGioHang}
                                        >
                                            Xóa Giỏ hàng
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
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
