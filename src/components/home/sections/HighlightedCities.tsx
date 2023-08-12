'use client';

import { Button } from '@/components/ui/button';
import Carousel from '@/components/ui/Carousel';
import { highlightedCities } from '@/data/highlightedCities';
import CityCard from '../cards/CityCard';
import useCarousel from '@/hooks/useCarousel';

const HighlightedCities = () => {
	const { nextSlide, prevSlide, currentIndex } = useCarousel(
		highlightedCities.length
	);
	return (
		<section className='my-[5vh] flex flex-col gap-8 overflow-x-hidden px-4 lg:my-20'>
			<div className='flex flex-col gap-8 lg:flex-row lg:justify-between '>
				<div className='flex flex-col gap-4'>
					<h2 className='text-2xl font-bold'>
						Déjà 40 lieux référencés dans 5 villes
					</h2>
					<h3 className='text-base text-gray-700 lg:w-[75%] lg:text-base 3xl:text-lg'>
						Tous les jours, nous partons à la conquête de de nouveaux
						lieux pour vous proposer une nouvelle manière de travailler.
					</h3>
				</div>
				<Button
					variant={'default'}
					size={'sm'}
					className='w-full lg:h-12 lg:w-[320px] lg:px-4'>
					<span>Découvrez une nouvelle ville</span>
				</Button>
			</div>
			<div className='flex gap-4'>
				<Carousel
					id={'highlightedCities'}
					nextSlide={nextSlide}
					prevSlide={prevSlide}
					currentIndex={currentIndex}
					translateRate={12.3}>
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
		</section>
	);
};

export default HighlightedCities;
