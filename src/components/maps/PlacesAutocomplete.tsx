'use client';

import AddPlace from '../ajouter-spot/AddPlace';
import { ComboBox } from '../ui/combobox';
import { useAppSelector } from '@/hooks/useRedux';

const PlacesAutocomplete = () => {
	const placeDetails = useAppSelector((state) => state.placeDetails.details);

	return (
		<div className='m-auto'>
			<ComboBox onSelect={(place) => console.log(place)} />
			{placeDetails && <AddPlace />}
		</div>
	);
};

export default PlacesAutocomplete;
