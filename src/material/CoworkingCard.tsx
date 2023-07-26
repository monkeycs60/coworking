import { Progress } from '@/components/ui/progress';
import Image from 'next/image';
import { MapPin } from 'lucide-react';
import { highlightedCoworkingsProps } from '@/types/highlightedCoworking';
import { useAppSelector } from '@/hooks/useRedux';

interface CoworkingCardProps {
	highlightedCoworking: highlightedCoworkingsProps;
	currentIndex: number;
}

const CoworkingCard = ({
	highlightedCoworking,
	currentIndex,
}: CoworkingCardProps) => {
	const activeIndex = useAppSelector(
		(state) => state.carouselState.activeIndex
	);

	const borderClass =
		activeIndex === currentIndex
			? 'border-yellow-500 border-2'
			: 'border-gray-300 border-2';

	return (
		<div
			key={highlightedCoworking.id}
			className={`flex h-[420px] w-[300px] flex-col rounded-xl  transition-transform duration-500 ease-in-out  
			${borderClass}
			`}>
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
			<div>
				<div className='flex items-center justify-around gap-3 p-4'>
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
				<div className='flex items-center justify-around gap-3 p-4'>
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
				<div className='flex items-center justify-around gap-3 p-4'>
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
			</div>
		</div>
	);
};

export default CoworkingCard;
