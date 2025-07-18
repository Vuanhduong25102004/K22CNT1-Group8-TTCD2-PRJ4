
import axios from 'axios';

const API_URL = 'http://localhost:8080/products';
const token = localStorage.getItem('token');


export const getAllProducts = async () => {
    try {
        const response = await axios.get(API_URL, {
        });
        return response.data; // Trả về dữ liệu JSON
    } catch (error) {
        throw error;
    }
};

export const getProductsByCategory = async (maDanhMuc) => {
    try {
        const response = await axios.get(`${API_URL}/danh-muc/${maDanhMuc}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};
const productService = {

    /**
     * Lấy tất cả sản phẩm từ API.
     * Bao gồm token xác thực nếu có trong localStorage.
     */
    getAllProducts: async () => {
        try {
            // Lấy token từ localStorage ngay tại thời điểm hàm được gọi
            // Điều này đảm bảo bạn luôn có token mới nhất (ví dụ: sau khi đăng nhập)
            const token = localStorage.getItem('token');

            const response = await axios.get(API_URL, {
                headers: {
                    // Chỉ thêm header Authorization nếu token tồn tại
                    ...(token && { Authorization: `Bearer ${token}` })
                }
            });
            return response.data; // Trả về dữ liệu JSON
        } catch (error) {
            console.error('Lỗi khi lấy tất cả sản phẩm:', error);
            // Ném lỗi để component gọi hàm có thể xử lý (ví dụ: hiển thị thông báo lỗi)
            throw error;
        }
    },

    /**
     * Lấy sản phẩm theo ID.
     * @param {string} productId - ID của sản phẩm cần lấy.
     */
    getProductById: async (productId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${API_URL}/${productId}`, {
                headers: {
                    ...(token && { Authorization: `Bearer ${token}` })
                }
            });
            return response.data;
        } catch (error) {
            console.error(`Lỗi khi lấy sản phẩm ${productId}:`, error);
            throw error;
        }
    },

    /**
     * Thêm sản phẩm mới. (Yêu cầu quyền Admin)
     * @param {object} productData - Dữ liệu sản phẩm mới.
     */
    addProduct: async (productData) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(API_URL, productData, {
                headers: {
                    'Content-Type': 'application/json',
                    ...(token && { Authorization: `Bearer ${token}` })
                }
            });
            return response.data;
        } catch (error) {
            console.error('Lỗi khi thêm sản phẩm:', error);
            throw error;
        }
    },

    /**
     * Cập nhật sản phẩm hiện có. (Yêu cầu quyền Admin)
     * @param {string} productId - ID của sản phẩm cần cập nhật.
     * @param {object} productData - Dữ liệu cập nhật của sản phẩm.
     */
    updateProduct: async (productId, productData) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(`${API_URL}/${productId}`, productData, {
                headers: {
                    'Content-Type': 'application/json',
                    ...(token && { Authorization: `Bearer ${token}` })
                }
            });
            return response.data;
        } catch (error) {
            console.error(`Lỗi khi cập nhật sản phẩm ${productId}:`, error);
            throw error;
        }
    },

    /**
     * Xóa sản phẩm. (Yêu cầu quyền Admin)
     * @param {string} productId - ID của sản phẩm cần xóa.
     */
    deleteProduct: async (productId) => {
        try {
            // Tùy chọn: Thêm xác nhận ở đây hoặc trong component gọi hàm
            // if (!window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
            //     throw new Error("Hủy thao tác xóa.");
            // }
            const token = localStorage.getItem('token');
            const response = await axios.delete(`${API_URL}/${productId}`, {
                headers: {
                    ...(token && { Authorization: `Bearer ${token}` })
                }
            });
            return response.data;
        } catch (error) {
            console.error(`Lỗi khi xóa sản phẩm ${productId}:`, error);
            throw error;
        }
    }
};

export default productService;