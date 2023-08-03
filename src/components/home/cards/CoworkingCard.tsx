'use client';

import { Progress } from '@/components/ui/progress';
import Image from 'next/image';
import { MapPin } from 'lucide-react';
import { highlightedCoworkingsProps } from '@/types/highlightedCoworking';
import { useAppSelector } from '@/hooks/useRedux';
import { Star } from 'lucide-react';
import { Tooltip } from 'react-tooltip';

interface CoworkingCardProps {
	carouselId: string;
	highlightedCoworking: highlightedCoworkingsProps;
	currentIndex: number;
}

const CoworkingCard = ({
	carouselId,
	highlightedCoworking,
	currentIndex,
}: CoworkingCardProps) => {
	const activeIndex = useAppSelector(
		(state) => state.carouselState.activeIndices[carouselId]
	);

	const borderClass =
		activeIndex === currentIndex
			? 'border-yellow-500 border-2'
			: 'border-gray-300 border-2';

	return (
		<div
			key={highlightedCoworking.id}
			className={`relative flex h-[460px] w-[300px] flex-col rounded-xl  transition-transform duration-500 ease-in-out  
			${borderClass}
			`}>
			<div className='absolute right-4 top-4 flex flex-col gap-1 px-4 py-2 backdrop-blur-xl'>
				<Star size={28} className=' text-secondary' />
				<p className='font-semibold'>
					{(
						(highlightedCoworking.calmScore +
							highlightedCoworking.equipmentScore +
							highlightedCoworking.foodScore) /
						3
					).toFixed(2)}
				</p>
			</div>
			<div
				className='h-1/2 w-full rounded-xl'
				style={{
					backgroundImage: `url(${highlightedCoworking.illustration})`,
					backgroundPosition: 'center',
				}}></div>
			<div className='w-full p-2'>
				<h3 className='text-xl font-bold'>{highlightedCoworking.name}</h3>
				<div className='flex gap-3 pt-2 text-gray-600'>
					<MapPin size={20} />
					<p className=''>
						{highlightedCoworking.location}, {highlightedCoworking.city}
					</p>
				</div>
			</div>
			<div className='mb-4'>
				<div className='flex flex-col justify-center'>
					<div className='flex items-center justify-around gap-3 px-4 pt-2'>
						<div className='flex h-[30px] w-[30px] items-center justify-center '>
							<Image
								src={'/ambiance.svg'}
								alt='ambiance'
								width={30}
								height={30}
							/>
						</div>
						<Progress value={highlightedCoworking.calmScore * 20} />
					</div>
					<div>
						<span
							className='flex w-[60%] cursor-pointer pl-16 text-xs'
							data-tooltip-id='calm-tooltip'
							data-tooltip-content='Le lieu est-il calme ? Y a-t-il de la musique ?...'
							data-tooltip-place='top'>
							Calme
						</span>
					</div>
				</div>
				<div className='flex flex-col justify-center'>
					<div className='flex items-center justify-around gap-3 px-4 pt-2'>
						<div className='flex h-[30px] w-[30px] items-center justify-center '>
							<Image
								src={'/plug.png'}
								alt='equipement'
								width={17}
								height={10}
							/>
						</div>
						<Progress value={highlightedCoworking.equipmentScore * 20} />
					</div>
					<div>
						<span
							className='flex w-[60%] cursor-pointer pl-16 text-xs'
							data-tooltip-id='equipement-tooltip'
							data-tooltip-content='Prises électriques ? Tables spacieuses ?...'
							data-tooltip-place='top'>
							Equipement
						</span>
					</div>
				</div>
				<div className='flex flex-col justify-center'>
					<div className='flex items-center justify-around gap-3 px-4 pt-2'>
						<div className='flex h-[30px] w-[30px] items-center justify-center '>
							<Image
								src={'/food-drink.png'}
								alt='boisson et nourriture'
								width={30}
								height={30}
							/>
						</div>
						<Progress value={highlightedCoworking.foodScore * 20} />
					</div>
					<div>
						<span
							className='flex w-[60%] cursor-pointer pl-16 text-xs'
							data-tooltip-id='food-tooltip'
							data-tooltip-content='Qualité des consos ? rapport qualité/prix ?...'
							data-tooltip-place='top'>
							Food & drinks
						</span>
					</div>
				</div>
			</div>
			<Tooltip id='calm-tooltip' />
			<Tooltip id='equipement-tooltip' />
			<Tooltip id='food-tooltip' />
		</div>
	);
};

export default CoworkingCard;
