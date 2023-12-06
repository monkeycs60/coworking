'use client';

import Carousel from '@/components/ui/Carousel';
import CityCard from '../cards/CityCard';
import useCarousel from '@/hooks/useCarousel';
import { CityCount } from '@/types/highlightedCities';

interface CarouselWrapperProps {
    coworksByCities: CityCount[];
}

const CarouselWrapper = ({ coworksByCities }: CarouselWrapperProps) => {
    const { nextSlide, prevSlide, currentIndex } = useCarousel(10);

    return (
        <div className='flex gap-4'>
            <Carousel
                id={'highlightedCities'}
                nextSlide={nextSlide}
                prevSlide={prevSlide}
                currentIndex={currentIndex}
                isAtStart={currentIndex === 0}
                isAtEnd={currentIndex === coworksByCities.length - 4}
            >
                {coworksByCities.map((city, index) => (
                    <CityCard
                        carouselId={'highlightedCities'}
                        key={city.city}
                        highlightedCity={city}
                        currentIndex={index}
                    />
                ))}
            </Carousel>
        </div>
    );
};

export default CarouselWrapper;
