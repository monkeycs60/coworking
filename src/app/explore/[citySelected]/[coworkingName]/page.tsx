import { Plug2, ParkingSquare, Trees, Coffee, Check } from 'lucide-react';
import Map from '@/components/explore/Map';
import { getOneCoworkingInfos } from '@/services/getOneCoworkingInfos';
import Image from 'next/image';

const page = async ({
    searchParams,
}: {
    searchParams: { coworkingId: string };
}) => {
    const coworkingId = searchParams.coworkingId;

    const coworking = await getOneCoworkingInfos(coworkingId);
    const coworkingCenter = {
        lat: coworking?.latitude as number,
        lng: coworking?.longitude as number,
    };
    const coworkingLocation = {
        lat: coworking?.latitude as number,
        lng: coworking?.longitude as number,
        name: coworking?.name as string,
    };

    const defaultImage = '/cowork-placeholder.jpg';

    return (
        <div className='my-16 flex flex-col gap-10'>
            <div className='font flex justify-between'>
                <p className='text-4xl font-bold'>{coworking?.name}</p>
                <div className='flex flex-col items-end text-lg'>
                    <p>{coworking?.address}</p>
                    <p>{coworking?.phoneNumber}</p>
                </div>
            </div>
            <div>
                <div className='flex h-[440px] items-center justify-center gap-12 bg-gray-400'>
                    <div className='relative h-[400px] w-[45%] '>
                        <Image
                            src={coworking?.userImages[0]?.url || defaultImage}
                            fill
                            className='object-cover'
                            alt={'coucou'}
                        />
                    </div>
                    <div className='flex h-[400px] w-[45%] flex-col gap-4'>
                        <div className='relative h-[200px] w-full'>
                            <Image
                                src={
                                    coworking?.imagesSelected[0]?.url ||
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
                                    coworking?.imagesSelected[1]?.url ||
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
                <h3>Commodités sur place</h3>
                <div>
                    {coworking?.hasPrivacy && (
                        <div className='flex gap-4'>
                            <Check />
                            <span> Espace privé</span>
                        </div>
                    )}
                    {coworking?.hasParking && (
                        <div className='flex gap-4'>
                            <Check />
                            <span> Parking</span>
                        </div>
                    )}
                    {coworking?.hasExterior && (
                        <div className='flex gap-4'>
                            <Check />
                            <span>Espace extérieur</span>
                        </div>
                    )}
                </div>
            </div>
            <div>
                <p>{coworking?.description}</p>
            </div>
            <div>
                <Map
                    centerOfMap={coworkingCenter}
                    coworkingLocations={[coworkingLocation]}
                    zoom={14}
                    height='300px'
                    width='60%'
                    key={coworkingId}
                />
            </div>
        </div>
    );
};

export default page;
