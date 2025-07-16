// src/services/chiTietGioHangService.js
import axios from 'axios';

// Định nghĩa URL cơ sở cho API chi tiết giỏ hàng
const API_URL = 'http://localhost:8080/chitietgiohang'; // Đảm bảo khớp với @RequestMapping("/chitietgiohang") của Controller

// Hàm để lấy token từ localStorage (nếu có)
const getToken = () => {
    return localStorage.getItem('token');
};

const chiTietGioHangService = {
    // 1. Lấy tất cả các chi tiết giỏ hàng (GET /chitietgiohang)
    getAllChiTietGioHang: async () => {
        try {
            const token = getToken();
            const response = await axios.get(API_URL, {
                headers: {
                    ...(token && { Authorization: `Bearer ${token}` })
                }
            });
            return response.data;
        } catch (error) {
            console.error('Lỗi khi lấy tất cả chi tiết giỏ hàng:', error);
            throw error;
        }
    },

    // 2. Lấy một chi tiết giỏ hàng theo ID (GET /chitietgiohang/{id})
    getChiTietGioHangById: async (id) => {
        try {
            const token = getToken();
            const response = await axios.get(`${API_URL}/${id}`, {
                headers: {
                    ...(token && { Authorization: `Bearer ${token}` })
                }
            });
            return response.data;
        } catch (error) {
            console.error(`Lỗi khi lấy chi tiết giỏ hàng với ID ${id}:`, error);
            throw error;
        }
    },

    // 3. Cập nhật một chi tiết giỏ hàng (PUT /chitietgiohang/{id})
    updateChiTietGioHang: async (id, chiTietData) => {
        try {
            const token = getToken();
            const response = await axios.put(`${API_URL}/${id}`, chiTietData, {
                headers: {
                    'Content-Type': 'application/json',
                    ...(token && { Authorization: `Bearer ${token}` })
                }
            });
            return response.data;
        } catch (error) {
            console.error(`Lỗi khi cập nhật chi tiết giỏ hàng với ID ${id}:`, error);
            throw error;
        }
    },

    // 4. Xóa một chi tiết giỏ hàng (DELETE /chitietgiohang/{id})
    deleteChiTietGioHang: async (id) => {
        try {
            const token = getToken();
            const response = await axios.delete(`${API_URL}/${id}`, {
                headers: {
                    ...(token && { Authorization: `Bearer ${token}` })
                }
            });
            return response.data; // Backend trả về String "Xóa thành công" hoặc "Không tìm thấy"
        } catch (error) {
            console.error(`Lỗi khi xóa chi tiết giỏ hàng với ID ${id}:`, error);
            throw error;
        }
    }
};

export default chiTietGioHangService;