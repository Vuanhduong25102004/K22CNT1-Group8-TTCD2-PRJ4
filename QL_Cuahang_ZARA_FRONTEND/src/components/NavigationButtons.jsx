import React from 'react'
import previcon from "../assets/svg/previcon.svg";
import nexticon from "../assets/svg/nexticon.svg";
import '../styles/BannerSlides.scss';

export default function NavigationButtons({ swiperRefs }) {
    const slidePrev = () => {
        swiperRefs.forEach(ref => ref.current?.slidePrev());
    };

    const slideNext = () => {
        swiperRefs.forEach(ref => ref.current?.slideNext());
    };

    return (
        <>
            <button
                className="custom-prev"
                onClick={slidePrev}
                aria-label="Previous Slide"
            >
                <img src={previcon} alt="Previous" />
            </button>
            <button
                className="custom-next"
                onClick={slideNext}
                aria-label="Next Slide"
            >
                <img src={nexticon} alt="Next" />
            </button>
        </>
    );
}
