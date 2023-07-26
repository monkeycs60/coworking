import useCarousel from '@/hooks/useCarousel';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import React from 'react';

interface CarouselProps {
	children?: React.ReactNode;
}

const Carousel = ({ children }: CarouselProps) => {
	const { nextSlide, prevSlide, currentIndex } = useCarousel(React.Children.count(children));

	return (
		<div className='flex flex-col gap-4'>
			<div className='flex gap-4'
				style={{
					transform: `translateX(-${currentIndex * 9.8}%)`,
					transition: 'transform 0.5s ease-in-out',
				}}
			>{children}</div>
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
		</div>
	);
};

export default Carousel;
