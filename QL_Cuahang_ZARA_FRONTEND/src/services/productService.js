// src/services/productService.js
import axios from 'axios';

const API_URL = 'http://localhost:8080/products';

export const getAllProducts = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data; // Trả về dữ liệu JSON
    } catch (error) {
        throw error;
    }
};