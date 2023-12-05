'use client';

import { useEffect, useState } from 'react';
import { PlaceDetail } from '@/types/placeDetails';
import { useFetch } from 'usehooks-ts';

export const useFetchPlaceDetailsSimple = (placeId: string | null) => {
    const [placeDetails, setPlaceDetails] = useState<PlaceDetail | null>(null);
    useEffect(() => {
        const fetchPlaceDetails = async () => {
            if (!placeId) {
                return;
            }

            const res = await fetch(`/api/details?placeId=${placeId}`);
            const {
                data: { result },
            } = await res.json();
            setPlaceDetails(result);
        };

        fetchPlaceDetails();
    }, [placeId]);
    return placeDetails;
};
