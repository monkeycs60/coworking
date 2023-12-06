'use client';

import Image from 'next/image';
import { MapPin } from 'lucide-react';
import { useAppSelector } from '@/hooks/useRedux';
import { CoworkingCardProps } from '@/types/highlightedCoworking';
import {
    averageRatingFromReviews,
    calmAverage,
    equipAverage,
    feelingAverage,
    foodAverage,
} from '@/lib/functions/averageRatingFromReviews';
import Link from 'next/link';
import CoworkingFeature from './CoworkingFeature';
import RatingDisplay from './RatingDisplay';

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
            className={`relative flex h-[500px] w-[300px] cursor-pointer flex-col justify-between rounded-xl transition-transform duration-500 ease-in-out ${borderClass}`}
        >
            <RatingDisplay averageRating={averageRating} />
            <div className='relative h-[200px] w-full overflow-hidden rounded-xl object-cover'>
                <Image
                    src={coworking.imagesSelected[0]?.url}
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
                <CoworkingFeature
                    icon='/ambiance.svg'
                    alt='Calme'
                    title='Le lieu est-il calme ? Y a-t-il de la musique ?...'
                    value={calmAverage(coworking.reviews)}
                />
                <CoworkingFeature
                    icon='/plug.png'
                    alt='Equipement'
                    title='Prises électriques ? Tables spacieuses ?...'
                    value={equipAverage(coworking.reviews)}
                    imgWidth={17}
                    imgHeight={10}
                />
                <CoworkingFeature
                    icon='/food-drink.png'
                    alt='Food & Drinks'
                    title='Qualité des consos ? rapport qualité/prix ?...'
                    value={foodAverage(coworking.reviews)}
                />
            </div>
        </Link>
    );
};

export default CoworkingCard;
