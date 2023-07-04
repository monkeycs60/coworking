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
	

	console.log(value);
	console.log(value?.value.place_id);

	useEffect(() => {
		const fetchAutocomplete = async () => {
			if (value?.label?.length) {
				console.log('value existe bien étape 1', value);
				const url = `/api/autocomplete?input=${value?.label}`;
				console.log('url', url);
				const res = await fetch(url);
				const data = await res.json();
				console.log('data de autocomplete', data);
			}
		};
		fetchAutocomplete();
	}, [value]);

	// useEffect(() => {
	// 	const fetchPlaceDetails = async () => {
	// 		if (value && value.value.place_id) {
	// 			const res = await fetch(
	// 				`/api/coworking?placeId=${value.value.place_id}`
	// 			);
	// 			const data = await res.json();
	// 			console.log('data du details', data);
	// 		}

	// 	};

	// 	fetchPlaceDetails();
	// }, [value]);

	// const googleMapsApiKey: string | undefined =
	// 	process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

	// if (!googleMapsApiKey) {
	// 	return <div>Missing Google Maps API Key</div>;
	// }
	return (
		<div>
			<input
				type='text'
				onChange={(e) => {
					console.log('ceci est le input change', e.target.value);
					setValue({
						value: { place_id: e.target.value },
						label: e.target.value,
					});
				}}
			/>
		</div>
	);
};

export default PlacesAutocomplete;
