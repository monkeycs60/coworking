import { getOneCoworkingInfos } from '@/services/getOneCoworkingInfos';
import Image from 'next/image';

const page = async ({
    searchParams,
}: {
    searchParams: { coworkingId: string };
}) => {
    const coworkingId = searchParams.coworkingId;

    const coworking = await getOneCoworkingInfos(coworkingId);
    console.log(coworking);

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
                <div>
                    <Image
                        src={coworking?.imagesSelected[0]?.url || defaultImage}
                        width={500}
                        height={500}
                        className='rounded-lg object-cover'
                        alt={'hello'}
                    />
                    <Image
                        src={coworking?.userImages[0].url || defaultImage}
                        width={500}
                        height={500}
                        className='rounded-lg object-cover'
                        alt={'coucou'}
                    />
                </div>
            </div>
        </div>
    );
};

export default page;
