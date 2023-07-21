'use client';

import { Button } from '@/components/ui/button';
import { highlightedCoworkings } from '@/data/highlightedCoworkings';
import { ArrowRight, ArrowLeft, MapPin } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';
import { Progress } from '@/components/ui/progress';
import useCarousel from '@/hooks/useCarousel';
import Carousel from '@/material/Carousel';

const HighlightedCoworkings = () => {
	
	const { nextSlide, prevSlide, currentIndex } = useCarousel(highlightedCoworkings);

	return (
		<section className='mt-8 flex h-[100dvh] flex-col gap-8 overflow-x-hidden px-4'>
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
			<div className='flex w-[4000px] gap-4'>
				<Carousel />
			</div>
			
		</section>
	);
};

export default HighlightedCoworkings;
