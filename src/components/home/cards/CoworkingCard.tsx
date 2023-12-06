'use client';

import { Progress } from '@/components/ui/progress';
import Image from 'next/image';
import { MapPin } from 'lucide-react';
import { useAppSelector } from '@/hooks/useRedux';
import { Star } from 'lucide-react';
import { CoworkingCardProps } from '@/types/highlightedCoworking';
import {
    averageRatingFromReviews,
    calmAverage,
    equipAverage,
    feelingAverage,
    foodAverage,
} from '@/lib/functions/averageRatingFromReviews';
import Link from 'next/link';
import Tooltip from '@mui/material/Tooltip';
import CustomWidthTooltip from '@/components/ui/CustomWidthTooltip';

interface CoworkingCardPropsExtended {
    carouselId: string;
    coworking: CoworkingCardProps;
    currentIndex: number;
}

const CoworkingCard = ({
    carouselId,
    coworking,
    currentIndex,
}: CoworkingCardPropsExtended) => {
    const activeIndex = useAppSelector(
        (state) => state.carouselState.activeIndices[carouselId],
    );

    const averageRating = averageRatingFromReviews(coworking.reviews);
    const averageRatingCalm = calmAverage(coworking.reviews);
    const averageRatingEquip = equipAverage(coworking.reviews);
    const averageRatingFeeling = feelingAverage(coworking.reviews);
    const averageRatingFood = foodAverage(coworking.reviews);

    const borderClass =
        activeIndex === currentIndex
            ? 'border-yellow-500 border-2'
            : 'border-gray-300 border-2';

    return (
        <Link
            href={`/explore/${coworking.city}/${encodeURIComponent(
                coworking.name,
            )}?coworkingId=${coworking.id}`}
            key={coworking.id}
            className={`relative flex h-[500px] w-[300px] cursor-pointer flex-col justify-between rounded-xl  transition-transform duration-500 ease-in-out  
			${borderClass}
			`}
        >
            <div className='absolute right-0 top-0 z-20 flex flex-col gap-1  rounded-xl px-4 py-2 backdrop-blur-xl'>
                <Star size={28} className=' text-secondary ' />
                <p className='font-semibold text-white'>{averageRating}</p>
            </div>
            <div className='relative h-[200px] w-full overflow-hidden rounded-xl object-cover'>
                <Image
                    src={coworking?.imagesSelected[0]?.url}
                    alt={coworking.name}
                    fill
                />
            </div>
            <div className='w-full p-2'>
                <h3 className='text-xl font-bold'>{coworking.name}</h3>
                <div className='flex gap-3 pt-2 text-gray-600'>
                    <MapPin size={20} />
                    <p className='line-clamp-1 text-sm'>{coworking.address}</p>
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
                        <CustomWidthTooltip
                            title='Le lieu est-il calme ? Y a-t-il de la musique ?...'
                            placement='top'
                            sx={{ '.MuiTooltip-tooltip': { padding: 1 } }}
                        >
                            <Progress value={averageRatingCalm * 20} />
                        </CustomWidthTooltip>
                    </div>
                    <div>
                        <span className='flex w-[60%] cursor-pointer pl-16 text-xs'>
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
                        <CustomWidthTooltip
                            title='Prises électriques ? Tables spacieuses ?...'
                            placement='top'
                            sx={{ '.MuiTooltip-tooltip': { padding: 1 } }}
                        >
                            <Progress value={averageRatingEquip * 20} />
                        </CustomWidthTooltip>
                    </div>
                    <div>
                        <span className='flex w-[60%] cursor-pointer pl-16 text-xs'>
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
                        <CustomWidthTooltip
                            title='Qualité des consos ? rapport qualité/prix ?...'
                            placement='top'
                            sx={{ '.MuiTooltip-tooltip': { padding: 1 } }}
                        >
                            <Progress value={averageRatingFood * 20} />
                        </CustomWidthTooltip>
                    </div>
                    <div>
                        <span className='flex w-[60%] cursor-pointer pl-16 text-xs'>
                            Food & drinks
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default CoworkingCard;
