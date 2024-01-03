'use client';

import { MultiImageDropzoneUsage } from '../inputs/MultiImageDropzoneUsage';
import { useAppSelector } from '@/hooks/useRedux';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable';
import useGetGoogleImages from '@/hooks/useGetGoogleImages';
import SortablePhoto from '../inputs/SortablePhoto';
import useOnDragEnd from '@/hooks/useOnDragEnd';
import { useFormContext } from 'react-hook-form';
import { useEffect } from 'react';

const ImagesForm = () => {
    const imagesSelected = useAppSelector((state) => state.placeDetails.imageSelectedUrls);
    const onDragEnd = useOnDragEnd();
    useGetGoogleImages();
    const { setValue, trigger } = useFormContext();

    useEffect(() => {
        setValue('imageSelectedUrls', imagesSelected);
        trigger('imageSelectedUrls');
    }, [imagesSelected, setValue, trigger]);


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
                        {imagesSelected.map((image) => {
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
