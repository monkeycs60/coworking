import { PartialCoworking } from '@/types/googleMaps';
import Link from 'next/link';

interface CoworkingCardProps {
    coworking: PartialCoworking;
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
            className='flex h-[300px] w-[30%] flex-col items-center gap-4 bg-cover bg-center text-center'
            style={{
                backgroundImage: `url(${imageUrl})`,
            }}
        >
            <div className='z-50 h-[160px] w-full space-y-3 bg-slate-400/80 text-white'>
                <p className='font-semibold'>{coworking.name}</p>
                <p className='text-sm'>{coworking.address}</p>
                <p className='line-clamp-4 text-sm'>{coworking.description}</p>
            </div>
        </Link>
    );
};

export default CoworkingCard;
