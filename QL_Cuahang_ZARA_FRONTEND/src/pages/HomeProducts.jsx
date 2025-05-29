import React from 'react'
import HeaderComponents from '../components/HeaderComponents';
import FooterComponents from '../components/FooterComponents';
import ProductsListComponents from '../components/ProductsListComponents'
import '../styles/HomeProduct.scss'


export default function HomeProducts() {
    return (
        <>
            <main style={{ paddingTop: '337px' }}>
                <HeaderComponents />
                <div className='mx-12 flex justify-center'>
                    <div>
                        <input type="text" placeholder='Bạn đang tìm kiếm gì ?' className='search-home-input' />
                    </div>
                </div>
                <div>
                    <ProductsListComponents />
                </div>
                <FooterComponents />
            </main>
        </>
    )
}
