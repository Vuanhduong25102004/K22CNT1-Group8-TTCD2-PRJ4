import React, { useRef } from 'react';
import BannerSlider from '../components/BannerSlider'
import NavigationButtons from '../components/NavigationButtons';

export default function Home() {
    const swiperRef = useRef(null);

    return (
        <>
            <div>
                <BannerSlider onSwiper={swiper => (swiperRef.current = swiper)} />
                <NavigationButtons
                    swiperRef={swiperRef}
                />
            </div>
        </>
    )
}
