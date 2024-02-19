"use client";

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import {
    addImageSelectedUrlsBulk,
} from '@/redux/features/placeDetails-slice';

const useGetGoogleImages= () => {
    const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    const dispatch = useAppDispatch();
    const placeDetails = useAppSelector((state) => state.placeDetails.details);
    const baseUrlImage = `https://maps.googleapis.com/maps/api/place/photo?key=${googleMapsApiKey}&`;

    useEffect(() => {
        if (placeDetails?.photos) {
            const urls = placeDetails.photos
                .slice(0, Math.ceil(placeDetails.photos.length / 2))
                .map((photo) => {
                    return `${baseUrlImage}maxwidth=400&photoreference=${photo.photo_reference}`;
                });

            //for each urls, assign an id, so that it create an object with an id and an url for each of the urls
            const allUrls = urls.map((url, index) => {
                return {
                    id: Math.floor(Date.now() * (index + 1)),
                    url: url,
                };
            });

            dispatch(addImageSelectedUrlsBulk(allUrls));
        }
    }, [placeDetails, dispatch, baseUrlImage]);

    return {};
};

export default useGetGoogleImages;
