import { Button } from '@/components/ui/button';
import Carousel from '@/components/ui/Carousel';
import { highlightedCities } from '@/data/highlightedCities';
import CityCard from '../cards/CityCard';
import useCarousel from '@/hooks/useCarousel';

const CarouselWrapper = () => {
    const { nextSlide, prevSlide, currentIndex } = useCarousel(
        highlightedCities.length,
    );
    return (
        <div className='flex gap-4'>
            <Carousel
                id={'highlightedCities'}
                nextSlide={nextSlide}
                prevSlide={prevSlide}
                currentIndex={currentIndex}
                translateRate={12.3}
            >
                {highlightedCities.map((city, index) => (
                    <CityCard
                        carouselId={'highlightedCities'}
                        key={city.id}
                        highlightedCity={city}
                        currentIndex={index}
                    />
                ))}
            </Carousel>
        </div>
    );
};

export default CarouselWrapper;
