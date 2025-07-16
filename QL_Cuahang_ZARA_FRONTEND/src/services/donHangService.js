// src/services/donHangService.js
import axios from 'axios';

// Đặt URL cơ sở cho API đơn hàng của bạn.
const API_URL = 'http://localhost:8080/don-hang'; 

const donHangService = {

  // 1. Lấy tất cả đơn hàng (GET)
  // Dựa trên cách bạn làm với getAllUsers trong userService,
  // chúng ta vẫn sẽ lấy token nhưng chỉ thêm header nếu có token.
  // Tuy nhiên, theo yêu cầu trước đó, bạn muốn hàm này KHÔNG YÊU CẦU TOKEN.
  // Do đó, tôi giữ nguyên việc không truyền token cho hàm này,
  // vì đây là trường hợp đặc biệt bạn muốn công khai.
  getAllDonHang: async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error('Lỗi khi lấy tất cả đơn hàng:', error);
      throw error;
    }
  },

  // 2. Lấy đơn hàng theo User ID (GET)
  getDonHangByUserId: async (userId) => {
    try {
      const token = localStorage.getItem('token');
      // Áp dụng cú pháp giống userService: thêm header có điều kiện
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

  // 3. Lấy thông tin chi tiết một đơn hàng theo ID (GET)
  getDonHangById: async (orderId) => {
    try {
      const token = localStorage.getItem('token');
      // Áp dụng cú pháp giống userService: thêm header có điều kiện
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
  updateTrangThaiDonHang: async (orderId, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      // Áp dụng cú pháp giống userService: thêm header có điều kiện
      const response = await axios.put(`${API_URL}/${orderId}/status`, { trangThai: newStatus }, {
        headers: {
          'Content-Type': 'application/json', // Quan trọng khi gửi dữ liệu JSON
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
    // Thêm xác nhận trước khi xóa, đây là một UX tốt
    if (!window.confirm('Bạn có chắc chắn muốn xóa đơn hàng này? Việc này có thể không khôi phục được.')) {
        throw new Error("Hủy thao tác xóa.");
    }
    try {
        const token = localStorage.getItem('token');
        // Áp dụng cú pháp giống userService: thêm header có điều kiện
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