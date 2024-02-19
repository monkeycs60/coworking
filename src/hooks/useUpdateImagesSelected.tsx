import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form';
import { useAppSelector } from './useRedux';

const useUpdateImagesSelected = () => {
    const { setValue, trigger } = useFormContext();
    const imagesSelected = useAppSelector((state) => state.placeDetails.imageSelectedUrls);
        useEffect(() => {
            setValue('imageSelectedUrls', imagesSelected);
            trigger('imageSelectedUrls');
        }, [imagesSelected, setValue, trigger]);
  return null
}

export default useUpdateImagesSelected