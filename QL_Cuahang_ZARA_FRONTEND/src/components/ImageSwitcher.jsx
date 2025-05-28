// components/ImageSwitcher.js
import React, { useState, useEffect } from 'react';

export default function ImageSwitcher({ images, interval = 2000 }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [fade, setFade] = useState(true);

    useEffect(() => {
        if (!images || images.length <= 1) return;

        const timer = setInterval(() => {
            setFade(false);
            setTimeout(() => {
                setCurrentIndex((prev) => (prev + 1) % images.length);
                setFade(true);
            }, 500);
        }, interval);

        return () => clearInterval(timer);
    }, [images, interval]);

    return (
        <img
            src={images[currentIndex]}
            alt="slide"
            className={`banner-img ${fade ? 'fade-in' : 'fade-out'}`}
            style={{ transition: 'opacity 0.5s ease-in-out' }}
        />
    );
}