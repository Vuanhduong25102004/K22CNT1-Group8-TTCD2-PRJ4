import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import '../styles/BannerSlides.scss';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import banner1 from "../assets/images/image-landscape-fit-59ad391b-fbd5-45b8-b2f0-a1fd28ec75d6-default_0.jpg";
import banner2 from "../assets/images/image-landscape-fit-d5e9b57a-20f9-47c2-a8e7-645434f96275-default_0.jpg";
import banner3 from "../assets/images/image-landscape-fit-350ea6a9-31b0-4fe4-b76c-fa91789c0564-default_0.jpg";
import supportText1 from '../assets/svg/supporttext1.svg';
import mancollectiontext from '../assets/svg/mancollectiontext.svg';



import { Autoplay, Navigation, Pagination } from 'swiper/modules';

const slides = [
    { id: 1, img: banner1, svg: supportText1 },
    { id: 2, img: banner2, svg: supportText1 },
    { id: 3, img: banner3, svg: mancollectiontext },
];

export default function BannerSlider({ onSwiper }) {

    return (
        <div className="slider-wrapper">
            <Swiper
                onSwiper={onSwiper}
                spaceBetween={30}
                slidesPerView={1}
                loop={true}
                pagination={false}
                navigation={false}
                autoplay={{ delay: 4000, disableOnInteraction: false }}
                speed={1000}
                modules={[Autoplay]}
            >
                {slides.map(slide => (
                    <SwiperSlide key={slide.id}>
                        <img src={slide.img} alt="" className="banner-img" />
                        <img
                            src={slide.svg}
                            alt="overlay svg"
                            className="svg-overlay"
                        />
                        <div className="slide-text">{slide.text}</div>
                    </SwiperSlide>
                ))}
            </Swiper>

        </div>
    );
}
