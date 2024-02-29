import { useAppSelector } from '@/hooks/useRedux';
import { useAppDispatch } from '@/hooks/useRedux';
import { moveImageSelectedUrls } from '@/redux/features/placeDetails-slice';
import { useAddCoworkingStore } from '@/zustand/stores/coworkingStore';
import { useCallback } from 'react';

const useOnDragEnd = () => {
    const { uploadedImages, updateStep, moveImageSelectedUrls } =
        useAddCoworkingStore();
    const imagesSelected = uploadedImages?.imageSelectedUrls;

    return useCallback(
        (event: any) => {
            const { active, over } = event;

            if (active.id !== over.id) {
                const oldIndex = imagesSelected.findIndex(
                    (item) => item.id === active.id,
                );
                const newIndex = imagesSelected.findIndex(
                    (item) => item.id === over.id,
                );

                if (oldIndex !== -1 && newIndex !== -1) {
                    moveImageSelectedUrls(oldIndex, newIndex);
                }
            }
        },
        [imagesSelected, updateStep, uploadedImages],
    );
};

export default useOnDragEnd;
