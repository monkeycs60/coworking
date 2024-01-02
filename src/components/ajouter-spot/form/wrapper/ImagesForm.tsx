'use client';

import { SetStateAction } from 'react';
import { MultiImageDropzoneUsage } from '../inputs/MultiImageDropzoneUsage';
import { useAppSelector } from '@/hooks/useRedux';
import { useAppDispatch } from '@/hooks/useRedux';
import { removeImageSelectedUrls, setImageSelectedUrls, moveImageSelectedUrls } from '@/redux/features/placeDetails-slice';
import { DndContext, closestCenter, UniqueIdentifier } from '@dnd-kit/core';
import { SortableContext, arrayMove, horizontalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import SortablePhoto from '../inputs/SortablePhoto';




const ImagesForm = () => {
    const imagesSelected = useAppSelector((state) => state.placeDetails.imageSelectedUrls);
    const imagesSelectedCopy = [...imagesSelected];
    const dispatch = useAppDispatch();
    console.log('placeDetails dans ImagesForm :', imagesSelected);

    function onDragEnd(event: any) {
        const { active, over } = event;

        if (active.id !== over.id) {
            const oldIndex = imagesSelected.findIndex(item => item.id === active.id);
            const newIndex = imagesSelected.findIndex(item => item.id === over.id);

            if (oldIndex !== -1 && newIndex !== -1) {
                dispatch(moveImageSelectedUrls({ from: oldIndex, to: newIndex }));
            }
        }
    }

    return (
        <>
            <MultiImageDropzoneUsage />
            <DndContext
                collisionDetection={closestCenter}
                onDragEnd={onDragEnd}
            >
                <div className='m-auto flex flex-wrap gap-2 bg-red-200'>
                    <SortableContext items={imagesSelected.map(item => item.id)}
                        strategy={
                            horizontalListSortingStrategy
                        }>
                        {/* // itérer sur images selected pour afficher des images */}
                        {imagesSelected.map((image, index) => {
                            return (
                                <SortablePhoto
                                    key={image.id}
                                    imageUrl={image.url}
                                    id={image.id}
                                />
                            )
                        }
                        )}

                    </SortableContext>
                </div>
            </DndContext>
        </>
    );
};

export default ImagesForm;
