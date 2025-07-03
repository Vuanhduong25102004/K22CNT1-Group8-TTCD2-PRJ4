import React, { useEffect, useState } from 'react';
import { getAllProducts } from '../services/productService';
import { Link } from 'react-router-dom';
import '../styles/ProductsList.scss';

export default function ProductsListComponents() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getAllProducts()
            .then(data => {
                setProducts(data);
                setLoading(false);
            })
            .catch(() => {
                setError('Lỗi khi tải sản phẩm');
                setLoading(false);
            });
    }, []);

    // Hàm để cuộn trang lên đầu
    const handleProductClick = () => {
        window.scrollTo(0, 0);  // Cuộn lên đầu trang
    };

    if (loading) return <div>Đang tải sản phẩm...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="products-container">
            {products.map(product => (
                <Link
                    key={product.maSanPham}   // Dùng maSanPham làm key
                    to={`/product/${product.maSanPham}`}  // Dùng maSanPham làm param
                    className="product-link"
                    onClick={handleProductClick}
                >
                    <div className="product-card">
                        <img
                            src={`http://localhost:8080/images/${product.hinhAnh}`}
                            alt={product.tenSanPham}
                        />
                        <h3>{product.tenSanPham}</h3>
                        <p className="price">
                            {product.gia.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                        </p>
                    </div>
                </Link>
            ))}
        </div>
    );
}
