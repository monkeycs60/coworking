import { Coworking } from '@/types/coworking';
import Link from 'next/link';
import { convertFacilityName } from '@/lib/functions/convertFacilityName';

interface CoworkingCardProps {
    coworking: Coworking;
    city: string;
}

const CoworkingCard = ({ coworking, city }: CoworkingCardProps) => {
    const defaultImage = '/cowork-placeholder.jpg';

    const imageUrl =
        coworking.imagesSelected && coworking.imagesSelected.length > 0
            ? coworking.imagesSelected[0].url
            : defaultImage;

    return (
        <Link
            href={{
                pathname: `/explore/${city}/${coworking.name}`,
                query: { coworkingId: coworking.id },
            }}
            key={coworking.id}
            className='relative flex h-[300px] w-full flex-col items-center gap-4 rounded-xl bg-cover bg-center text-center lg:w-[31%] '
            style={{
                backgroundImage: `url(${imageUrl})`,
            }}
        >
            <div className='z-50 flex h-[160px] w-full flex-col justify-center space-y-3 rounded-xl bg-primary/80 p-2 text-white '>
                <div className='flex flex-col gap-2'>
                    <p className='line-clamp-1 font-semibold'>
                        {coworking.name}
                    </p>
                </div>
                <p className='line-clamp-3 text-sm'>{coworking.description}</p>
            </div>
            {coworking.facility && (
                <p className='absolute bottom-0 left-0 rounded-bl-xl rounded-tr-xl bg-secondary px-4 py-2 text-sm font-bold text-black'>
                    {convertFacilityName(coworking.facility)}
                </p>
            )}
        </Link>
    );
};

export default CoworkingCard;
