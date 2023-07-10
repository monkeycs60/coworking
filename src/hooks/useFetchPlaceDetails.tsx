import { useEffect, useState } from 'react';

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
	const [placeDetail, setPlaceDetail] = useState<any | null>(null);

	useEffect(() => {
		const fetchPlaceDetails = async () => {
			if (!placeId) {
				return;
			}

			const res = await fetch(`/api/details?placeId=${placeId}`);
			const data = await res.json();

			setPlaceDetail(data);
			console.log('data detailed google place', data);
		};

		fetchPlaceDetails();
	}, [placeId]);

	return placeDetail;
};
