'use client';

import { useEffect, useState } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

type Option = {
	value: {
		place_id: string;
		[key: string]: any;
	};
	label: string;
};

const PlacesAutocomplete = () => {
	const [value, setValue] = useState<Option | null>(null);

	console.log(value);

	useEffect(() => {
		const fetchPlaceDetails = async () => {
			if (value) {
				const res = await fetch(
					`/api/coworking`
				);
				const data = await res.json();
				console.log('data du details', data);
			}
		};

		fetchPlaceDetails();
	}, [value]);

	const googleMapsApiKey: string | undefined =
		process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

	if (!googleMapsApiKey) {
		return <div>Missing Google Maps API Key</div>;
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
