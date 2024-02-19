'use client';

import { useEffect } from 'react';
import { usePlaceDetailsStore } from '@/zustand/stores/placeDetailsStore';

export const useFetchStorePlaceDetails = (placeId: string | null) => {
    const { details, setPlaceDetails, resetPlaceDetails } =
        usePlaceDetailsStore();

    console.log('details', details);

    useEffect(() => {
        const fetchPlaceDetails = async () => {
            if (!placeId) {
                resetPlaceDetails();
                return;
            }
            resetPlaceDetails();
            const res = await fetch(`/api/details?placeId=${placeId}`);
            const data = await res.json();

            setPlaceDetails(data.data.result);
        };

        fetchPlaceDetails();
    }, [placeId, resetPlaceDetails, setPlaceDetails]);
};
