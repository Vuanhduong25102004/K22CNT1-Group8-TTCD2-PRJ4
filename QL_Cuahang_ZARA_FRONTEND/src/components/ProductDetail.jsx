import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import '../styles/ProductDetail.scss'
import HeaderComponents from './HeaderComponents';
import FooterComponents from './FooterComponents';
import ProductsListComponents from './ProductsListComponents';

export default function ProductDetail() {
    const { id } = useParams();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:8080/products/${id}`)
            .then(res => {
                setProduct(res.data);
                setLoading(false);
            })
            .catch(() => {
                setError('Không tìm thấy sản phẩm');
                setLoading(false);
            });
    }, [id]);

    // Hàm để lấy maNguoiDung từ JWT token
    const getMaNguoiDungFromToken = () => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwtDecode(token);
            return decodedToken.maNguoiDung;
        }
        return null;
    };

    const HandleBuy = () => {
        const maNguoiDung = getMaNguoiDungFromToken();
        if (!maNguoiDung) {
            alert("Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng");
            return;
        }

        const maSanPham = product.maSanPham;
        const soLuong = 1;

        // Lấy token JWT từ localStorage
        const token = localStorage.getItem('token');
        console.log("Token JWT:", token);

        // Gửi yêu cầu POST tới API giỏ hàng
        axios.post('http://localhost:8080/giohang/add', {
            maNguoiDung: maNguoiDung,
            maSanPham: maSanPham,
            soLuong: soLuong
        }, {
            headers: {
                'Authorization': `Bearer ${token}`  // Gửi token trong header Authorization
            }
        })
            .then(response => {
                alert("Sản phẩm đã được thêm vào giỏ hàng");
            })
            .catch(error => {
                console.error("Đã xảy ra lỗi khi thêm vào giỏ hàng", error);
                alert("Có lỗi khi thêm sản phẩm vào giỏ hàng");
            });
    };

    if (loading) return <div>Đang tải sản phẩm...</div>;
    if (error) return <div>{error}</div>;
    if (!product) return null;

    return (
        <>
            <HeaderComponents />
            <div className='product-detail'>
                <div className='product-img'>
                    <img
                        src={`http://localhost:8080/images/${product.hinhAnh}`}
                        alt={product.tenSanPham}
                    />
                </div>
                <div className='product-info'>
                    <h1>{product.tenSanPham}</h1>
                    <p>
                        {product.gia.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                    </p>
                    <hr />
                    <p>{product.moTa}</p>
                    <button className='btnaddtocart' onClick={HandleBuy}>Thêm</button>
                </div>
            </div>
            <div className='tittle'>
                <h2><span>Có thể bạn quan tâm</span></h2>
            </div>
            <ProductsListComponents />
            <FooterComponents />
        </>
    );
}
