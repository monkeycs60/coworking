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
    }

    const defaultImage = '/cowork-placeholder.jpg';

    return (
        <div>
            <div className='flex justify-between'>
                <p>{coworking?.name}</p>
                <div>
                    <p>{coworking?.address}</p>
                    <p>{coworking?.phoneNumber}</p>
                </div>
            </div>
            <div>
                <div className='flex gap-12 bg-black'>
                    <Image
                        src={coworking?.userImages[0].url || defaultImage}
                        width={500}
                        height={500}
                        className='rounded-lg object-cover'
                        alt={'coucou'}
                    />
                    <Image
                        src={coworking?.imagesSelected[0]?.url || defaultImage}
                        width={500}
                        height={500}
                        className='rounded-lg object-cover'
                        alt={'hello'}
                    />
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
