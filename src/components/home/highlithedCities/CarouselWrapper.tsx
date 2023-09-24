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
    console.log(coworksByCities);

    return (
        <div className='flex gap-4'>
            <Carousel
                id={'highlightedCities'}
                nextSlide={nextSlide}
                prevSlide={prevSlide}
                currentIndex={currentIndex}
                translateRate={12.3}
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
