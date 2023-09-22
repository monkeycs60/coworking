'use client';

import { highlightedCoworkings } from '@/data/highlightedCoworkings';
import Carousel from '@/components/ui/Carousel';
import CoworkingCard from '@/components/home/cards/CoworkingCard';
import useCarousel from '@/hooks/useCarousel';
import { CoworkingListProps } from '@/types/highlightedCoworking';

const CarouselWrapper = ({ coworkings }: CoworkingListProps) => {
    const { nextSlide, prevSlide, currentIndex } = useCarousel(
        highlightedCoworkings.length,
    );
    console.log(coworkings);

    return (
        <div className='flex gap-4'>
            <Carousel
                id={'highlightedCoworkings'}
                nextSlide={nextSlide}
                prevSlide={prevSlide}
                currentIndex={currentIndex}
                translateRate={9.8}
            >
                {coworkings.map((coworking, index) => (
                    <CoworkingCard
                        carouselId={'highlightedCoworkings'}
                        key={coworking.id}
                        coworking={coworking}
                        currentIndex={index}
                    />
                ))}
            </Carousel>
        </div>
    );
};

export default CarouselWrapper;
