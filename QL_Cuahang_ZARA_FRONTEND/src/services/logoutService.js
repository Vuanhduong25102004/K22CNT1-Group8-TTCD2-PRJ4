import axios from 'axios';

const LOGOUT_URL = 'http://localhost:8080/auth/logout';

export const logout = async () => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No token found');

    try {
        const response = await axios.post(LOGOUT_URL, {}, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};
