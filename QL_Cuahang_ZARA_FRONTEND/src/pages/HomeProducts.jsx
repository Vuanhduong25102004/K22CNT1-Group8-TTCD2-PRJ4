import React, { useState, useEffect } from 'react';
import HeaderComponents from '../components/HeaderComponents';
import FooterComponents from '../components/FooterComponents';
import ProductsListComponents from '../components/ProductsListComponents';
import { getAllProducts } from '../services/productService';
import { getProductsByCategory } from '../services/productService';
import '../styles/HomeProduct.scss';

export default function HomeProducts() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getAllProducts()
            .then(setProducts)
            .catch(err => console.error('Lỗi khi tải sản phẩm:', err));
    }, []);

    return (
        <>
            <main style={{ paddingTop: '337px' }}>
                {/* Truyền hàm setProducts xuống Header */}
                <HeaderComponents onFilterByCategory={setProducts} />

                <div className='mx-12 flex justify-center'>
                    <div>
                        <input type="text" placeholder='Bạn đang tìm kiếm gì ?' className='search-home-input' />
                    </div>
                </div>

                {/* Truyền sản phẩm xuống ProductsList */}
                <div>
                    <ProductsListComponents products={products} />
                </div>

                <FooterComponents />
            </main>
        </>
    );
}
