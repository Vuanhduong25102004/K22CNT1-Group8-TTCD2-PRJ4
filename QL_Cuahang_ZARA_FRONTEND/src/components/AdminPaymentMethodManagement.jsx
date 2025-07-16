// src/components/AdminPaymentMethodManagement.jsx
import React, { useState, useEffect } from 'react';
import phuongThucThanhToanService from '../services/phuongThucThanhToanService';

const AdminPaymentMethodManagement = () => {
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newMethodName, setNewMethodName] = useState('');

    useEffect(() => {
        const fetchPaymentMethods = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await phuongThucThanhToanService.getAllPhuongThucThanhToan();
                setPaymentMethods(data);
            } catch (err) {
                setError(err);
                console.error('Lỗi khi tải danh sách phương thức thanh toán:', err);
                alert('Không thể tải danh sách phương thức thanh toán. Vui lòng kiểm tra quyền truy cập hoặc kết nối.');
            } finally {
                setLoading(false);
            }
        };

        fetchPaymentMethods();
    }, []);

    const handleAddMethod = async () => {
        if (!newMethodName.trim()) {
            alert('Tên phương thức không được để trống.');
            return;
        }
        try {
            const addedMethod = await phuongThucThanhToanService.addPhuongThucThanhToan({ tenPhuongThuc: newMethodName.trim() });
            setPaymentMethods(prev => [...prev, addedMethod]);
            setNewMethodName('');
            alert('Thêm phương thức thanh toán thành công!');
        } catch (err) {
            console.error('Lỗi khi thêm phương thức thanh toán:', err);
            alert('Không thể thêm phương thức thanh toán. Vui lòng kiểm tra console.');
        }
    };

    const handleUpdateMethod = async (maPhuongThuc, currentName) => {
        const updatedName = prompt(`Nhập tên mới cho phương thức ${currentName} (ID: ${maPhuongThuc}):`);
        if (updatedName && updatedName.trim() !== '') {
            try {
                const updatedMethod = await phuongThucThanhToanService.updatePhuongThucThanhToan(maPhuongThuc, { tenPhuongThuc: updatedName.trim() });
                setPaymentMethods(prev =>
                    prev.map(method =>
                        method.maPhuongThuc === maPhuongThuc ? updatedMethod : method
                    )
                );
                alert('Cập nhật phương thức thanh toán thành công!');
            } catch (err) {
                console.error('Lỗi khi cập nhật phương thức thanh toán:', err);
                alert('Không thể cập nhật phương thức thanh toán. Vui lòng kiểm tra console.');
            }
        }
    };

    const handleDeleteMethod = async (maPhuongThuc) => {
        try {
            await phuongThucThanhToanService.deletePhuongThucThanhToan(maPhuongThuc);
            setPaymentMethods(prev => prev.filter(method => method.maPhuongThuc !== maPhuongThuc));
            alert('Xóa phương thức thanh toán thành công!');
        } catch (err) {
            console.error('Lỗi khi xóa phương thức thanh toán:', err);
            alert(`Không thể xóa phương thức thanh toán: ${err.message || 'Lỗi không xác định'}`);
        }
    };

    if (loading) {
        return <div style={styles.container}>Đang tải danh sách phương thức thanh toán...</div>;
    }

    if (error) {
        return <div style={styles.container}><div style={styles.errorMessage}>Lỗi: {error.message || 'Không thể tải dữ liệu'}</div></div>;
    }

    return (
        <div style={styles.container}>
            <h1 style={styles.header}>Quản lý Phương thức Thanh toán</h1>

            <div style={styles.addForm}>
                <input
                    type="text"
                    placeholder="Tên phương thức mới"
                    value={newMethodName}
                    onChange={(e) => setNewMethodName(e.target.value)}
                    style={styles.inputField}
                />
                <button onClick={handleAddMethod} style={styles.addButton}>Thêm phương thức</button>
            </div>

            {paymentMethods.length === 0 ? (
                <p style={styles.noMethods}>Không có phương thức thanh toán nào trong hệ thống.</p>
            ) : (
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.tableHeader}>Mã Phương thức</th>
                            <th style={styles.tableHeader}>Tên Phương thức</th>
                            <th style={styles.tableHeader}>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paymentMethods.map((method) => (
                            <tr key={method.maPhuongThuc}>
                                <td style={styles.tableCell}>{method.maPhuongThuc}</td>
                                <td style={styles.tableCell}>{method.tenPhuongThuc}</td>
                                <td style={styles.tableCellActions}>
                                    <button
                                        onClick={() => handleUpdateMethod(method.maPhuongThuc, method.tenPhuongThuc)}
                                        style={{ ...styles.actionButton, backgroundColor: '#ffc107' }}
                                    >
                                        Cập nhật
                                    </button>
                                    <button
                                        onClick={() => handleDeleteMethod(method.maPhuongThuc)}
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
        maxWidth: '800px',
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
    addForm: {
        display: 'flex',
        marginBottom: '20px',
        gap: '10px',
    },
    inputField: {
        flexGrow: 1,
        padding: '10px',
        fontSize: '1em',
        border: '1px solid #ccc',
        borderRadius: '5px',
    },
    addButton: {
        padding: '10px 15px',
        backgroundColor: '#28a745',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '1em',
        transition: 'background-color 0.3s ease',
    },
    noMethods: {
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
};

export default AdminPaymentMethodManagement;