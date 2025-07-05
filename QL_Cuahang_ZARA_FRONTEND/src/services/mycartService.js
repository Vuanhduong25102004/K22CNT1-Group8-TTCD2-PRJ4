import axios from 'axios';

const API_URL = 'http://localhost:8080/giohang/mycart';

export const getMyCart = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(API_URL, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log("✅ API getMyCart response:", response.data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateCartQuantity = async (maNguoiDung, maSanPham, soLuongMoi) => {
    const token = localStorage.getItem("token");
    const response = await axios.put("http://localhost:8080/giohang/update", {
        maNguoiDung,
        maSanPham,
        soLuongMoi
    }, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
};