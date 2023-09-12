import { Coworking } from '@/types/coworking';

const CoworkingCard = ({ coworking }: { coworking: Coworking }) => {
    const defaultImage = '/cowork-placeholder.jpg';
    const imageUrl =
        coworking.imagesSelected && coworking.imagesSelected.length > 0
            ? coworking.imagesSelected[0].url
            : defaultImage;

    return (
        <div
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
        </div>
    );
};

export default CoworkingCard;
