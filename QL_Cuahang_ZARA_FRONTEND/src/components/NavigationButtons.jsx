import React from 'react'
import previcon from "../assets/svg/previcon.svg";
import nexticon from "../assets/svg/nexticon.svg";
import '../styles/BannerSlides.scss';

export default function NavigationButtons({ swiperRef }) {
    return (
        <>
            <button
                className="custom-prev"
                onClick={() => swiperRef.current?.slidePrev()}
                aria-label="Previous Slide"
            >
                <img src={previcon} alt="Previous" />
            </button>
            <button
                className="custom-next"
                onClick={() => swiperRef.current?.slideNext()}
                aria-label="Next Slide"
            >
                <img src={nexticon} alt="Next" />
            </button>
        </>
    )
}
