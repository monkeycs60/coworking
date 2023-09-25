import Map from '@/components/explore/Map';
import Image from 'next/image';
import { Coworking } from '@/types/coworking';
import Characteristics from './CoworkingSelectedCard/Characteristics';
import Review from './CoworkingSelectedCard/Review/Review';
import OpeningSchedule from './CoworkingSelectedCard/OpeningSchedule';
import CreateReview from './CoworkingSelectedCard/Review/CreateReview';
import { averageRatingFromReviews } from '@/lib/functions/averageRatingFromReviews';
import { Star } from 'lucide-react';
import CoffeeBox from './CoworkingSelectedCard/CoffeeBox';
import Carousel from './CoworkingSelectedCard/Carousel/Carousel';

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

    const coworkingReviews = coworking?.reviews;
    let coworkingAverageRating;
    if (coworkingReviews)
        coworkingAverageRating = averageRatingFromReviews(coworkingReviews);

    const expressoPrice = coworking?.espressoPrice || 0;

    const imagesSelected = coworking?.imagesSelected || defaultImage;
    const userImages = coworking?.userImages || defaultImage;

    return (
        <div className='mb-12 mt-2 flex flex-col gap-8 px-6 lg:my-16 lg:gap-16 lg:p-0'>
            <div className='font flex flex-col-reverse items-center justify-between gap-3 lg:flex-row lg:gap-0'>
                <div className='flex flex-col gap-4'>
                    <p className='font-inter text-4xl font-semibold'>
                        {coworking?.name}
                    </p>
                    <div className='flex flex-col text-base'>
                        <p>{coworking?.address}</p>
                        <p>{coworking?.phoneNumber}</p>
                    </div>
                </div>
                <div className='flex w-full items-center justify-between gap-4 lg:w-auto lg:flex-col lg:justify-center'>
                    <div className='flex items-center gap-2'>
                        <span className='text-xl font-bold'>
                            {coworkingAverageRating}
                        </span>
                        <Star fill='#FFC107' className='h-6 w-6' />
                        <span>({coworkingReviews?.length})</span>
                    </div>
                    <CreateReview
                        placeId={coworking?.placeId || ''}
                        coworkingId={coworking?.id || ''}
                    />
                </div>
            </div>
            <Carousel
                imagesSelected={imagesSelected}
                userImages={userImages}
                defaultImage={defaultImage}
            />
            <div className='flex flex-col items-center justify-between gap-6 lg:h-[100px] lg:flex-row lg:gap-0'>
                <div className='flex h-full w-full flex-col gap-2 lg:w-[75%] lg:gap-1'>
                    <h3 className='font-semibold'>Description</h3>
                    <p>{coworking?.description}</p>
                </div>
                <CoffeeBox expressoPrice={expressoPrice} />
            </div>
            <Characteristics coworking={coworking} />
            <div className='flex flex-col items-center justify-between lg:flex-row'>
                <OpeningSchedule coworking={coworking} />
                <div className='flex flex-col gap-4'>
                    <Map
                        centerOfMap={coworkingCenter}
                        coworkingLocations={[coworkingLocation]}
                        zoom={14}
                        height='300px'
                        width='500px'
                        key={coworking.id}
                        coworkAdress={coworking.address}
                    />
                    <span className='text-center text-sm'>
                        {coworking?.address}
                    </span>
                </div>
            </div>
            <div className='flex flex-wrap gap-8'>
                {coworking?.reviews?.map((review) => (
                    <Review
                        key={review.id}
                        review={review}
                        defaultImage={defaultImage}
                    />
                ))}
            </div>
        </div>
    );
};

export default CoworkingSelectedCard;
