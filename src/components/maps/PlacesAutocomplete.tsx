'use client';

import { ComboBox } from '../ui/combobox';

const PlacesAutocomplete = () => {
	return (
		<div>
			<ComboBox onSelect={(place) => console.log(place)} />
		</div>
	);
};

export default PlacesAutocomplete;
