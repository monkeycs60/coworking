import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { useAppSelector } from './useRedux';
import { useAddCoworkingStore } from '@/zustand/stores/coworkingStore';

const useUpdateImagesSelected = () => {
    const { setValue, trigger } = useFormContext();
    const { stepThree } = useAddCoworkingStore();
    const imagesSelected = stepThree.imageSelectedUrls;
    useEffect(() => {
        setValue('imageSelectedUrls', imagesSelected);
        trigger('imageSelectedUrls');
    }, [imagesSelected, setValue, trigger]);
    return null;
};

export default useUpdateImagesSelected;
