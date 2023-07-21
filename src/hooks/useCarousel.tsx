import { useState } from 'react';
import { highlightedCoworkingsProps } from '@/types/highlightedCoworking';

const useCarousel = (length: number) => {
	const [currentIndex, setCurrentIndex] = useState(0);

	const nextSlide = () => {
		setCurrentIndex((prevIndex) => (prevIndex + 1) % length);
	};

	const prevSlide = () => {
		setCurrentIndex(
			(prevIndex) => (prevIndex - 1 + length) % length
		);
	};
	return {
		nextSlide,
		prevSlide,
		currentIndex,
	};
};

export default useCarousel;
