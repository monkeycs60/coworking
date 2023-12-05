'use client';

import { useEffect, useState } from 'react';
import { useFetch } from 'usehooks-ts';

export const useFetchPlaceDetailsSimple = (placeId: string | null) => {
    const [placeDetails, setPlaceDetails] = useState(null);
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
