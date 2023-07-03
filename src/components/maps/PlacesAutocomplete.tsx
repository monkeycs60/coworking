'use client';

import { useEffect, useState } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import React from 'react';

type Option = {
	value: {
		place_id: string;
		[key: string]: any;
	};
	label: string;
};

const PlacesAutocomplete = () => {
	const [value, setValue] = useState<Option | null>(null);
	// const [value, setValue] = useState<Option | null>({
	// 	value: { place_id: '' },
	// 	label: '',
	// });


	console.log(value);
	console.log(value?.value.place_id);
	

	useEffect(() => {
		const fetchPlaceDetails = async () => {
			if (value && value.value.place_id) {
				const res = await fetch(
					`/api/coworking?placeId=${value.value.place_id}`
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
				onLoadFailed={(error) =>
					console.error('Could not inject Google script MERRRRDE', error)
				}
				minLengthAutocomplete={3}
			/>
		</div>
	);
};

export default PlacesAutocomplete;
