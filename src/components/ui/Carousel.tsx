'use client';

import { ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import React, { useEffect } from 'react';
import { useAppDispatch } from '@/hooks/useRedux';
import { setActiveIndex } from '@/redux/features/carouselState-slice';

interface CarouselProps {
	id: string;
	children?: React.ReactNode;
	nextSlide: () => void;
	prevSlide: () => void;
	currentIndex: number;
	translateRate: number;
}

const Carousel = ({
	id,
	children,
	nextSlide,
	prevSlide,
	currentIndex,
	translateRate
}: CarouselProps) => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(setActiveIndex({ carouselId: id, index: currentIndex }));
	}, [currentIndex, dispatch, id]);

	return (
		<div className='flex flex-col gap-4'>
			<div
				className='flex gap-4'
				style={{
					transform: `translateX(-${currentIndex * translateRate}%)`,
					transition: 'transform 0.5s ease-in-out',
				}}>
				{children}
			</div>
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
