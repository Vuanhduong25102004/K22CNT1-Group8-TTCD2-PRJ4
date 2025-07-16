// src/components/AdminPaymentManagement.jsx
import React, { useState, useEffect } from 'react';
import paymentService from '../services/paymentService'; // Import service đã đổi tên
import { Link } from 'react-router-dom'; // Thêm Link để xem chi tiết đơn hàng

const AdminPaymentManagement = () => {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAllPayments = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await paymentService.getAllPayments();
                setPayments(data);
            } catch (err) {
                setError(err);
                console.error('Lỗi khi tải danh sách giao dịch thanh toán (Admin):', err);
                alert('Không thể tải danh sách giao dịch thanh toán. Vui lòng kiểm tra quyền truy cập hoặc kết nối.');
            } finally {
                setLoading(false);
            }
        };

        fetchAllPayments();
    }, []);

    const handleUpdateStatus = async (paymentId, currentStatus) => {
        const newStatus = prompt(`Nhập trạng thái mới cho giao dịch ${paymentId} (hiện tại: ${currentStatus}):\n(Ví dụ: Completed, Failed, Refunded, Pending)`);
        if (newStatus && newStatus.trim() !== '') {
            try {
                await paymentService.updatePaymentStatus(paymentId, newStatus.trim());
                setPayments(prevPayments =>
                    prevPayments.map(payment =>
                        payment.maThanhToan === paymentId ? { ...payment, trangThai: newStatus.trim() } : payment
                    )
                );
                alert('Cập nhật trạng thái giao dịch thanh toán thành công!');
            } catch (err) {
                console.error('Lỗi khi cập nhật trạng thái giao dịch thanh toán:', err);
                alert('Không thể cập nhật trạng thái giao dịch thanh toán. Vui lòng kiểm tra console.');
            }
        }
    };

    const handleDeletePayment = async (paymentId) => {
        try {
            await paymentService.deletePayment(paymentId);
            setPayments(prevPayments => prevPayments.filter(payment => payment.maThanhToan !== paymentId));
            alert('Xóa giao dịch thanh toán thành công!');
        } catch (err) {
            console.error('Lỗi khi xóa giao dịch thanh toán:', err);
            alert(`Không thể xóa giao dịch thanh toán: ${err.message || 'Lỗi không xác định'}`);
        }
    };

    if (loading) {
        return <div style={styles.container}>Đang tải danh sách giao dịch thanh toán...</div>;
    }

    if (error) {
        return <div style={styles.container}><div style={styles.errorMessage}>Lỗi: {error.message || 'Không thể tải dữ liệu'}</div></div>;
    }

    return (
        <div style={styles.container}>
            <h1 style={styles.header}>Quản lý Giao dịch Thanh toán</h1>
            {payments.length === 0 ? (
                <p style={styles.noPayments}>Không có giao dịch thanh toán nào trong hệ thống.</p>
            ) : (
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.tableHeader}>Mã GD</th>
                            <th style={styles.tableHeader}>Mã ĐH</th>
                            <th style={styles.tableHeader}>Người đặt</th>
                            <th style={styles.tableHeader}>Ngày thanh toán</th>
                            <th style={styles.tableHeader}>Số tiền GD</th>
                            <th style={styles.tableHeader}>Phương thức GD</th>
                            <th style={styles.tableHeader}>Trạng thái GD</th>
                            <th style={styles.tableHeader}>Mã QR</th>
                            <th style={styles.tableHeader}>Trạng thái ĐH</th>
                            <th style={styles.tableHeader}>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map((payment) => (
                            <tr key={payment.maThanhToan}>
                                <td style={styles.tableCell}>{payment.maThanhToan}</td>
                                <td style={styles.tableCell}>
                                    {payment.donHang?.maDonHang ? (
                                        <Link to={`/donhang-chitiet/${payment.donHang.maDonHang}`} style={styles.orderLink}>
                                            {payment.donHang.maDonHang}
                                        </Link>
                                    ) : 'N/A'}
                                </td>
                                <td style={styles.tableCell}>{payment.donHang?.nguoiDung?.hoTen || payment.donHang?.nguoiDung?.email || 'N/A'}</td>
                                <td style={styles.tableCell}>{new Date(payment.ngayThanhToan).toLocaleString('vi-VN')}</td>
                                {/* Dùng soTienThanhToan của giao dịch */}
                                <td style={styles.tableCell}>{payment.donHang?.tongTien ? payment.donHang.tongTien.toLocaleString('vi-VN') : '0'} VND</td>
                                {/* Dùng phuongThucThanhToan của giao dịch */}
                                <td style={styles.tableCell}>{payment.phuongThucThanhToan?.tenPhuongThuc || payment.phuongThucThanhToan || 'N/A'}</td>
                                <td style={styles.tableCell}>{payment.trangThai}</td> {/* Trạng thái của giao dịch */}
                                <td style={styles.tableCell}>{payment.maQR || 'N/A'}</td>
                                <td style={styles.tableCell}>{payment.donHang?.trangThaiDonHang || 'N/A'}</td> {/* Trạng thái của đơn hàng liên quan */}
                                <td style={styles.tableCellActions}>
                                    <button
                                        onClick={() => handleUpdateStatus(payment.maThanhToan, payment.trangThai)}
                                        style={{ ...styles.actionButton, backgroundColor: '#ffc107' }}
                                    >
                                        Cập nhật trạng thái
                                    </button>
                                    <button
                                        onClick={() => handleDeletePayment(payment.maThanhToan)}
                                        style={{ ...styles.actionButton, backgroundColor: '#dc3545' }}
                                    >
                                        Xóa
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

const styles = {
    container: {
        padding: '30px',
        maxWidth: '1200px',
        margin: '30px auto',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        fontFamily: 'Arial, sans-serif',
    },
    header: {
        textAlign: 'center',
        color: '#333',
        marginBottom: '30px',
        fontSize: '2.5em',
        borderBottom: '2px solid #eee',
        paddingBottom: '15px',
    },
    noPayments: {
        textAlign: 'center',
        color: '#777',
        fontSize: '1.2em',
        padding: '20px',
        border: '1px dashed #ccc',
        borderRadius: '5px',
        backgroundColor: '#f5f5f5',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        marginBottom: '20px',
    },
    tableHeader: {
        padding: '12px',
        border: '1px solid #ddd',
        textAlign: 'left',
        backgroundColor: '#e9ecef',
        color: '#333',
    },
    tableCell: {
        padding: '10px',
        border: '1px solid #ddd',
        textAlign: 'left',
    },
    tableCellActions: {
        padding: '10px',
        border: '1px solid #ddd',
        textAlign: 'center',
        whiteSpace: 'nowrap',
    },
    actionButton: {
        padding: '8px 12px',
        margin: '0 5px',
        border: 'none',
        borderRadius: '5px',
        color: 'white',
        cursor: 'pointer',
        fontSize: '0.9em',
        transition: 'background-color 0.3s ease',
    },
    errorMessage: {
        color: '#dc3545',
        textAlign: 'center',
        padding: '15px',
        backgroundColor: '#f8d7da',
        border: '1px solid #f5c6cb',
        borderRadius: '5px',
        marginBottom: '20px',
    },
    orderLink: {
        color: '#007bff',
        textDecoration: 'none',
        fontWeight: 'bold',
    },
    // Thêm hover effect cho link
    '@media (hover: hover)': {
        orderLink: {
            '&:hover': {
                textDecoration: 'underline',
            }
        }
    }
};

export default AdminPaymentManagement;