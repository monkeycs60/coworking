'use client';

import { useRef, useState } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';


const PlacesAutocomplete = () => {
 

	const googleMapsApiKey: string | undefined =
		process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

	if (!googleMapsApiKey) {
		return <div>Missing Google Maps API Key</div>;
	}


	

	return (
		<div>
			<GooglePlacesAutocomplete
				apiKey={googleMapsApiKey}
			/>
		</div>
	);
};

export default PlacesAutocomplete;
