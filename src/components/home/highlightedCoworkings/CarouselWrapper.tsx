'use client';

import Carousel from '@/components/ui/Carousel';
import CoworkingCard from '@/components/home/cards/coworkingCard/CoworkingCard';
import useCarousel from '@/hooks/useCarousel';
import { CoworkingListProps } from '@/types/highlightedCoworking';

const CarouselWrapper = ({ coworkings }: CoworkingListProps) => {
    const { nextSlide, prevSlide, currentIndex } = useCarousel(10);
    const numberOfCoworkingsDisplayed = 4;

    return (
        <div className='flex gap-4'>
            <Carousel
                id={'highlightedCoworkings'}
                nextSlide={nextSlide}
                prevSlide={prevSlide}
                currentIndex={currentIndex}
                isAtStart={currentIndex === 0}
                isAtEnd={currentIndex === coworkings.length - numberOfCoworkingsDisplayed}
            >
                {coworkings.map((coworking) => (
                    <CoworkingCard key={coworking.id} coworking={coworking} />
                ))}
            </Carousel>
        </div>
    );
};

export default CarouselWrapper;
