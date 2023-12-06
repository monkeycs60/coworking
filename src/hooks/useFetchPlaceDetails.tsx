'use client';

import { PlaceDetailResponse } from '@/types/placeDetails';
import { useFetch } from 'usehooks-ts';

export const useFetchPlaceDetails = (placeId: string | null) => {
    const { data, error } = useFetch<PlaceDetailResponse>(
        `/api/details?placeId=${placeId}`,
    );
    if (error) return <p>Il y a une erreur dans le chargement des données</p>;
    if (!data) return <p>Chargement en cours...</p>;

    return data.data.result;
};
