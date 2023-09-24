'use client';

import { useAppSelector } from '@/hooks/useRedux';
import { CityCount } from '@/types/highlightedCities';
import Image from 'next/image';
import { cityImageMap, defaultCityImage } from '@/lib/const/cityImageMap';

interface CityCardProps {
    carouselId: string;
    highlightedCity: CityCount;
    currentIndex: number;
}

const CityCard = ({
    carouselId,
    highlightedCity,
    currentIndex,
}: CityCardProps) => {
    const activeIndex = useAppSelector(
        (state) => state.carouselState.activeIndices[carouselId],
    );

    const borderClass =
        activeIndex === currentIndex
            ? 'border-yellow-500 border-2'
            : 'border-gray-300 border-2';

    let imageUrl = defaultCityImage; // valeur par défaut

    console.log(defaultCityImage);

    if (highlightedCity.city in cityImageMap) {
        imageUrl =
            cityImageMap[highlightedCity.city as keyof typeof cityImageMap];
    }

    console.log(imageUrl);

    return (
        <div
            key={highlightedCity.city}
            style={{
                backgroundImage: `url(${imageUrl})`,
                backgroundPosition: 'center',
            }}
            className={`flex h-[420px] w-[300px] flex-col justify-end rounded-xl transition-transform duration-500 ease-in-out  
			${borderClass}
			`}
        >
            <div className='m-6 flex flex-col items-center justify-center gap-6 border-[1px] px-6 py-4 text-black  backdrop-blur-md'>
                <h3 className='text-2xl font-bold'>{highlightedCity.city}</h3>
                <div className='flex justify-between gap-6'>
                    {/* <div className='flex items-end justify-center gap-2'>
						<Image
							src={'/members.svg'}
							alt='members'
							width={24}
							height={24}
						/>
						<p>{highlightedCity.members}</p>
					</div> */}
                    <div className='flex items-end justify-center gap-2'>
                        <Image
                            src={'/buildings.svg'}
                            alt='coworkings'
                            width={30}
                            height={30}
                        />
                        <p className='text-black'>{highlightedCity.count}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CityCard;
