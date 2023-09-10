import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import {
    setImageUrls,
    resetImageUrls,
    resetAllDetails,
} from '@/redux/features/placeDetails-slice';
import { sendPlaceDetails } from '@/services/sendPlaceDetails';
import { AddPlaceSchemaType } from '@/types/addPlace';
import { toast } from 'react-toastify';

export const useAddPlaceForm = () => {
    const dispatch = useAppDispatch();
    const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    const baseUrlImage = `https://maps.googleapis.com/maps/api/place/photo?key=${googleMapsApiKey}&`;
    const placeDetails = useAppSelector((state) => state.placeDetails.details);
    const imageUrls = useAppSelector((state) => state.placeDetails.imageUrls);

    const [photoSelected, setPhotoSelected] = useState<string[]>([]);
    const [uploadedImageUrls, setUploadedImageUrls] = useState<string[]>([]);
    const [waitingToSubmit, setWaitingToSubmit] = useState(false);

    useEffect(() => {
        if (placeDetails?.photos) {
            dispatch(resetImageUrls());

            const urls = placeDetails.photos
                .slice(0, Math.ceil(placeDetails.photos.length / 2))
                .map((photo) => {
                    return `${baseUrlImage}maxwidth=400&photoreference=${photo.photo_reference}`;
                });

            dispatch(setImageUrls(urls));
        }
    }, [placeDetails, dispatch, baseUrlImage]);

    const handleFileChange = async (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setWaitingToSubmit(true);
        const formData = new FormData();

        if (event.target.files) {
            for (let i = 0; i < event.target.files.length; i++) {
                formData.append('file', event.target.files[i]);
            }

            try {
                const response = await fetch('/api/uploaded', {
                    method: 'POST',
                    body: formData,
                });
                const data = await response.json();

                if (data.success) {
                    setUploadedImageUrls(data);
                } else {
                    console.error(data.error);
                }
            } catch (error) {
                console.error('Error uploading the file:', error);
            } finally {
                setWaitingToSubmit(false);
            }
        }
    };

    const onSubmit = async (data: AddPlaceSchemaType) => {
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
                toast.success('Merci à vous ! un nouveau cowork a été ajouté', {
                    position: 'top-center',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                setTimeout(() => {
                    dispatch(resetAllDetails());
                }, 4000);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setWaitingToSubmit(false);
        }
    };

    return {
        handleFileChange,
        onSubmit,
        setPhotoSelected,
        waitingToSubmit,
        imageUrls,
        photoSelected,
        uploadedImageUrls,
        placeDetails,
    };
};
