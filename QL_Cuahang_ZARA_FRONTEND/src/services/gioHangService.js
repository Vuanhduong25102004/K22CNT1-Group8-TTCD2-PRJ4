// src/services/gioHangService.js
import axios from 'axios';

// Định nghĩa URL cơ sở cho API giỏ hàng
const API_URL = 'http://localhost:8080/giohang';

// Hàm để lấy token từ localStorage
const getToken = () => {
    return localStorage.getItem('token');
};

const gioHangService = {
    // 1. Lấy tất cả giỏ hàng (của tất cả người dùng) (GET)
    // Endpoint: /giohang/getallcart
    // Áp dụng cách thêm header có điều kiện tương tự donHangService
    getAllGioHang: async () => {
        try {
            const token = getToken();
            const response = await axios.get(`${API_URL}/getallcart`, {
                headers: {
                    // Thêm header Authorization chỉ khi có token
                    ...(token && { Authorization: `Bearer ${token}` })
                }
            });
            return response.data;
        } catch (error) {
            console.error('Lỗi khi lấy tất cả giỏ hàng:', error);
            throw error;
        }
    },

    // 2. Lấy giỏ hàng theo User ID (GET)
    // Endpoint: /giohang/user/{userId} - (tôi đã thay đổi để khớp với quy ước API phổ biến hơn)
    // Hoặc nếu API của bạn là /giohang/{userId} thì giữ nguyên.
    // Tôi sẽ giả định bạn muốn có endpoint `/giohang/user/{userId}` để rõ ràng hơn.
    // Nếu API của bạn là /giohang/{userId} để lấy chi tiết một giỏ hàng cụ thể
    // VÀ /giohang/user/{userId} để lấy tất cả giỏ hàng của một user, 
    // thì bạn cần backend hỗ trợ điều đó.
    // Trong trường hợp này, tôi sẽ giữ nguyên getGioHangByUserId như ban đầu của bạn,
    // và thêm getGioHangById riêng.
    getGioHangByUserId: async (userId) => {
        try {
            const token = getToken();
            const response = await axios.get(`${API_URL}/${userId}`, { // Giữ nguyên theo API gốc của bạn
                headers: {
                    ...(token && { Authorization: `Bearer ${token}` })
                }
            });
            return response.data;
        } catch (error) {
            console.error(`Lỗi khi lấy giỏ hàng theo User ID ${userId}:`, error);
            throw error;
        }
    },

    // 3. Lấy chi tiết một giỏ hàng theo MaGioHang (GET)
    // Đây là hàm mới, tương tự getDonHangById
    // Endpoint: /giohang/{maGioHang}
    getGioHangById: async (maGioHang) => {
        try {
            const token = getToken();
            const response = await axios.get(`${API_URL}/${maGioHang}`, {
                headers: {
                    ...(token && { Authorization: `Bearer ${token}` })
                }
            });
            return response.data;
        } catch (error) {
            console.error(`Lỗi khi lấy chi tiết giỏ hàng ${maGioHang}:`, error);
            throw error;
        }
    },

    // 4. Thêm sản phẩm vào giỏ hàng (POST)
    // Endpoint: /giohang
    addSanPhamToGioHang: async (gioHangData) => {
        try {
            const token = getToken();
            const response = await axios.post(`${API_URL}`, gioHangData, {
                headers: {
                    'Content-Type': 'application/json', // Đảm bảo gửi JSON
                    ...(token && { Authorization: `Bearer ${token}` })
                }
            });
            return response.data;
        } catch (error) {
            console.error('Lỗi khi thêm sản phẩm vào giỏ hàng:', error);
            throw error;
        }
    },

    // 5. Cập nhật số lượng sản phẩm trong giỏ hàng (PUT)
    // Endpoint: /giohang/{maChiTietGioHang}
    updateGioHangItem: async (maChiTietGioHang, updateData) => {
        try {
            const token = getToken();
            const response = await axios.put(`${API_URL}/${maChiTietGioHang}`, updateData, {
                headers: {
                    'Content-Type': 'application/json', // Đảm bảo gửi JSON
                    ...(token && { Authorization: `Bearer ${token}` })
                }
            });
            return response.data;
        } catch (error) {
            console.error(`Lỗi khi cập nhật chi tiết giỏ hàng ${maChiTietGioHang}:`, error);
            throw error;
        }
    },

    // 6. Xóa một sản phẩm khỏi giỏ hàng (DELETE)
    // Endpoint: /giohang/{maChiTietGioHang}
    deleteGioHang: async (maChiTietGioHang) => {
        // Thêm xác nhận trước khi xóa, đây là một UX tốt
        if (!window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?')) {
            throw new Error("Hủy thao tác xóa.");
        }
        try {
            const token = getToken();
            const response = await axios.delete(`${API_URL}/${maChiTietGioHang}`, {
                headers: {
                    ...(token && { Authorization: `Bearer ${token}` })
                }
            });
            return response.data;
        } catch (error) {
            console.error(`Lỗi khi xóa sản phẩm ${maChiTietGioHang} khỏi giỏ hàng:`, error);
            throw error;
        }
    },

    // Hàm tiện ích để xóa toàn bộ giỏ hàng của một người dùng (nếu backend hỗ trợ)
    // Endpoint ví dụ: /giohang/clear/{userId}
    clearGioHangByUserId: async (userId) => {
        if (!window.confirm(`Bạn có chắc chắn muốn xóa toàn bộ giỏ hàng của người dùng ${userId}?`)) {
            throw new Error("Hủy thao tác xóa toàn bộ giỏ hàng.");
        }
        try {
            const token = getToken();
            // Điều chỉnh endpoint này nếu backend của bạn có logic xóa toàn bộ giỏ hàng khác
            const response = await axios.delete(`${API_URL}/clear/${userId}`, {
                headers: {
                    ...(token && { Authorization: `Bearer ${token}` })
                }
            });
            return response.data;
        } catch (error) {
            console.error(`Lỗi khi xóa toàn bộ giỏ hàng của người dùng ${userId}:`, error);
            throw error;
        }
    }
};

export default gioHangService;