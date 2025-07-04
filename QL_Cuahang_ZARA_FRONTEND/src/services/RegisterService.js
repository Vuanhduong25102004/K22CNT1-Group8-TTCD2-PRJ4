import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

export const createNguoiDung = async (data) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/users`, data);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Đã xảy ra lỗi khi tạo người dùng';
    }
};