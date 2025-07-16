// src/services/chiTietDonHangService.js

import axios from 'axios'; // Import axios

// Đặt URL cơ sở cho API chi tiết đơn hàng của bạn.
const API_URL = 'http://localhost:8080/chi-tiet-don-hang'; 

const chiTietDonHangService = {

    // 1. Lấy tất cả chi tiết đơn hàng (GET)
    // Thêm header Authorization nếu có token
    getAllChiTietDonHang: async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(API_URL, {
                headers: {
                    ...(token && { Authorization: `Bearer ${token}` })
                }
            });
            return response.data;
        } catch (error) {
            console.error('Lỗi khi lấy tất cả chi tiết đơn hàng:', error);
            throw error;
        }
    },

    // 2. Lấy chi tiết đơn hàng theo ID của chi tiết (GET)
    // Ví dụ: GET http://localhost:8080/chi-tiet-don-hang/{maChiTiet}
    getChiTietDonHangById: async (maChiTiet) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${API_URL}/${maChiTiet}`, {
                headers: {
                    ...(token && { Authorization: `Bearer ${token}` })
                }
            });
            return response.data;
        } catch (error) {
            console.error(`Lỗi khi lấy chi tiết đơn hàng với ID ${maChiTiet}:`, error);
            throw error;
        }
    },

    // 3. Lấy TẤT CẢ các chi tiết đơn hàng thuộc MỘT ĐƠN HÀNG CỤ THỂ (GET)
    // Dựa trên cuộc trò chuyện trước, API này có thể hỗ trợ query param `maDonHang`
    // hoặc bạn sẽ phải lọc ở frontend nếu nó trả về tất cả.
    // Tôi sẽ ưu tiên cách có query param trước.
    // Ví dụ: GET http://localhost:8080/chi-tiet-don-hang?maDonHang=1
    getChiTietByMaDonHang: async (maDonHang) => {
        try {
            const token = localStorage.getItem('token');
            let response;
            
            // Cố gắng gọi API với tham số query `maDonHang`
            try {
                response = await axios.get(`${API_URL}?maDonHang=${maDonHang}`, {
                    headers: {
                        ...(token && { Authorization: `Bearer ${token}` })
                    }
                });
            } catch (queryError) {
                // Nếu gọi với query param thất bại, thử gọi API không tham số và lọc frontend
                console.warn(`API không hỗ trợ query param 'maDonHang'. Thử gọi tất cả và lọc frontend.`, queryError);
                response = await axios.get(API_URL, {
                    headers: {
                        ...(token && { Authorization: `Bearer ${token}` })
                    }
                });
                
                // Lọc dữ liệu ở frontend
                response.data = response.data.filter(item => 
                    item.donHang && item.donHang.maDonHang === parseInt(maDonHang)
                );
            }
            
            return response.data;
        } catch (error) {
            console.error(`Lỗi khi lấy chi tiết đơn hàng cho đơn hàng ${maDonHang}:`, error);
            throw error;
        }
    },

    // 4. Tạo mới một chi tiết đơn hàng (POST)
    // Endpoint ví dụ: POST http://localhost:8080/chi-tiet-don-hang
    createChiTietDonHang: async (chiTietData) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(API_URL, chiTietData, {
                headers: {
                    'Content-Type': 'application/json',
                    ...(token && { Authorization: `Bearer ${token}` })
                }
            });
            return response.data;
        } catch (error) {
            console.error('Lỗi khi tạo mới chi tiết đơn hàng:', error);
            throw error;
        }
    },

    // 5. Cập nhật chi tiết đơn hàng theo ID (PUT)
    // Endpoint ví dụ: PUT http://localhost:8080/chi-tiet-don-hang/{maChiTiet}
    updateChiTietDonHang: async (maChiTiet, updatedData) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(`${API_URL}/${maChiTiet}`, updatedData, {
                headers: {
                    'Content-Type': 'application/json',
                    ...(token && { Authorization: `Bearer ${token}` })
                }
            });
            return response.data;
        } catch (error) {
            console.error(`Lỗi khi cập nhật chi tiết đơn hàng ${maChiTiet}:`, error);
            throw error;
        }
    },

    // 6. Xóa chi tiết đơn hàng theo ID (DELETE)
    // Endpoint ví dụ: DELETE http://localhost:8080/chi-tiet-don-hang/{maChiTiet}
    deleteChiTietDonHang: async (maChiTiet) => {
        if (!window.confirm(`Bạn có chắc chắn muốn xóa chi tiết đơn hàng ${maChiTiet} này?`)) {
            throw new Error("Hủy thao tác xóa chi tiết đơn hàng.");
        }
        try {
            const token = localStorage.getItem('token');
            const response = await axios.delete(`${API_URL}/${maChiTiet}`, {
                headers: {
                    ...(token && { Authorization: `Bearer ${token}` })
                }
            });
            return response.data;
        } catch (error) {
            console.error(`Lỗi khi xóa chi tiết đơn hàng ${maChiTiet}:`, error);
            throw error;
        }
    }
};

export default chiTietDonHangService;