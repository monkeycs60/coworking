'use client';

import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { resetAllDetails } from '@/redux/features/placeDetails-slice';
import { sendPlaceDetails } from '@/services/sendPlaceDetails';
import { AddPlaceSchemaType } from '@/types/addPlace';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

export const usePlaceSubmission = ({
    setWaitingToSubmit,
}: {
    setWaitingToSubmit: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const placeDetails = useAppSelector((state) => state.placeDetails.details);
    const imagesSelectedUrls = useAppSelector(
        (state) => state.placeDetails.imageSelectedUrls,
    );

    const onSubmit = async (data: AddPlaceSchemaType) => {
        console.log('onSubmit est déclenché avec les données :', data);

        if (
            !placeDetails?.place_id ||
            !placeDetails?.geometry?.location.lng ||
            !placeDetails?.geometry?.location.lat
        ) {
            alert('PlaceId is missing!');
            setWaitingToSubmit(false);
            return;
        }

        setWaitingToSubmit(true);
        if (!placeDetails?.place_id) {
            alert('PlaceId is missing!');
            setWaitingToSubmit(false);
            return;
        }

        // remove the id of every image selected urls and add a coverImage property to the first image
        const uploadedImageUrls = imagesSelectedUrls.map((image, index) => {
            if (index === 0) {
                return {
                    url: image.url,
                    coverImage: true,
                };
            } else {
                return {
                    url: image.url,
                    coverImage: false,
                };
            }
        });

        const finalData = {
            ...data,
            uploadedImageUrls: uploadedImageUrls,
            placeId: placeDetails.place_id,
            longitude: placeDetails.geometry?.location.lng,
            latitude: placeDetails.geometry?.location.lat,
        };

        try {
            const response = await sendPlaceDetails(finalData);

            if (response.error) {
                toast.error(
                    "Une erreur est survenue ! le coworking n'a pas pu être ajouté.",
                    {
                        position: 'top-center',
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    },
                );
            } else {
                setWaitingToSubmit(false);
                // const city = finalData.city;
                // const coworkingName = encodeURIComponent(finalData.name);
                // const coworkingId = response.data.id;
                // const coworkURL = `/explore/${city}/${coworkingName}?coworkingId=${coworkingId}`;
                dispatch(resetAllDetails());
                router.push('/');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return {
        onSubmit,
        placeDetails,
    };
};
