'use client';

import ChooseGoogleImages from '../inputs/ChooseGoogleImages';
import { SetStateAction } from 'react';
import DownloadOwnPhotos from '../inputs/DownloadOwnPhotos';

const ImagesForm = ({
    handleFileChange,
    imageUrls,
    setPhotoSelected,
    photoSelected,
}: {
    handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    imageUrls: string[];
    setPhotoSelected: React.Dispatch<SetStateAction<string[]>>;
    photoSelected: string[];
}) => {
    return (
        <>
            <ChooseGoogleImages
                imageUrls={imageUrls}
                setPhotoSelected={setPhotoSelected}
                photoSelected={photoSelected}
            />
            <DownloadOwnPhotos handleFileChange={handleFileChange} />
        </>
    );
};

export default ImagesForm;
