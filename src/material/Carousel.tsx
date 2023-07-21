import useCarousel from '@/hooks/useCarousel';
import { highlightedCoworkings } from '@/data/highlightedCoworkings';
import { highlightedCoworkingsProps } from '@/types/highlightedCoworking';
import { Progress } from '@/components/ui/progress';
import { ArrowRight, ArrowLeft, MapPin } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import CoworkingCard from './CoworkingCard';


const Carousel = (
    medias: highlightedCoworkingsProps[],
) => {
    const { nextSlide, prevSlide, currentIndex } = useCarousel(highlightedCoworkings.length);
	return (
		<>
			{highlightedCoworkings.map((coworking, currentIndex) => (
				<CoworkingCard
					key={coworking.id}
					highlightedCoworking={coworking}
					currentIndex={currentIndex}
				/>
			))}
			<div className='flex gap-4'>
				<Button
					variant={'round'}
					size={'sm'}
					className='rounded-[28px] bg-defaultWhite text-gray-600'
					onClick={prevSlide}>
					<ArrowLeft />
				</Button>
				<Button
					variant={'round'}
					size={'sm'}
					className='rounded-[28px] bg-primary text-defaultWhite'
					onClick={nextSlide}>
					<ArrowRight />
				</Button>
			</div>
		</>
	);
};

export default Carousel;
