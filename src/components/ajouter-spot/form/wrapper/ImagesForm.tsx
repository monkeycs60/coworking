'use client';

import { MultiImageDropzoneUsage } from '../inputs/MultiImageDropzoneUsage';
import { useAppSelector } from '@/hooks/useRedux';
import { DndContext, closestCenter } from '@dnd-kit/core';
import {
    SortableContext,
    horizontalListSortingStrategy,
} from '@dnd-kit/sortable';
import useGetGoogleImages from '@/hooks/useGetGoogleImages';
import SortablePhoto from '../inputs/SortablePhoto';
import useOnDragEnd from '@/hooks/useOnDragEnd';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import { useEffect } from 'react';
import { useAddCoworkingStore } from '@/zustand/stores/coworkingStore';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    UploadedImagesSchema,
    UploadedImagesType,
} from '@/types/place/uploadedImages';

const ImagesForm = () => {
    const {
        uploadedImages,
        updateStep,
        incrementStep,
        decrementStep,
        setStep,
    } = useAddCoworkingStore();

    const imagesSelected = uploadedImages?.imageSelectedUrls ?? [];

    const onDragEnd = useOnDragEnd();
    // useGetGoogleImages();

    const methods = useForm<UploadedImagesType>({
        mode: 'all',
        resolver: zodResolver(UploadedImagesSchema),
    });

    useEffect(() => {
        // Only trigger 'setValue' and 'trigger' if imagesSelected is not empty
        if (imagesSelected.length > 0) {
            const imageObjects = imagesSelected.map((image) => ({
                url: image.url, // Conserver l'URL de chaque image
                id: image.id, // Ajouter 'id' s'il est disponible, sinon cela reste 'undefined'
                coverImage: image.coverImage, // Ajouter 'coverImage' s'il est disponible
            }));

            methods.setValue('imageSelectedUrls', imageObjects);
            // This will ensure validation is only run when imagesSelected changes
            methods.trigger('imageSelectedUrls');
        }
    }, [imagesSelected, methods.setValue, methods.trigger, onDragEnd]);

    return (
        <FormProvider {...methods}>
            <form
                className='flex flex-col gap-2'
                onSubmit={methods.handleSubmit((data) => {
                    console.log('data ça a marché images :', data);

                    try {
                        fetch('/api/placePhotos', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(data),
                        })
                            .then((response) => response.json())
                            .then((data) => {
                                console.log('Success:', data);

                                updateStep(2, data as UploadedImagesType);

                                setStep(4);
                            })
                            .catch((error) => {
                                console.error('Error:', error);
                            });
                    } catch (error) {
                        console.error('Error:', error);
                    }
                })}
            >
                <MultiImageDropzoneUsage />
                <DndContext
                    collisionDetection={closestCenter}
                    onDragEnd={onDragEnd}
                >
                    <div className='m-auto flex flex-wrap gap-2 bg-red-200'>
                        <SortableContext
                            items={imagesSelected.map((item) => item.url)}
                            strategy={horizontalListSortingStrategy}
                        >
                            {/* // itérer sur images selected pour afficher des images */}
                            {imagesSelected.map((image) => {
                                return (
                                    image.id && (
                                        <SortablePhoto
                                            key={image.id}
                                            imageUrl={image.url}
                                            id={image.id}
                                        />
                                    )
                                );
                            })}
                        </SortableContext>
                    </div>
                </DndContext>
                <button
                    className='bg-red-100 p-3 border-2'
                    disabled={
                        methods.formState.isSubmitting ||
                        imagesSelected.length === 0
                    }
                >
                    Envoyer les images
                </button>
            </form>
            {methods.formState.errors.imageSelectedUrls && (
                <p>{methods.formState.errors.imageSelectedUrls.message}</p>
            )}
            <button
                onClick={() => {
                    updateStep(2, { imageSelectedUrls: [] });
                    setStep(3);
                }}
            >
                Je ne dispose d'aucune image
            </button>
        </FormProvider>
    );
};

export default ImagesForm;
