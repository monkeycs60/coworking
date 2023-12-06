import { Star } from 'lucide-react';

interface RatingDisplayProps {
    averageRating: string | 0;
}

const RatingDisplay = ({ averageRating }: RatingDisplayProps) => (
    <div className='absolute right-0 top-0 z-20 flex flex-col gap-1 rounded-xl px-4 py-2 backdrop-blur-xl'>
        <Star size={28} className='text-secondary' />
        <p className='font-semibold text-white'>{averageRating}</p>
    </div>
);

export default RatingDisplay;
