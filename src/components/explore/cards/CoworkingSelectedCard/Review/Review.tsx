import { Star } from 'lucide-react';
import Image from 'next/image';
import { Review } from '@/types/coworking';
const Review = ({
    review,
    defaultImage,
}: {
    review: Review;
    defaultImage: string;
}) => {
    function formatDateForFrenchLocale(isoDateString: string): string {
        const date = new Date(isoDateString);
        const options: Intl.DateTimeFormatOptions = {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        };
        return new Intl.DateTimeFormat('fr-FR', options).format(date);
    }

    const imageUrl = review.user?.image || defaultImage; // Fallback to a default image
    const username = review.user?.username || 'Anonymous';
    const name = review.user?.firstName || 'Anonymous';

    const averageRating =
        (review.calmRating +
            review.equipRating +
            review.foodRating +
            review.feelingRating) /
        4;

    return (
        <div
            className='flex flex-col gap-6 rounded-xl bg-gray-200 p-4'
            key={review.id}
        >
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-4'>
                    <div className='relative h-[40px] w-[40px] rounded-2xl'>
                        <Image
                            src={imageUrl}
                            alt={name}
                            fill
                            className='rounded-2xl object-cover'
                        />
                    </div>
                    <p className='font-semibold'>{username}</p>
                </div>
                <div className='flex items-center gap-1'>
                    <Star strokeWidth={1.25} fill={'black'} />
                    <p>{averageRating}</p>
                </div>
            </div>
            <p>{review.content}</p>
            <div className='flex'>
                <div className='flex flex-wrap gap-1 text-xs'>
                    <span className='w-[40%]'>
                        Calme {review.calmRating}/5{' '}
                    </span>
                    <span className='w-[40%]'>
                        Equipement {review.equipRating}/5{' '}
                    </span>
                    <span className='w-[40%]'>
                        Restauration {review.foodRating}/5{' '}
                    </span>
                    <span className='w-[40%]'>
                        Ressenti {review.feelingRating}/5{' '}
                    </span>
                </div>
                <div className='flex justify-end text-sm'>
                    <p>
                        {formatDateForFrenchLocale(
                            review.createdAt.toISOString(),
                        )}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Review;
