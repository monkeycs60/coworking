'use client';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './useRedux';
import {
	setPlaceDetails,
	resetPlaceDetails,
} from '@/redux/features/placeDetails-slice';

interface Photo {
	height: number;
	html_attributions: string[];
	photo_reference: string;
	width: number;
}

export interface PlaceDetail {
	geometry: {
		location: {
			lat: number;
			lng: number;
		};
	};
	name: string;
	rating: number;
	editorial_summary: {
		overview: string;
	};
	icon: string;
	adr_address: string;
	photos: Photo[];
	place_id: string;
}

export const useFetchPlaceDetails = (placeId: string | null) => {
	const dispatch = useAppDispatch();
	const details = useAppSelector((state) => state);
	console.log(details);

	useEffect(() => {
		const fetchPlaceDetails = async () => {
			if (!placeId) {
				dispatch(resetPlaceDetails());
				return;
			}

			const res = await fetch(`/api/details?placeId=${placeId}`);
			const data = await res.json();

			dispatch(setPlaceDetails(data.data.result));
		};

		fetchPlaceDetails();
	}, [placeId, dispatch]);
};
