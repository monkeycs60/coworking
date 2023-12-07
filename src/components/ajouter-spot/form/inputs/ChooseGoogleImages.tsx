'use client';

import Image from 'next/image';
import { AlertTriangle } from 'lucide-react';

interface ImageComponentProps {
    imageUrls: string[];
    setPhotoSelected: React.Dispatch<React.SetStateAction<string[]>>;
    photoSelected: string[];
}

const imageSelectedBorder = 'border-[5px] border-primary';

const ChooseGoogleImages = ({
    imageUrls,
    setPhotoSelected,
    photoSelected,
}: ImageComponentProps) => {
    return (
        <div className='mt-6 flex flex-col gap-3'>
            <h3 className='font-bold'>Ajouter des photos</h3>
            <p className='text-xs'>
                Photos récupérées sur Google Images.
                <span className='block'>
                    Ne sélectionne que les plus pertinentes.
                </span>
            </p>
            <div className='flex h-[30px] justify-center'>
                {photoSelected?.length === 0 ? (
                    <p className='flex items-center gap-4 text-sm italic text-red-600'>
                        <span>
                            <AlertTriangle />
                        </span>
                        Sélectionne au moins une photo.
                    </p>
                ) : (
                    <p className='flex items-center gap-4 text-sm italic text-green-600'>
                        <span>✔</span>
                        {photoSelected.length} photo(s) sélectionnée(s)
                    </p>
                )}
            </div>
            <div className='flex flex-col items-center justify-center gap-4  lg:flex-row lg:flex-wrap'>
                {imageUrls.map((url, index) => (
                    <div key={index}>
                        <Image
                            width={200}
                            height={200}
                            src={url}
                            alt={`image de l'établissement ${index}`}
                            className={`h-[220px] w-[320px] object-cover ${
                                photoSelected?.includes(url) &&
                                imageSelectedBorder
                            }`}
                            onClick={
                                photoSelected?.includes(url)
                                    ? () =>
                                          setPhotoSelected([
                                              ...photoSelected.filter(
                                                  (photo) => photo !== url,
                                              ),
                                          ])
                                    : () =>
                                          setPhotoSelected((prev) => [
                                              ...prev,
                                              url,
                                          ])
                            }
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ChooseGoogleImages;
