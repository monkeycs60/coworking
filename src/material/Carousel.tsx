import useCarousel from '@/hooks/useCarousel';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import React from 'react';

interface CarouselProps {
	children?: React.ReactNode;
}

const Carousel = ({ children }: CarouselProps) => {
	const { nextSlide, prevSlide } = useCarousel(
		React.Children.count(children)
	);
	return (
		<>
			{children}
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
