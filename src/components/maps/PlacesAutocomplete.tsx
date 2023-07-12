'use client';

import AddPlace from '../addPlace/AddPlace';
import { ComboBox } from '../ui/combobox';
import { useAppSelector } from '@/hooks/useRedux';

const PlacesAutocomplete = () => {
	const placeDetails = useAppSelector((state) => state.placeDetails.details);

	return (
		<div>
			<ComboBox onSelect={(place) => console.log(place)} />
			{placeDetails && <AddPlace />}
		</div>
	);
};

export default PlacesAutocomplete;
