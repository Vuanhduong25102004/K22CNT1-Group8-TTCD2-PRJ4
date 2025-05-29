import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import HeaderComponents from './HeaderComponents';
import FooterComponents from './FooterComponents';
import ProductsListComponents from './ProductsListComponents';

export default function ProductDetail() {
    const { id } = useParams(); // id thực ra là maSanPham theo route
    // Nếu muốn rõ ràng hơn, đổi route thành /product/:maSanPham và dùng:
    // const { maSanPham } = useParams();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:8080/products/${id}`)  // id là maSanPham
            .then(res => {
                setProduct(res.data);
                setLoading(false);
            })
            .catch(() => {
                setError('Không tìm thấy sản phẩm');
                setLoading(false);
            });
    }, [id]);

    if (loading) return <div>Đang tải sản phẩm...</div>;
    if (error) return <div>{error}</div>;
    if (!product) return null;

    return (
        <>
            <HeaderComponents />
            <div style={{ padding: 20 }}>
                <h1>{product.tenSanPham}</h1>
                <img
                    src={`http://localhost:8080/images/${product.hinhAnh}`}
                    alt={product.tenSanPham}
                    style={{ width: 400, height: 300, objectFit: 'cover', borderRadius: 8 }}
                />
                <p>{product.moTa}</p>
                <p style={{ fontWeight: 'bold', fontSize: 20 }}>
                    {product.gia.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                </p>
            </div>
            <ProductsListComponents />
            <FooterComponents />
        </>
    );
}
