'use client';

import Image from 'next/image';

const DownloadOwnPhotos = ({
    handleFileChange,
    photoUploaded,
    removePhoto,
    uploadedImageUrls,
}: {
    handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    photoUploaded: string[];
    removePhoto: (url: number) => void;
    uploadedImageUrls: string[];
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
                {uploadedImageUrls.map((url, index) => (
                    <div
                        key={index}
                        className='relative h-[200px] w-[280px] object-cover'
                    >
                        <Image src={url} fill alt='Preview' />
                        <button
                            type='button'
                            className='absolute right-0 top-0'
                            onClick={() => removePhoto(index)}
                        >
                            <span className='sr-only'>Supprimer</span>
                        </button>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='h-6 w-6 text-red-500'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth={2}
                                d='M6 18L18 6M6 6l12 12'
                            />
                        </svg>
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
