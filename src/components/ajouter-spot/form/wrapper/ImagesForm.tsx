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
}: {
    handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    imageUrls: string[];
    setPhotoSelected: React.Dispatch<SetStateAction<string[]>>;
    photoSelected: string[];
    photoUploaded: string[];
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
            />
        </>
    );
};

export default ImagesForm;
