// services/UserService.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

export const getMyInfo = async () => {
    const token = localStorage.getItem('token');

    const response = await axios.get(`${API_BASE_URL}/users/myinfo`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data;
};

export const updateUser = async (maNguoiDung, updateRequest) => {
    const token = localStorage.getItem('token');
    const response = await axios.put(`${API_BASE_URL}/users/${maNguoiDung}`, updateRequest, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};
