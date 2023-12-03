'use client';

import ChooseGoogleImages from '../inputs/ChooseGoogleImages';
import { SetStateAction } from 'react';

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

            <div className='my-4 flex flex-col items-center justify-center gap-4'>
                <label className='font-bold' htmlFor='userImages'>
                    Télécharge tes propres photos
                </label>
                <span className='w-[75%] text-xs italic'>
                    Sélectionne toutes les photos que tu veux uploader en une
                    seule fois
                </span>
                <input
                    type='file'
                    id='userImages'
                    className='flex w-full justify-between'
                    name='userImages'
                    multiple
                    onChange={handleFileChange}
                />
            </div>
        </>
    );
};

export default ImagesForm;
