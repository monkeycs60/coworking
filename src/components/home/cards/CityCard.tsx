'use client';

import { useAppSelector } from '@/hooks/useRedux';
import { CityCount } from '@/types/highlightedCities';
import Image from 'next/image';
import { cityImageMap, defaultCityImage } from '@/lib/const/cityImageMap';
import Link from 'next/link';

interface CityCardProps {
    carouselId: string;
    highlightedCity: CityCount;
    currentIndex: number;
    isAtStart?: boolean;
    isAtEnd?: boolean;
}

const CityCard = ({
    carouselId,
    highlightedCity,
    currentIndex,
    isAtStart,
    isAtEnd,

}: CityCardProps) => {
    let imageUrl = defaultCityImage; // valeur par défaut

    if (highlightedCity.city in cityImageMap) {
        imageUrl =
            cityImageMap[highlightedCity.city as keyof typeof cityImageMap];
    }

    return (
        <Link
            href={`/explore/${highlightedCity.city}`}
            key={highlightedCity.city}
            style={{
                backgroundImage: `url(${imageUrl})`,
                backgroundPosition: 'center',
            }}
            className={`flex h-[420px] w-[300px] cursor-pointer flex-col justify-end rounded-xl transition-transform duration-300 ease-in-out hover:scale-105 hover:border-yellow-500 focus:scale-105
			`}
        >
            <div className='m-6 flex flex-col items-center justify-center gap-2 border-[1px] px-6 py-4 text-white  backdrop-blur-md'>
                <h3 className='text-2xl font-semibold'>
                    {highlightedCity.city}
                </h3>
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
                        <p className=''>{highlightedCity.count}</p>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default CityCard;
