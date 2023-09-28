import { PartialCoworking } from '@/types/googleMaps';
import Link from 'next/link';

interface CoworkingCardProps {
    coworking: PartialCoworking;
    city: string;
}

const CoworkingCard = ({ coworking, city }: CoworkingCardProps) => {
    const defaultImage = '/cowork-placeholder.jpg';
    console.log(coworking);

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
            className='flex h-[300px] w-full  flex-col items-center gap-4 rounded-xl bg-cover bg-center text-center lg:w-[31%] '
            style={{
                backgroundImage: `url(${imageUrl})`,
            }}
        >
            <div className='z-50 h-[160px] w-full space-y-3 rounded-xl bg-slate-400/80 pt-2 text-white'>
                <p className='font-semibold'>{coworking.name}</p>
                <p className='text-sm'>{coworking.address}</p>
                <p className='line-clamp-2 text-sm lg:line-clamp-4'>
                    {coworking.description}
                </p>
            </div>
        </Link>
    );
};

export default CoworkingCard;
