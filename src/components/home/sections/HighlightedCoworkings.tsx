'use client';

import { Button } from '@/components/ui/button';
import { highlightedCoworkings } from '@/data/highlightedCoworkings';
import { ArrowRight, ArrowLeft, MapPin } from 'lucide-react';
import { useState } from 'react';

const HighlightedCoworkings = () => {
	const [currentIndex, setCurrentIndex] = useState(0);

	const nextSlide = () => {
		setCurrentIndex(
			(prevIndex) => (prevIndex + 1) % highlightedCoworkings.length
		);
	};

	const prevSlide = () => {
		setCurrentIndex(
			(prevIndex) =>
				(prevIndex - 1 + highlightedCoworkings.length) %
				highlightedCoworkings.length
		);
	};
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
				{highlightedCoworkings.map((coworking, index) => (
					<div
						key={coworking.id}
						className={`flex h-[300px] w-[300px] flex-col rounded-xl bg-red-300 transition-transform duration-500 ease-in-out`}
						style={{ transform: `translateX(${-currentIndex * 104}%)` }}>
						<div
							className='h-1/2 w-full rounded-xl'
							style={{
								backgroundImage: `url(${coworking.illustration})`,
								backgroundPosition: 'center',
							}}></div>
						<div className='h-1/2 w-full p-2'>
							<h3 className='text-xl font-bold'>{coworking.name}</h3>
							<div className='flex gap-3 pt-2 text-gray-600'>
								<MapPin size={20} />
								<p className=''>
									{coworking.location}, {coworking.city}
								</p>
							</div>
						</div>
					</div>
				))}
			</div>
			<div className='flex gap-6'>
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
		</section>
	);
};

export default HighlightedCoworkings;
