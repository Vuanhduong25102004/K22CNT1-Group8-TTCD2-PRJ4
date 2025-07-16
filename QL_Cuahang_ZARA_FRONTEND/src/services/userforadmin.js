import axios from 'axios';

// Đặt URL cơ sở cho API người dùng của bạn.
// Dựa trên thông tin bạn cung cấp, API cho người dùng là http://localhost:8080/users
// Vì vậy, BASE_API_URL sẽ là 'http://localhost:8080'
const BASE_API_URL = 'http://localhost:8080'; 

// LƯU Ý QUAN TRỌNG:
// Nếu bạn đã thiết lập một instance axios chung với interceptors (như tôi đã hướng dẫn trong file axiosClient.js hoặc api.js)
// thì bạn NÊN sử dụng nó thay vì axios trực tiếp ở đây.
// Việc này giúp quản lý token và lỗi tập trung.
// Ví dụ: import axiosClient from './axiosClient';
// Và sau đó thay thế 'axios' bằng 'axiosClient' trong các hàm bên dưới.
// Nếu chưa, tạm thời dùng axios trực tiếp như dưới đây và nhớ thêm header Authorization thủ công.


const userService = {

  // 1. Lấy danh sách tất cả người dùng (GET)
  getAllUsers: async () => {
    try {
      const token = localStorage.getItem('token'); // Lấy token từ localStorage

      // Thực hiện GET request đến http://localhost:8080/users
      const response = await axios.get(`${BASE_API_URL}/users`, {
        headers: {
          // Thêm Authorization header chỉ khi có token.
          // Đây là cách backend yêu cầu xác thực.
          ...(token && { Authorization: `Bearer ${token}` }) 
        }
      });
      return response.data; // Trả về dữ liệu JSON của danh sách người dùng
    } catch (error) {
      console.error("Lỗi khi lấy danh sách người dùng:", error);
      // Ném lỗi để component gọi có thể bắt và xử lý (ví dụ: hiển thị thông báo lỗi)
      throw error; 
    }
  },

  // 2. Lấy thông tin chi tiết một người dùng theo ID (GET)
  // Ví dụ: http://localhost:8080/users/123
  getUserById: async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${BASE_API_URL}/users/${id}`, {
        headers: {
          ...(token && { Authorization: `Bearer ${token}` })
        }
      });
      return response.data;
    } catch (error) {
      console.error(`Lỗi khi lấy người dùng với ID ${id}:`, error);
      throw error;
    }
  },

  // 3. Tạo người dùng mới (POST)
  // Gửi đối tượng user data đến http://localhost:8080/users
  createUser: async (userData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${BASE_API_URL}/users`, userData, {
        headers: {
          'Content-Type': 'application/json', // Quan trọng khi gửi dữ liệu JSON
          ...(token && { Authorization: `Bearer ${token}` })
        }
      });
      return response.data; // Trả về dữ liệu của người dùng vừa tạo (nếu backend có)
    } catch (error) {
      console.error("Lỗi khi tạo người dùng:", error);
      throw error;
    }
  },

  // 4. Cập nhật thông tin người dùng (PUT)
  // Gửi đối tượng user data để cập nhật người dùng có ID tương ứng
  // Ví dụ: http://localhost:8080/users/123
  updateUser: async (id, userData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`${BASE_API_URL}/users/${id}`, userData, {
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` })
        }
      });
      return response.data; // Trả về dữ liệu của người dùng đã cập nhật
    } catch (error) {
      console.error(`Lỗi khi cập nhật người dùng với ID ${id}:`, error);
      throw error;
    }
  },

  // 5. Xóa người dùng (DELETE)
  // Ví dụ: http://localhost:8080/users/123
  deleteUser: async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(`${BASE_API_URL}/users/${id}`, {
        headers: {
          ...(token && { Authorization: `Bearer ${token}` })
        }
      });
      return response.data; // Thường trả về một thông báo hoặc status thành công
    } catch (error) {
      console.error(`Lỗi khi xóa người dùng với ID ${id}:`, error);
      throw error;
    }
  },
};

export default userService;