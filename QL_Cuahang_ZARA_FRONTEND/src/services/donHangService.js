// src/services/donHangService.js
import axios from 'axios';

const API_URL = 'http://localhost:8080/don-hang'; 

const donHangService = {

  getAllDonHang: async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error('Lỗi khi lấy tất cả đơn hàng:', error);
      throw error;
    }
  },

  getDonHangByUserId: async (userId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/user/${userId}`, {
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }) 
        }
      });
      return response.data;
    } catch (error) {
      console.error(`Lỗi khi lấy đơn hàng của người dùng ${userId}:`, error);
      throw error;
    }
  },

  getDonHangById: async (orderId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/${orderId}`, {
        headers: {
          ...(token && { Authorization: `Bearer ${token}` })
        }
      });
      return response.data;
    } catch (error) {
      console.error(`Lỗi khi lấy chi tiết đơn hàng ${orderId}:`, error);
      throw error;
    }
  },

  // 4. Cập nhật trạng thái đơn hàng (PUT)
  // SỬA ĐỔI ĐỂ KHÔNG SỬA BACKEND: Phải gửi ĐỐI TƯỢNG DonHang ĐẦY ĐỦ
  // Endpoint: PUT /don-hang/{orderId}
  // Body: { maDonHang: ..., nguoiDung: {...}, ngayTao: ..., trangThai: newStatus, ... }
  updateTrangThaiDonHang: async (orderId, donHangUpdateData) => { // Tham số thứ hai giờ là một object
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`${API_URL}/${orderId}`, donHangUpdateData, { // <-- URL ĐÃ SỬA VÀ THAM SỐ LÀ donHangUpdateData
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` })
        }
      });
      return response.data;
    } catch (error) {
      console.error(`Lỗi khi cập nhật trạng thái đơn hàng ${orderId}:`, error);
      throw error;
    }
  },

  // 5. Xóa đơn hàng (DELETE)
  deleteDonHang: async (orderId) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa đơn hàng này? Việc này có thể không khôi phục được.')) {
        throw new Error("Hủy thao tác xóa.");
    }
    try {
        const token = localStorage.getItem('token');
        const response = await axios.delete(`${API_URL}/${orderId}`, {
            headers: {
                ...(token && { Authorization: `Bearer ${token}` })
            }
        });
        return response.data;
    } catch (error) {
        console.error(`Lỗi khi xóa đơn hàng ${orderId}:`, error);
        throw error;
    }
  }
};

export default donHangService;
