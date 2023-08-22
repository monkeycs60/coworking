import Image from "next/image";

interface ImageComponentProps {
    imageUrls: string[];
    setPhotoSelected: React.Dispatch<React.SetStateAction<string[]>>;
    photoSelected: string[];
}

const ChooseGoogleImages: React.FC<ImageComponentProps> = ({
    imageUrls,
    setPhotoSelected,
    photoSelected,
}) => (
    <div>
        {imageUrls.map((url, index) => (
            <div key={index}>
                <Image
                    width={200}
                    height={200}
                    src={url}
                    alt={`image de l'établissement ${index}`}
                />
                <input
                    type='checkbox'
                    onChange={
                        photoSelected?.includes(url)
                            ? () =>
                                  setPhotoSelected([
                                      ...photoSelected.filter(
                                          (photo) => photo !== url,
                                      ),
                                  ])
                            : () => setPhotoSelected((prev) => [...prev, url])
                    }
                />
            </div>
        ))}
        {photoSelected?.length === 0 && (
            <p className='text-xs italic text-red-600'>
                Veuillez sélectionner au moins une photo.
            </p>
        )}
    </div>
);

export default ChooseGoogleImages;
