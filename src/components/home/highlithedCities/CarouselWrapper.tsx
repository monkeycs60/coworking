'use client';

import Carousel from '@/components/ui/Carousel';
import CityCard from '../cards/CityCard';
import useCarousel from '@/hooks/useCarousel';
import { CityCount } from '@/types/highlightedCities';
import { useMediaQuery } from 'usehooks-ts';
import CarouselMobile from '@/components/ui/CarouselMobile';

interface CarouselWrapperProps {
    coworksByCities: CityCount[];
}

const CarouselWrapper = ({ coworksByCities }: CarouselWrapperProps) => {
    const mobile = useMediaQuery('(max-width: 768px)');

    const { nextSlide, prevSlide, currentIndex } = useCarousel(10);

    return (
        <div className='flex gap-4'>
            {mobile ? (
                <CarouselMobile
                    id={'highlightedCoworkings'}
                    nextSlide={nextSlide}
                    prevSlide={prevSlide}
                    currentIndex={currentIndex}
                    isAtStart={currentIndex === 0}
                    isAtEnd={currentIndex === coworksByCities.length - 1}
                >
                    {coworksByCities.map((city, index) => (
                        <CityCard
                            carouselId={'highlightedCities'}
                            key={city.city}
                            highlightedCity={city}
                            currentIndex={index}
                        />
                    ))}
                </CarouselMobile>
            ) : (
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
            )}
        </div>
    );
};

export default CarouselWrapper;
