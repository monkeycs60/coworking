import { Star } from 'lucide-react';

interface RatingDisplayProps {
    averageRating: string | 0;
}

const RatingDisplay = ({ averageRating }: RatingDisplayProps) => (
    <div className='absolute right-0 top-0 z-20 flex flex-col gap-1 rounded-xl px-3 py-1 backdrop-blur-xl lg:px-4 lg:py-2'>
        <Star size={28} className='text-secondary' />
        <p className='font-semibold text-white'>{averageRating}</p>
    </div>
);

export default RatingDisplay;
