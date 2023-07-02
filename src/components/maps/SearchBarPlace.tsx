'use client';

import React, { useState } from 'react';
import { GoogleMap, LoadScript, Autocomplete } from '@react-google-maps/api';

const SearchBarPlace = () => {
	const [map, setMap] = useState(null);
	const [autocomplete, setAutocomplete] =
		useState<google.maps.places.Autocomplete | null>(null);

	const onLoad = (autocomplete: google.maps.places.Autocomplete) => {
		console.log('autocomplete: ', autocomplete);
		setAutocomplete(autocomplete);
	};

	const onPlaceChanged = () => {
		if (autocomplete !== null) {
			console.log(autocomplete.getPlace());
		} else {
			console.log('Autocomplete is not loaded yet!');
		}
	};

	const googleMapsApiKey = process.env
		.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string;

        const libraries = ['places'] as Array<'places'>;

	return (
		<LoadScript libraries={libraries} googleMapsApiKey={googleMapsApiKey}>
				<Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
					<input
						type='text'
						placeholder='Search Location'
						style={{
							boxSizing: `border-box`,
							border: `1px solid transparent`,
							width: `240px`,
							height: `32px`,
							padding: `0 12px`,
							borderRadius: `3px`,
							boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
							fontSize: `14px`,
							outline: `none`,
							textOverflow: `ellipses`,
							position: 'absolute',
							left: '50%',
							marginLeft: '-120px',
						}}
					/>
				</Autocomplete>
		</LoadScript>
	);
};

export default SearchBarPlace;
