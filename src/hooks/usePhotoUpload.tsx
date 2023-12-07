import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import {
    setImageUrls,
    resetImageUrls,
} from '@/redux/features/placeDetails-slice';

const usePhotoUpload = ({
    setWaitingToSubmit,
}: {
    setWaitingToSubmit: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    const dispatch = useAppDispatch();
    const placeDetails = useAppSelector((state) => state.placeDetails.details);
    const baseUrlImage = `https://maps.googleapis.com/maps/api/place/photo?key=${googleMapsApiKey}&`;

    const [photoSelected, setPhotoSelected] = useState<string[]>([]);
    const [photoUploaded, setPhotoUploaded] = useState<string[]>([]);
    const [uploadedImageUrls, setUploadedImageUrls] = useState<string[]>([]);

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

        if (event.target.files) {
            const newFiles = Array.from(event.target.files);
            const newPreviewUrls = newFiles.map((file) =>
                URL.createObjectURL(file),
            );

            setPhotoUploaded((prev) => [...prev, ...newPreviewUrls]);

            const formData = new FormData();
            newFiles.forEach((file) => formData.append('file', file));

            try {
                const response = await fetch('/api/uploaded', {
                    method: 'POST',
                    body: formData,
                });
                const data = await response.json();

                if (data.success) {
                    setUploadedImageUrls((prev) => [...prev, ...data.urls]);
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

    const removePhoto = (index: number) => {
        setPhotoUploaded((prev) => prev.filter((_, i) => i !== index));
        setUploadedImageUrls((prev) => prev.filter((_, i) => i !== index));
    };
    return {
        handleFileChange,
        uploadedImageUrls,
        photoUploaded,
        photoSelected,
        setPhotoSelected,
        removePhoto,
    };
};

export default usePhotoUpload;
