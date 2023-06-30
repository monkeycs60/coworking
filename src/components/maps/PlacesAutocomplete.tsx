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
	

	return (
		<div>
			<GooglePlacesAutocomplete
				apiKey={googleMapsApiKey}
				selectProps={{
					value,
					onChange: (newValue: Option | null) => setValue(newValue),
				}}
			/>
		</div>
	);
};

export default PlacesAutocomplete;
