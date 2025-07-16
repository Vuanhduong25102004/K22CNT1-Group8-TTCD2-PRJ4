// src/services/paymentService.js (CẬP NHẬT LẠI DỰA TRÊN YÊU CẦU CỦA BẠN)
import axios from 'axios';

// Đây là endpoint API cho quản lý thanh toán của admin
// Dựa trên yêu cầu của bạn, endpoint này sẽ là 'http://localhost:8080/thanh-toan'
// Cho các thao tác GET (lấy tất cả), PUT (cập nhật trạng thái), DELETE (xóa)
const ADMIN_PAYMENT_API_URL = 'http://localhost:8080/thanh-toan';

// Endpoint riêng cho các giao dịch thanh toán của người dùng cụ thể
// Để tránh xung đột với endpoint admin và giữ rõ ràng
const USER_PAYMENT_API_URL = 'http://localhost:8080/api/payments'; 

const paymentService = {

    // 1. Lấy tất cả các giao dịch thanh toán (Dành cho Admin - GET)
    // Sẽ gọi: GET http://localhost:8080/thanh-toan
    // Cần token và quyền ADMIN ở backend cho endpoint này.
    getAllPayments: async () => {
        try {
            const token = localStorage.getItem('token'); // Lấy token từ localStorage (nếu có)
            const response = await axios.get(ADMIN_PAYMENT_API_URL, { // Sử dụng URL bạn đã cung cấp
                headers: {
                    ...(token && { Authorization: `Bearer ${token}` }) // Gửi token nếu có
                }
            });
            return response.data;
        } catch (error) {
            console.error('Lỗi khi lấy tất cả giao dịch thanh toán (Admin):', error);
            throw error;
        }
    },

    // 2. Lấy giao dịch thanh toán theo User ID (Dành cho Người dùng - GET)
    // Sẽ gọi: GET http://localhost:8080/api/payments/user/{userId}
    // Cần token và quyền USER/ADMIN ở backend. Backend NÊN tự lọc theo user ID của người gửi token.
    getPaymentsByUserId: async (userId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${USER_PAYMENT_API_URL}/user/${userId}`, {
                headers: {
                    ...(token && { Authorization: `Bearer ${token}` })
                }
            });
            return response.data;
        } catch (error) {
            console.error(`Lỗi khi lấy giao dịch thanh toán của người dùng ${userId}:`, error);
            throw error;
        }
    },

    // 3. Lấy thông tin chi tiết một giao dịch thanh toán theo ID (Admin - GET)
    // Sẽ gọi: GET http://localhost:8080/thanh-toan/{paymentId}
    // Cần token và quyền ADMIN ở backend
    getPaymentById: async (paymentId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${ADMIN_PAYMENT_API_URL}/${paymentId}`, {
                headers: {
                    ...(token && { Authorization: `Bearer ${token}` })
                }
            });
            return response.data;
        } catch (error) {
            console.error(`Lỗi khi lấy chi tiết giao dịch thanh toán ${paymentId} (Admin):`, error);
            throw error;
        }
    },

    // 4. Cập nhật trạng thái của một giao dịch thanh toán (Admin - PUT)
    // Sẽ gọi: PUT http://localhost:8080/thanh-toan/{paymentId}/status
    // Cần token và quyền ADMIN ở backend
    updatePaymentStatus: async (paymentId, newStatus) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(`${ADMIN_PAYMENT_API_URL}/${paymentId}/status`, { trangThai: newStatus }, {
                headers: {
                    'Content-Type': 'application/json',
                    ...(token && { Authorization: `Bearer ${token}` })
                }
            });
            return response.data;
        } catch (error) {
            console.error(`Lỗi khi cập nhật trạng thái giao dịch thanh toán ${paymentId} (Admin):`, error);
            throw error;
        }
    },

    // 5. Xóa một giao dịch thanh toán (Admin - DELETE)
    // Sẽ gọi: DELETE http://localhost:8080/thanh-toan/{paymentId}
    // Cần token và quyền ADMIN ở backend. Cẩn thận khi sử dụng!
    deletePayment: async (paymentId) => {
        if (!window.confirm('Bạn có chắc chắn muốn xóa giao dịch thanh toán này? Việc này có thể không khôi phục được.')) {
            throw new Error("Hủy thao tác xóa.");
        }
        try {
            const token = localStorage.getItem('token');
            const response = await axios.delete(`${ADMIN_PAYMENT_API_URL}/${paymentId}`, {
                headers: {
                    ...(token && { Authorization: `Bearer ${token}` })
                }
            });
            return response.data;
        } catch (error) {
            console.error(`Lỗi khi xóa giao dịch thanh toán ${paymentId} (Admin):`, error);
            throw error;
        }
    }
};

export default paymentService;