// src/components/ChiTietGioHang.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import gioHangService from '../services/gioHangService'; // Vẫn cần để lấy token nếu có
import chiTietGioHangService from '../services/chiTietGioHangService'; // Để lấy chi tiết các sản phẩm trong giỏ hàng

// --- Styles (Giữ nguyên) ---
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
    const { maGioHang } = useParams();
    const navigate = useNavigate();
    const [gioHang, setGioHang] = useState(null); // Sẽ chứa thông tin giỏ hàng cha và chi tiết của nó
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Hàm tính tổng tiền trên frontend
    const calculateFrontendTongTien = (items) => {
        if (!items || items.length === 0) {
            return 0;
        }
        return items.reduce((total, item) => {
            const itemPrice = item.sanPham?.gia || item.gia || 0; // Ưu tiên item.gia nếu có, nếu không dùng sanPham.gia
            return total + (itemPrice * item.soLuong);
        }, 0);
    };


    const fetchGioHangDetail = async () => {
        if (!maGioHang) {
            setLoading(false);
            setError({ message: "Không tìm thấy mã giỏ hàng trong URL. Vui lòng trở lại trang danh sách giỏ hàng." });
            console.error("ChiTietGioHang.jsx - Lỗi: maGioHang từ useParams là undefined hoặc null. URL có thể không đúng.");
            return;
        }

        try {
            setLoading(true);
            setError(null);

            // ****** THAY ĐỔI QUAN TRỌNG Ở ĐÂY ******
            // Gọi API để lấy TẤT CẢ các chi tiết giỏ hàng
            console.log("ChiTietGioHang.jsx - Đang gọi chiTietGioHangService.getAllChiTietGioHang()");
            const allChiTietGioHang = await chiTietGioHangService.getAllChiTietGioHang();
            console.log("ChiTietGioHang.jsx - Dữ liệu tất cả chi tiết giỏ hàng đã nhận:", allChiTietGioHang);

            // Lọc ra các chi tiết giỏ hàng thuộc về maGioHang hiện tại
            const filteredChiTietGioHang = allChiTietGioHang.filter(
                item => String(item.gioHang?.maGioHang) === String(maGioHang)
            );

            console.log(`ChiTietGioHang.jsx - Các chi tiết giỏ hàng được lọc cho mã ${maGioHang}:`, filteredChiTietGioHang);

            if (filteredChiTietGioHang.length > 0) {
                // Lấy thông tin giỏ hàng cha từ một trong các chi tiết đã lọc
                const parentGioHangInfo = filteredChiTietGioHang[0].gioHang;

                // Tạo đối tượng gioHang hoàn chỉnh để set vào state
                const reconstructedGioHang = {
                    ...parentGioHangInfo, // Lấy thông tin cơ bản của giỏ hàng cha
                    chiTietGioHang: filteredChiTietGioHang, // Gán danh sách chi tiết đã lọc
                    // Tính toán tổng tiền trên frontend
                    tongTien: calculateFrontendTongTien(filteredChiTietGioHang)
                };

                setGioHang(reconstructedGioHang);
                console.log(`ChiTietGioHang.jsx - Giỏ hàng ${maGioHang} đã tái tạo:`, reconstructedGioHang);
            } else {
                setError({ message: `Không tìm thấy giỏ hàng hoặc sản phẩm nào cho mã: ${maGioHang}. Vui lòng kiểm tra ID.` });
            }
        } catch (err) {
            console.error(`ChiTietGioHang.jsx - Lỗi khi tải chi tiết giỏ hàng ${maGioHang}:`, err);
            if (err.response && err.response.status === 401) {
                setError({ message: "Phiên đăng nhập đã hết hạn hoặc không hợp lệ. Vui lòng đăng nhập lại." });
            } else {
                setError({ message: err.message || "Đã xảy ra lỗi không xác định khi tải chi tiết giỏ hàng." });
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (maGioHang) {
            fetchGioHangDetail();
        } else {
            setLoading(false);
            setError({ message: "URL không chứa mã giỏ hàng. Vui lòng quay lại trang danh sách và chọn một giỏ hàng." });
        }
    }, [maGioHang]);

    const handleUpdateQuantity = async (maChiTietGioHang, currentSoLuong) => {
        const newSoLuong = prompt(`Nhập số lượng mới cho sản phẩm (ID: ${maChiTietGioHang}):`, currentSoLuong);
        if (newSoLuong !== null && !isNaN(newSoLuong) && parseInt(newSoLuong) > 0) {
            try {
                await chiTietGioHangService.updateChiTietGioHang(maChiTietGioHang, { soLuong: parseInt(newSoLuong) });
                alert('Cập nhật số lượng thành công!');
                fetchGioHangDetail(); // Tải lại chi tiết giỏ hàng để cập nhật hiển thị
            } catch (err) {
                console.error('ChiTietGioHang.jsx - Lỗi khi cập nhật số lượng:', err);
                alert('Lỗi khi cập nhật số lượng. Vui lòng kiểm tra console.');
            }
        } else if (newSoLuong !== null) {
            alert('Số lượng không hợp lệ. Vui lòng nhập một số dương.');
        }
    };

    const handleDeleteChiTietGioHang = async (maChiTietGioHang) => {
        if (window.confirm(`Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng? (Mã Chi Tiết: ${maChiTietGioHang})`)) {
            try {
                await chiTietGioHangService.deleteChiTietGioHang(maChiTietGioHang);
                alert('Xóa sản phẩm khỏi giỏ hàng thành công!');
                fetchGioHangDetail(); // Tải lại chi tiết giỏ hàng để cập nhật hiển thị
            } catch (err) {
                console.error('ChiTietGioHang.jsx - Lỗi khi xóa chi tiết giỏ hàng:', err);
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
            <Link to="/admin/giohang" style={{ color: '#007bff', marginLeft: '10px' }}>Quay lại danh sách giỏ hàng</Link>
        </div>;
    }

    if (!gioHang) {
        return <div style={{ textAlign: 'center', padding: '20px' }}>Không tìm thấy giỏ hàng.</div>;
    }

    // displayTongTien sẽ luôn được tính toán từ calculateFrontendTongTien
    const displayTongTien = calculateFrontendTongTien(gioHang.chiTietGioHang);

    return (
        <div style={containerStyle}>
            <h1 style={headerStyle}>Chi tiết Giỏ hàng #{gioHang.maGioHang}</h1>

            <div style={sectionStyle}>
                <h3 style={sectionTitleStyle}>Thông tin tổng quan Giỏ hàng</h3>
                <p><strong>Mã Giỏ hàng:</strong> {gioHang.maGioHang}</p>
                <p><strong>Người dùng:</strong> {gioHang.nguoiDung?.hoTen || 'N/A'} (ID: {gioHang.nguoiDung?.maNguoiDung || 'N/A'})</p>
                <p><strong>Email Người dùng:</strong> {gioHang.nguoiDung?.email || 'N/A'}</p>
                <p><strong>Tổng tiền:</strong> {displayTongTien.toLocaleString('vi-VN') + ' VND'}</p> {/* Sử dụng displayTongTien */}
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
                                    <td style={tableCellStyle}>
                                        {/* Tính thành tiền dựa trên giá của sản phẩm và số lượng */}
                                        {((item.sanPham?.gia || 0) * item.soLuong).toLocaleString('vi-VN') + ' VND'}
                                    </td>
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
                    <p>Giỏ hàng này hiện không có sản phẩm nào. (Nếu bạn tin rằng có sản phẩm, hãy kiểm tra dữ liệu từ API '/chitietgiohang' của backend).</p>
                )}
            </div>

            <Link to="/admin/giohang" style={backButtonStyle}>
                &larr; Quay lại danh sách Giỏ hàng
            </Link>
        </div>
    );
}

export default ChiTietGioHang;
