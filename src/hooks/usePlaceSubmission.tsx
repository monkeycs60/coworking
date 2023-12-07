'use client';

import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { resetAllDetails } from '@/redux/features/placeDetails-slice';
import { sendPlaceDetails } from '@/services/sendPlaceDetails';
import { AddPlaceSchemaType } from '@/types/addPlace';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import usePhotoUpload from './usePhotoUpload';

export const usePlaceSubmission = ({
    setWaitingToSubmit,
}: {
    setWaitingToSubmit: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const placeDetails = useAppSelector((state) => state.placeDetails.details);
    const imageUrls = useAppSelector((state) => state.placeDetails.imageUrls);

    const {
        handleFileChange,
        setPhotoSelected,
        photoSelected,
        photoUploaded,
        uploadedImageUrls,
    } = usePhotoUpload({ setWaitingToSubmit });

    const onSubmit = async (data: AddPlaceSchemaType) => {
        console.log('onSubmit est déclenché avec les données :', data);

        setWaitingToSubmit(true);
        if (!placeDetails?.place_id) {
            alert('PlaceId is missing!');
            setWaitingToSubmit(false);
            return;
        }

        const finalData = {
            ...data,
            placeId: placeDetails.place_id,
            longitude: placeDetails.geometry?.location.lng,
            latitude: placeDetails.geometry?.location.lat,
            imagesSelected: photoSelected,
            userImages: uploadedImageUrls,
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
                const city = finalData.city;
                const coworkingName = encodeURIComponent(finalData.name);
                const coworkingId = response.data.id;
                const coworkURL = `/explore/${city}/${coworkingName}?coworkingId=${coworkingId}`;
                dispatch(resetAllDetails());
                router.push(coworkURL);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return {
        onSubmit,
        handleFileChange,
        setPhotoSelected,
        photoSelected,
        photoUploaded,
        imageUrls,
        placeDetails,
    };
};
