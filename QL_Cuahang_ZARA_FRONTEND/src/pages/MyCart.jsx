import React, { useEffect, useState } from 'react';
import HeaderComponents from '../components/HeaderComponents';
import ProductsListComponents from '../components/ProductsListComponents';
import { getMyCart, updateCartQuantity } from '../services/MyCartService';
import '../styles/MyCart.scss';

export default function MyCart() {
    const [cartItems, setCartItems] = useState([]);
    const [tongTien, setTongTien] = useState(0);
    const [maNguoiDung, setMaNguoiDung] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const handleQuantityChange = async (product, newQuantity) => {
        if (newQuantity < 1 || !maNguoiDung) return;

        console.log('Đã ấn nút thay đổi số lượng');
        console.log('Dữ liệu gửi lên:', {
            maNguoiDung,
            maSanPham: product.maSanPham,
            soLuongMoi: newQuantity
        });

        try {
            await updateCartQuantity(maNguoiDung, product.maSanPham, newQuantity);
            console.log('Cập nhật thành công, đang load lại giỏ hàng...');
            const data = await getMyCart();
            setCartItems(data.danhSachSanPham || []);
            setTongTien(data.tongTien || 0);
        } catch (error) {
            console.error("❌ Lỗi khi cập nhật số lượng:", error);
            alert("Không thể cập nhật số lượng. Vui lòng thử lại.");
        }
    };


    useEffect(() => {
        getMyCart()
            .then(data => {
                console.log("Dữ liệu từ API getMyCart:", data);
                setCartItems(data.danhSachSanPham || []);
                setTongTien(data.tongTien || 0);
                setMaNguoiDung(data.maNguoiDung); // lấy mã người dùng từ backend
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Lỗi khi lấy giỏ hàng:', error);
                setIsLoading(false);
            });
    }, []);

    return (
        <>
            <HeaderComponents />
            <main style={{ paddingTop: '320px' }}>
                <div className="container">
                    {isLoading ? (
                        <p>Đang tải dữ liệu...</p>
                    ) : cartItems.length === 0 ? (
                        <p>Không có sản phẩm nào trong giỏ hàng.</p>
                    ) : (
                        <div className="products-row">
                            {cartItems.map(product => (
                                <div key={product.maSanPham} className="product-card-wrapper">
                                    <div className="product-card-cart">
                                        <a href={`/product/${product.maSanPham}`}>
                                            <img
                                                src={`http://localhost:8080/images/${product.hinhAnh}`}
                                                alt={product.tenSanPham}
                                            />
                                        </a>
                                        <a href={`/product/${product.maSanPham}`}>
                                            <h3 className="truncate">{product.tenSanPham}</h3>
                                        </a>

                                        <p className="price">
                                            {product.gia?.toLocaleString('vi-VN', {
                                                style: 'currency',
                                                currency: 'VND'
                                            })} / 1 Chiếc
                                        </p>
                                        <p className="subtotal">
                                            Thành tiền:{' '}
                                            {product.thanhTien?.toLocaleString('vi-VN', {
                                                style: 'currency',
                                                currency: 'VND'
                                            })}
                                        </p>

                                        <div className="quantity-control">
                                            <button
                                                onClick={() => {
                                                    console.log("👈 Clicked [-] nút cho:", {
                                                        maNguoiDung,
                                                        maSanPham: product.maSanPham,
                                                        soLuongMoi: product.soLuong - 1
                                                    });
                                                    handleQuantityChange(product, product.soLuong - 1);
                                                }}
                                            >
                                                -
                                            </button>

                                            <span>{product.soLuong}</span>

                                            <button
                                                onClick={() => {
                                                    console.log("👉 Clicked [+] nút cho:", {
                                                        maNguoiDung,
                                                        maSanPham: product.maSanPham,
                                                        soLuongMoi: product.soLuong + 1
                                                    });
                                                    handleQuantityChange(product, product.soLuong + 1);
                                                }}
                                            >
                                                +
                                            </button>
                                        </div>

                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {!isLoading && cartItems.length > 0 && (
                    <div className="thanhtoan">
                        <div className="thanhtoan-wrapper">
                            <p className="ghichu">
                                Bằng cách tiếp tục, tôi tuyên bố rằng tôi đã đọc và chấp nhận các&nbsp;
                                <a href="#">Điều khoản Mua hàng</a> và tôi cũng đã hiểu rõ&nbsp;
                                <a href="#">Chính sách về Quyền riêng tư và Cookie</a> của Zara
                            </p>

                            <div className="thanhtoan-row">
                                <div className="thanhtoan-info">
                                    <p className="tong-label">TỔNG</p>
                                    <p className="tong-tien">
                                        {tongTien.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                    </p>
                                    <p className="vat-note">* Bao gồm thuế VAT</p>
                                </div>
                                <button className="btn-continue">TIẾP TỤC</button>
                            </div>
                        </div>
                    </div>
                )}

                <div className="tittle">
                    <h2><span>Có thể bạn quan tâm</span></h2>
                </div>
                <div className="productList">
                    <ProductsListComponents />
                </div>
            </main>
        </>
    );
}
