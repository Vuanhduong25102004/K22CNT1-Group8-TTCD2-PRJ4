// pages/Home.js
import React, { useRef } from 'react';
import PrimaryBannerSlider from '../components/PrimaryBannerSlider';
import SecondaryBannerSlider from '../components/SecondaryBannerSlider';
import NavigationButtons from '../components/NavigationButtons';
import HeaderComponents from '../components/HeaderComponents';
import FooterComponents from '../components/FooterComponents';

import { slides, additionalSlides } from '../data/Sildes.jsx';

export default function Home() {
    const swiperRef1 = useRef(null);
    const swiperRef2 = useRef(null);

    return (
        <>
            <main style={{ paddingTop: '213px' }}>
                <HeaderComponents />

                {/* Slider chính */}
                <PrimaryBannerSlider slides={slides} onSwiper={swiper => (swiperRef1.current = swiper)} />

                {/* Nút điều khiển cho slider chính */}
                <NavigationButtons swiperRefs={[swiperRef1, swiperRef2]} />
                {/* Slider phụ */}
                <SecondaryBannerSlider slides={additionalSlides} onSwiper={swiper => (swiperRef2.current = swiper)} />

                <FooterComponents />
            </main>
        </>
    );
}