import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { Star } from '@phosphor-icons/react';
import {
	setCalmRating,
	setEquipmentRating,
	setFoodAndDrinksRating,
} from '@/redux/features/placeDetails-slice';

interface StarRatingProps {
	type: 'calm' | 'equipment' | 'foodAndDrinks';
}

const StarRating = ({ type }: StarRatingProps) => {
	const dispatch = useAppDispatch();
	const ratings = useAppSelector((state) => state.placeDetails.ratings);

	const handleStarClick = (rating: number) => {
		switch (type) {
			case 'calm':
				dispatch(setCalmRating(rating));
				break;
			case 'equipment':
				dispatch(setEquipmentRating(rating));
				break;
			case 'foodAndDrinks':
				dispatch(setFoodAndDrinksRating(rating));
				break;
		}
	};

	return (
		<div className='flex'>
			{[1, 2, 3, 4, 5].map((starNumber) => (
				<div
					key={starNumber}
					onMouseEnter={() => handleStarClick(starNumber)}>
					<Star
                    className='cursor-pointer'
						size={32}
						weight={
							starNumber <= (ratings[type] ?? 0) ? 'fill' : 'regular'
						}
						onClick={() => handleStarClick(starNumber)}
					/>
				</div>
			))}
		</div>
	);
};

export default StarRating;
