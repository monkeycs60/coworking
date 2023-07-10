import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from './useRedux';
import {
	setPlaceDetails,
	resetPlaceDetails,
} from '@/redux/features/placeDetails-slice';

interface Photo {
	height: number;
	html_attributions: string[];
}

interface FullPlaceDatas {
	result: {
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
	};
}

export interface PlaceDetail {
	data: FullPlaceDatas;
}

export const useFetchPlaceDetails = (placeId: string | null) => {
	const dispatch = useAppDispatch();
	const details = useAppSelector((state) => state);

	useEffect(() => {
		const fetchPlaceDetails = async () => {
			if (!placeId) {
				dispatch(resetPlaceDetails());
				return;
			}

			const res = await fetch(`/api/details?placeId=${placeId}`);
			const data = await res.json();

			dispatch(setPlaceDetails(data.data.result));
			console.log('data detailed google place', data);
			console.log('redux selector', details);
		};

		fetchPlaceDetails();
	}, [placeId, dispatch]);
};
