'use client';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { addImageSelectedUrlsBulk } from '@/redux/features/placeDetails-slice';
import { useAddCoworkingStore } from '@/zustand/stores/coworkingStore';
import { usePlaceDetailsStore } from '@/zustand/stores/placeDetailsStore';

const useGetGoogleImages = () => {
    const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    const dispatch = useAppDispatch();
    const { uploadedImages, updateStep } = useAddCoworkingStore();
    const { details: placeDetails } = usePlaceDetailsStore();
    const baseUrlImage = `https://maps.googleapis.com/maps/api/place/photo?key=${googleMapsApiKey}&`;

    console.log('placeDetails :', placeDetails);

    const reloadImages = () => {
        if (placeDetails?.photos) {
            const urls = placeDetails.photos
                .slice(0, Math.ceil(placeDetails.photos.length / 2))
                .map((photo) => {
                    return `${baseUrlImage}maxwidth=400&photoreference=${photo.photo_reference}`;
                });

            //for each urls, assign an id, so that it create an object with an id and an url for each of the urls
            const allUrls = urls.map((url, index) => {
                return url;
            });

            console.log('allUrls :', allUrls);

            updateStep(2, { ...uploadedImages, imageSelectedUrls: allUrls });
        }
    };

    useEffect(() => {
        if (
            placeDetails?.photos &&
            uploadedImages.imageSelectedUrls.length === 0
        ) {
            const urls = placeDetails.photos
                .slice(0, Math.ceil(placeDetails.photos.length / 2))
                .map((photo) => {
                    return `${baseUrlImage}maxwidth=400&photoreference=${photo.photo_reference}`;
                });

            //for each urls, assign an id, so that it create an object with an id and an url for each of the urls
            const allUrls = urls.map((url, index) => {
                return url;
            });

            console.log('allUrls :', allUrls);

            updateStep(2, { ...uploadedImages, imageSelectedUrls: allUrls });

            console.log('uploadedImages :', uploadedImages);
        }
    }, [
        placeDetails?.photos,
        uploadedImages.imageSelectedUrls.length,
        updateStep,
        uploadedImages,
        baseUrlImage,
    ]);

    return {
        reloadImages,
    };
};

export default useGetGoogleImages;
