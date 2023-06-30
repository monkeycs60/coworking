'use client';

import { useRef, useState } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

type Option = {
	value: string;
	label: string;
};

const PlacesAutocomplete = () => {
	const [value, setValue] = useState<Option | null>(null);

	const googleMapsApiKey: string | undefined =
		process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

	if (!googleMapsApiKey) {
		return <div>Missing Google Maps API Key</div>;
	}

	console.log(value);

	if (value) {
		fetch(
			`https://maps.googleapis.com/maps/api/place/details/json?place_id=${value.value}&fields=geometry&key=${googleMapsApiKey}`
		)
			.then((response) => response.json())
			.then((data) => console.log('data du details', data));
	}

	return (
		<div>
			<GooglePlacesAutocomplete
				apiKey={googleMapsApiKey}
				selectProps={{
					value,
					onChange: (newValue: Option | null) => setValue(newValue),
				}}
				debounce={2000}
				minLengthAutocomplete={3}
			/>
		</div>
	);
};

export default PlacesAutocomplete;
