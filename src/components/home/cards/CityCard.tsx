'use client';

import { highlightedCitiesProps } from '@/types/highlightedCities';
import { useAppSelector } from '@/hooks/useRedux';
import Image from 'next/image';

interface CityCardProps {
	carouselId: string;
	highlightedCity: highlightedCitiesProps;
	currentIndex: number;
}

const CityCard = ({
	carouselId,
	highlightedCity,
	currentIndex,
}: CityCardProps) => {
	const activeIndex = useAppSelector(
		(state) => state.carouselState.activeIndices[carouselId]
	);

	const borderClass =
		activeIndex === currentIndex
			? 'border-yellow-500 border-2'
			: 'border-gray-300 border-2';

	return (
		<div
			key={highlightedCity.id}
			style={{
				backgroundImage: `url(${highlightedCity.image})`,
				backgroundPosition: 'center',
			}}
			className={`flex h-[420px] w-[300px] flex-col justify-end rounded-xl transition-transform duration-500 ease-in-out  
			${borderClass}
			`}>
			<div className='m-6 flex flex-col items-center justify-center gap-6 border-[1px] px-6 py-4 text-white backdrop-blur-md'>
				<h3 className='text-2xl font-bold'>{highlightedCity.cityName}</h3>
				<div className='flex justify-between gap-6'>
					<div className='flex items-end justify-center gap-2'>
						<Image
							src={'/members.svg'}
							alt='members'
							width={24}
							height={24}
						/>
						<p>{highlightedCity.members}</p>
					</div>
					<div className='flex items-end justify-center gap-2'>
						<Image
							src={'/buildings.svg'}
							alt='coworkings'
							width={30}
							height={30}
						/>
						<p>{highlightedCity.coworkings}</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CityCard;