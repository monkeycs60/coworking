'use client';

import { MultiImageDropzoneUsage } from '../inputs/MultiImageDropzoneUsage';
import { motion, Reorder } from 'framer-motion';
import { FormProvider, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useAddCoworkingStore } from '@/zustand/stores/coworkingStore';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    UploadedImagesSchema,
    UploadedImagesType,
} from '@/types/place/uploadedImages';
import Image from 'next/image';
import { DevTool } from '@hookform/devtools';

const ImagesForm = () => {
    const { uploadedImages, updateStep, setStep } = useAddCoworkingStore();

    const [initialImageUrls, setInitialImageUrls] = useState<
        UploadedImagesType['imageSelectedUrls']
    >([]);

    useEffect(() => {
        if (uploadedImages && uploadedImages.imageSelectedUrls.length > 0) {
            const imageUrls = uploadedImages.imageSelectedUrls.map(
                (image) => image,
            );
            setInitialImageUrls(imageUrls);
        }
    }, [uploadedImages]);

    const onReorder = (reorderedItems: string[]) => {
        setInitialImageUrls(reorderedItems);
        methods.setValue('imageSelectedUrls', reorderedItems);
        methods.trigger('imageSelectedUrls');
    };

    const handleRemoveImage = (indexToRemove: number) => {
        const updatedImages = initialImageUrls.filter(
            (_, index) => index !== indexToRemove,
        );

        setInitialImageUrls(updatedImages);

        methods.setValue('imageSelectedUrls', updatedImages);
        methods.trigger('imageSelectedUrls');
    };

    const methods = useForm<UploadedImagesType>({
        mode: 'all',
        resolver: zodResolver(UploadedImagesSchema),
    });

    return (
        <div>
            <MultiImageDropzoneUsage />
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
                    <Reorder.Group
                        axis='x'
                        values={initialImageUrls}
                        onReorder={onReorder}
                        className='m-auto flex w-[1000px] gap-2 rounded-md bg-slate-300 p-2'
                    >
                        {initialImageUrls.map((item, index) => (
                            <Reorder.Item key={item} value={item}>
                                <div className='relative flex cursor-grab'>
                                    <motion.img
                                        src={item}
                                        alt='Selected'
                                        className='pointer-events-none h-32  w-32 object-cover'
                                        onDragStart={(e) => e.preventDefault()}
                                    />
                                    <span
                                        className='absolute right-0 top-0 cursor-pointer rounded-full bg-red-400 p-1 text-white'
                                        onClick={() => handleRemoveImage(index)}
                                    >
                                        x
                                    </span>
                                </div>
                            </Reorder.Item>
                        ))}
                    </Reorder.Group>
                    <button
                        className='border-2 bg-red-100 p-3'
                        disabled={
                            methods.formState.isSubmitting ||
                            initialImageUrls.length === 0
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
                <DevTool control={methods.control} />
            </FormProvider>
        </div>
    );
};

export default ImagesForm;
