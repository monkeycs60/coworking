'use client';

import { Button } from '@/components/ui/button';
import { highlightedCoworkings } from '@/data/highlightedCoworkings';
import Carousel from '@/components/ui/Carousel';
import CoworkingCard from '@/components/home/cards/CoworkingCard';
import useCarousel from '@/hooks/useCarousel';

const HighlightedCoworkings = () => {
	const { nextSlide, prevSlide, currentIndex } = useCarousel(
		highlightedCoworkings.length
	);
	return (
		<section className='my-[5vh] flex flex-col gap-8 overflow-x-hidden px-4 lg:h-[100vh]'>
			<div>
				<h2 className='text-2xl font-bold'>
					Récemment dénichés par la communauté
				</h2>
				<h3 className='text-sm text-gray-700 lg:w-[75%] lg:text-base 3xl:text-lg'>
					Découvrez les derniers lieux ajoutés par nos membres
				</h3>
			</div>
			<Button
				variant={'default'}
				size={'sm'}
				className='w-full lg:w-auto 3xl:px-6 3xl:py-3'>
				<span>Explorer tous les coworkings</span>
			</Button>
			<div className='flex gap-4'>
				<Carousel
					id={'highlightedCoworkings'}
					nextSlide={nextSlide}
					prevSlide={prevSlide}
					currentIndex={currentIndex}
					translateRate={9.8}>
					{highlightedCoworkings.map((coworking, index) => (
						<CoworkingCard
							carouselId={'highlightedCoworkings'}
							key={coworking.id}
							highlightedCoworking={coworking}
							currentIndex={index}
						/>
					))}
				</Carousel>
			</div>
		</section>
	);
};

export default HighlightedCoworkings;
