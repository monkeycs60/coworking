import { Progress } from '@/components/ui/progress';
import useCarousel from '@/hooks/useCarousel';
import { highlightedCoworkings } from '@/data/highlightedCoworkings';
import Image from 'next/image';
import { MapPin } from 'lucide-react';



import { highlightedCoworkingsProps } from '@/types/highlightedCoworking';

const CoworkingCard = ({highlightedCoworking: highlightedCoworkingsProps, currentIndex: number}) => {
	return (
		<div
			key={highlightedCoworking.id}
			className={`flex h-[420px] w-[300px] flex-col rounded-xl bg-red-300 transition-transform duration-500 ease-in-out`}
			style={{ transform: `translateX(${-currentIndex * 104}%)` }}>
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
