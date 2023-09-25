'use client';

import { useState } from 'react';

const useCarousel = (length: number) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false); // to avoid too many images switches by spamming arrows

    const nextSlide = () => {
        if (!isAnimating) {
            setIsAnimating(true);
            setCurrentIndex((prevIndex) => (prevIndex + 1) % length);
            setTimeout(() => setIsAnimating(false), 400); // durée de la transition
        }
    };

    const prevSlide = () => {
        if (!isAnimating) {
            setIsAnimating(true);
            setCurrentIndex((prevIndex) => (prevIndex - 1 + length) % length);
            setTimeout(() => setIsAnimating(false), 400);
        }
    };
    return {
        nextSlide,
        prevSlide,
        currentIndex,
        setCurrentIndex,
    };
};

export default useCarousel;
