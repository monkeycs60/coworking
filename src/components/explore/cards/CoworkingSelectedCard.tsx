import Map from '@/components/explore/Map';
import Image from 'next/image';
import { Coworking } from '@/types/coworking';
import Characteristics from './CoworkingSelectedCard/Characteristics';
import Review from './CoworkingSelectedCard/Review';
import OpeningSchedule from './CoworkingSelectedCard/OpeningSchedule';
import CreateReview from './CoworkingSelectedCard/CreateReview';

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
    console.log(coworking.address);

    return (
        <div className='my-16 flex flex-col gap-10'>
            <div className='font flex items-center justify-between'>
                <div className='flex flex-col gap-4'>
                    <p className='font-inter text-4xl font-semibold'>
                        {coworking?.name}
                    </p>
                    <div className='flex flex-col text-lg'>
                        <p>{coworking?.address}</p>
                        <p>{coworking?.phoneNumber}</p>
                    </div>
                </div>
                <CreateReview
                    placeId={coworking?.placeId || ''}
                    coworkingId={coworking?.id || ''}
                />
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
            <div className='flex flex-wrap gap-8'>
                {coworking?.reviews?.map((review) => (
                    <Review
                        key={review.id}
                        review={review}
                        defaultImage={defaultImage}
                    />
                ))}
            </div>
            <div className='flex items-center justify-between'>
                <OpeningSchedule coworking={coworking} />
                <Map
                    centerOfMap={coworkingCenter}
                    coworkingLocations={[coworkingLocation]}
                    zoom={14}
                    height='300px'
                    width='500px'
                    key={coworking.id}
                />
            </div>
        </div>
    );
};

export default CoworkingSelectedCard;
