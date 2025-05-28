// components/SecondaryBannerSlider.js
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import '../styles/BannerSlides.scss';
import 'swiper/css';
import 'swiper/css/autoplay';
import { Autoplay } from 'swiper/modules';
import ImageSwitcher from './ImageSwitcher';

export default function SecondaryBannerSlider({ slides, onSwiper }) {
    return (
        <div className="slider-wrapper">
            <Swiper
                onSwiper={onSwiper}
                spaceBetween={30}
                slidesPerView={1}
                loop={true}
                autoplay={{ delay: 8000, disableOnInteraction: false }}
                speed={1000}
                modules={[Autoplay]}
            >
                {slides.map((slide) => (
                    <SwiperSlide key={`secondary-slide-${slide.id}`}>
                        {Array.isArray(slide.img) ? (
                            <ImageSwitcher images={slide.img} interval={7500} />
                        ) : (
                            <img src={slide.img} alt="" className="banner-img" />
                        )}
                        <img src={slide.svg} alt="overlay svg" className="svg-overlay" />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}