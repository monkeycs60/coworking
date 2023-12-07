'use client';

import ChooseGoogleImages from '../inputs/ChooseGoogleImages';
import { SetStateAction } from 'react';
import DownloadOwnPhotos from '../inputs/DownloadOwnPhotos';

const ImagesForm = ({
    handleFileChange,
    imageUrls,
    setPhotoSelected,
    photoSelected,
    photoUploaded,
    removePhoto,
    uploadedImageUrls,
}: {
    handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    imageUrls: string[];
    setPhotoSelected: React.Dispatch<SetStateAction<string[]>>;
    photoSelected: string[];
    photoUploaded: string[];
    removePhoto: (url: number) => void;
    uploadedImageUrls: string[];
}) => {
    return (
        <>
            <ChooseGoogleImages
                imageUrls={imageUrls}
                setPhotoSelected={setPhotoSelected}
                photoSelected={photoSelected}
            />
            <DownloadOwnPhotos
                handleFileChange={handleFileChange}
                photoUploaded={photoUploaded}
                removePhoto={removePhoto}
                uploadedImageUrls={uploadedImageUrls}
            />
        </>
    );
};

export default ImagesForm;
