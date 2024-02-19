import { useAppSelector } from '@/hooks/useRedux';
import { useAppDispatch } from '@/hooks/useRedux';
import { moveImageSelectedUrls } from '@/redux/features/placeDetails-slice';
import { useCallback } from 'react';

const useOnDragEnd = () => {
    const imagesSelected = useAppSelector((state) => state.placeDetails.imageSelectedUrls);
    const dispatch = useAppDispatch();

    return useCallback((event: any) => {
        const { active, over } = event;

        if (active.id !== over.id) {
            const oldIndex = imagesSelected.findIndex(item => item.id === active.id);
            const newIndex = imagesSelected.findIndex(item => item.id === over.id);

            if (oldIndex !== -1 && newIndex !== -1) {
                dispatch(moveImageSelectedUrls({ from: oldIndex, to: newIndex }));
            }
        }
    }, [imagesSelected, dispatch]);
};

export default useOnDragEnd;