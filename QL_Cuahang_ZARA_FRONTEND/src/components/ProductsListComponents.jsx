import React, { useEffect, useState } from 'react';
import { getAllProducts } from '../services/productService';
import { Link } from 'react-router-dom';
import '../styles/ProductsList.scss';

export default function ProductsListComponents({ products }) {
    if (!products || !products.length) return <div>Không có sản phẩm nào</div>;

    return (
        <div className="products-container">
            {products.map(product => (
                <Link
                    key={product.maSanPham}
                    to={`/product/${product.maSanPham}`}
                    className="product-link"
                >
                    <div className="product-card">
                        <img src={`http://localhost:8080/images/${product.hinhAnh}`} alt={product.tenSanPham} />
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