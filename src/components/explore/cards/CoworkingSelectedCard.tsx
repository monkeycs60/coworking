import {
    Plug2,
    ParkingSquare,
    Trees,
    Coffee,
    Check,
    Star,
    StarHalf,
} from 'lucide-react';
import Map from '@/components/explore/Map';
import Image from 'next/image';
import { Coworking } from '@/types/coworking';
import Characteristics from './CoworkingSelectedCard/Characteristics';

const CoworkingSelectedCard = ({ coworking }: { coworking: Coworking }) => {
    const defaultImage = '/cowork-placeholder.jpg';
    const coworkingCenter = {
        lat: coworking?.latitude as number,
        lng: coworking?.longitude as number,
    };
    const coworkingLocation = {
        lat: coworking?.latitude as number,
        lng: coworking?.longitude as number,
        name: coworking?.name as string,
    };
    return (
        <div className='my-16 flex flex-col gap-10'>
            <div className='font flex justify-between'>
                <p className='font-inter text-4xl font-semibold'>
                    {coworking?.name}
                </p>
                <div className='flex flex-col items-end text-lg'>
                    <p>{coworking?.address}</p>
                    <p>{coworking?.phoneNumber}</p>
                </div>
            </div>
            <div>
                <div className='flex h-[440px] items-center justify-center gap-12 bg-gray-400'>
                    <div className='relative h-[400px] w-[45%] '>
                        <Image
                            src={
                                coworking?.userImages?.[0]?.url || defaultImage
                            }
                            fill
                            className='object-cover'
                            alt={'coucou'}
                        />
                    </div>
                    <div className='flex h-[400px] w-[45%] flex-col gap-4'>
                        <div className='relative h-[200px] w-full'>
                            <Image
                                src={
                                    coworking?.imagesSelected?.[0]?.url ||
                                    defaultImage
                                }
                                fill
                                className='object-cover'
                                alt={'hello'}
                            />
                        </div>
                        <div className='relative h-[200px] w-full'>
                            <Image
                                src={
                                    coworking?.imagesSelected?.[1]?.url ||
                                    defaultImage
                                }
                                fill
                                className='object-cover'
                                alt={'hello'}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <p>{coworking?.description}</p>
            </div>
            <Characteristics coworking={coworking} />
            <div>
                <Map
                    centerOfMap={coworkingCenter}
                    coworkingLocations={[coworkingLocation]}
                    zoom={14}
                    height='300px'
                    width='60%'
                    key={coworking.id}
                />
            </div>
            <div className='flex flex-wrap gap-8'>
                {coworking.reviews.map((review) => {
                    function formatDateForFrenchLocale(
                        isoDateString: string,
                    ): string {
                        const date = new Date(isoDateString);
                        const options: Intl.DateTimeFormatOptions = {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                        };
                        return new Intl.DateTimeFormat('fr-FR', options).format(
                            date,
                        );
                    }

                    const imageUrl = review.user?.image || defaultImage; // Fallback to a default image
                    const username = review.user?.username || 'Anonymous';
                    const averageRating =
                        (review.calmRating +
                            review.equipRating +
                            review.foodRating +
                            review.feelingRating) /
                        4;

                    return (
                        <div
                            className='flex flex-col gap-8 rounded-xl bg-gray-200 p-6'
                            key={review.id}
                        >
                            <div className='flex  items-center justify-between'>
                                <div className='flex items-center gap-4'>
                                    <div className='relative h-[60px] w-[60px] rounded-2xl'>
                                        <Image
                                            src={imageUrl}
                                            alt={username}
                                            fill
                                            className='rounded-2xl object-cover'
                                        />
                                    </div>
                                    <p>{username}</p>
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
                                <div className='flex justify-end'>
                                    <p>
                                        {formatDateForFrenchLocale(
                                            review.createdAt.toISOString(),
                                        )}
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default CoworkingSelectedCard;
