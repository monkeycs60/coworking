'use client';

import Carousel from '@/components/ui/Carousel';
import CoworkingCard from '@/components/home/cards/coworkingCard/CoworkingCard';
import useCarousel from '@/hooks/useCarousel';
import { CoworkingListProps } from '@/types/highlightedCoworking';
import { useMediaQuery } from 'usehooks-ts';
import CarouselMobile from '@/components/ui/CarouselMobile';

const CarouselWrapper = ({ coworkings }: CoworkingListProps) => {
    const mobile = useMediaQuery('(max-width: 768px)');

    const { nextSlide, prevSlide, currentIndex } = useCarousel(10);
    const numberOfCoworkingsDisplayed = 4;

    return (
        <div className='flex gap-4'>
            {mobile ? (
                <CarouselMobile
                    id={'highlightedCoworkings'}
                    nextSlide={nextSlide}
                    prevSlide={prevSlide}
                    currentIndex={currentIndex}
                    isAtStart={currentIndex === 0}
                    isAtEnd={currentIndex === coworkings.length - 1}
                >
                    {coworkings.map((coworking) => (
                        <CoworkingCard
                            key={coworking.id}
                            coworking={coworking}
                        />
                    ))}
                </CarouselMobile>
            ) : (
                <Carousel
                    id={'highlightedCoworkings'}
                    nextSlide={nextSlide}
                    prevSlide={prevSlide}
                    currentIndex={currentIndex}
                    isAtStart={currentIndex === 0}
                    isAtEnd={
                        currentIndex ===
                        coworkings.length - numberOfCoworkingsDisplayed
                    }
                >
                    {coworkings.map((coworking) => (
                        <CoworkingCard
                            key={coworking.id}
                            coworking={coworking}
                        />
                    ))}
                </Carousel>
            )}
        </div>
    );
};

export default CarouselWrapper;
