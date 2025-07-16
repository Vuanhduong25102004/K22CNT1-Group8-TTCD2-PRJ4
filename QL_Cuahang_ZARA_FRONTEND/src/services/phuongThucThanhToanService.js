// src/services/phuongThucThanhToanService.js
import axios from 'axios';

// Đặt URL cơ sở cho API phương thức thanh toán của bạn.
// Dựa trên yêu cầu của bạn: http://localhost:8080/phuong-thuc-thanh-toan
const API_URL = 'http://localhost:8080/phuong-thuc-thanh-toan';

const phuongThucThanhToanService = {

    // 1. Lấy tất cả các phương thức thanh toán (GET)
    // Giả định endpoint này là công khai hoặc chỉ yêu cầu xác thực cơ bản,
    // nhưng để an toàn và nhất quán, chúng ta vẫn sẽ thử gửi token nếu có,
    // trừ khi backend của bạn hoàn toàn không yêu cầu.
    getAllPhuongThucThanhToan: async () => {
        try {
            const token = localStorage.getItem('token'); // Lấy token từ localStorage (nếu có)
            const response = await axios.get(API_URL, {
                headers: {
                    ...(token && { Authorization: `Bearer ${token}` }) // Gửi token nếu có
                }
            });
            return response.data;
        } catch (error) {
            console.error('Lỗi khi lấy tất cả phương thức thanh toán:', error);
            throw error;
        }
    },

    // 2. Lấy phương thức thanh toán theo ID (GET) - Thường dùng cho admin hoặc chi tiết
    getPhuongThucById: async (maPhuongThuc) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${API_URL}/${maPhuongThuc}`, {
                headers: {
                    ...(token && { Authorization: `Bearer ${token}` })
                }
            });
            return response.data;
        } catch (error) {
            console.error(`Lỗi khi lấy phương thức thanh toán ${maPhuongThuc}:`, error);
            throw error;
        }
    },

    // Thêm phương thức thanh toán mới (Dành cho Admin - POST)
    // Thường sẽ có một endpoint riêng hoặc yêu cầu quyền Admin
    addPhuongThucThanhToan: async (newPhuongThucData) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(API_URL, newPhuongThucData, {
                headers: {
                    'Content-Type': 'application/json',
                    ...(token && { Authorization: `Bearer ${token}` })
                }
            });
            return response.data;
        } catch (error) {
            console.error('Lỗi khi thêm phương thức thanh toán:', error);
            throw error;
        }
    },

    // Cập nhật phương thức thanh toán (Dành cho Admin - PUT)
    updatePhuongThucThanhToan: async (maPhuongThuc, updatedPhuongThucData) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(`${API_URL}/${maPhuongThuc}`, updatedPhuongThucData, {
                headers: {
                    'Content-Type': 'application/json',
                    ...(token && { Authorization: `Bearer ${token}` })
                }
            });
            return response.data;
        } catch (error) {
            console.error(`Lỗi khi cập nhật phương thức thanh toán ${maPhuongThuc}:`, error);
            throw error;
        }
    },

    // Xóa phương thức thanh toán (Dành cho Admin - DELETE)
    deletePhuongThucThanhToan: async (maPhuongThuc) => {
        if (!window.confirm('Bạn có chắc chắn muốn xóa phương thức thanh toán này?')) {
            throw new Error("Hủy thao tác xóa.");
        }
        try {
            const token = localStorage.getItem('token');
            const response = await axios.delete(`${API_URL}/${maPhuongThuc}`, {
                headers: {
                    ...(token && { Authorization: `Bearer ${token}` })
                }
            });
            return response.data;
        } catch (error) {
            console.error(`Lỗi khi xóa phương thức thanh toán ${maPhuongThuc}:`, error);
            throw error;
        }
    }
};

export default phuongThucThanhToanService;