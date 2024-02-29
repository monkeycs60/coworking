'use client';

import { useEffect } from 'react';
import { usePlaceDetailsStore } from '@/zustand/stores/placeDetailsStore';

export const useFetchStorePlaceDetails = (placeId: string | null) => {
    const { setPlaceDetails, resetPlaceDetails } =
        usePlaceDetailsStore();

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
