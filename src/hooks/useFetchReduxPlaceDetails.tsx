'use client';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './useRedux';
import {
    setPlaceDetails,
    resetPlaceDetails,
} from '@/redux/features/placeDetails-slice';

export const useFetchReduxPlaceDetails = (placeId: string | null) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const fetchPlaceDetails = async () => {
            if (!placeId) {
                dispatch(resetPlaceDetails());
                return;
            }
            dispatch(resetPlaceDetails());

            const res = await fetch(`/api/details?placeId=${placeId}`);
            const data = await res.json();

            dispatch(setPlaceDetails(data.data.result));
        };

        fetchPlaceDetails();
    }, [placeId, dispatch]);
};
