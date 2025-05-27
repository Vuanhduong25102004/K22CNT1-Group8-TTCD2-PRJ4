import React, { useRef } from 'react';
import BannerSlider from '../components/BannerSlider'
import NavigationButtons from '../components/NavigationButtons';
import HeaderComponents from '../components/HeaderComponents';
import FooterComponents from '../components/FooterComponents';

export default function Home() {
    const swiperRef = useRef(null);

    return (
        <>
            <main style={{ paddingTop: '213px' }}>
                <HeaderComponents />
                <div>
                    <BannerSlider onSwiper={swiper => (swiperRef.current = swiper)} />
                    <NavigationButtons
                        swiperRef={swiperRef}
                    />
                </div>
                <FooterComponents />
            </main>
        </>
    )
}
