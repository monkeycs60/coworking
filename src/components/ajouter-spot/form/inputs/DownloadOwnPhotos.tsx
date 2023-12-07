'use client';

import Image from 'next/image';

const DownloadOwnPhotos = ({
    handleFileChange,
    photoUploaded,
}: {
    handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    photoUploaded: string[];
}) => {
    return (
        <div className='my-4 flex flex-col items-center justify-center gap-4'>
            <label className='font-bold' htmlFor='userImages'>
                Télécharge tes propres photos
            </label>
            <span className='w-[75%] text-xs italic'>
                Sélectionne toutes les photos que tu veux uploader en une seule
                fois
            </span>
            <div className='my-10 flex flex-col items-center justify-center gap-4 lg:flex-row lg:flex-wrap'>
                {photoUploaded.map((url, index) => (
                    <div
                        key={index}
                        className='relative h-[200px] w-[280px] object-cover'
                    >
                        <Image src={url} fill alt='Preview' />
                    </div>
                ))}
            </div>
            <input
                type='file'
                id='userImages'
                className='flex w-full justify-between'
                name='userImages'
                multiple
                onChange={handleFileChange}
            />
        </div>
    );
};

export default DownloadOwnPhotos;
