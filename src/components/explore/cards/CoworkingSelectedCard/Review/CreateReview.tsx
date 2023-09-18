'use client';

import { useState } from 'react';
import { ModalWindow } from 'react-ts-modal-cserizay';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ReviewSchema, CreateReviewType } from '@/types/createReview';
import { StarRatingCalmEquipFood } from '@/components/ajouter-spot/form/StarRatingCalmEquipFood';
import '../../../../../styles/modalReview.css';

const CreateReview = ({
    placeId,
    coworkingId,
}: {
    placeId: string;
    coworkingId: string;
}) => {
    // Modal handler
    const [isOpen, setIsOpen] = useState(false);

    // Create a function to open the modal
    const handleOpen = () => {
        setIsOpen(true);
    };

    // Create a function to close the modal
    const handleClose = () => {
        setIsOpen(false);
    };

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<CreateReviewType>({
        resolver: zodResolver(ReviewSchema),
    });

    console.log(coworkingId);

    const onSubmit = async (data: CreateReviewType) => {
        console.log('Form data:', data);

        const formattedData = {
            ...data,
        };
        const response = await fetch('/api/createReview', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...formattedData, placeId: placeId }),
        });

        const result = await response.json();
        if (result.error) {
            console.error(result.error);
        } else {
            console.log('Review submitted successfully!');
            // Handle success, e.g., close the modal or show a success message.
        }
    };
    {
        console.log(errors.calmRating);
        console.log(errors.equipRating);
        console.log(errors.foodRating);
        console.log(errors.feelingRating);
        console.log(errors.content);
        console.log(errors.root);
        console.log('placeId');
    }

    return (
        <div>
            <Button onClick={handleOpen}>Donne ton avis</Button>

            <ModalWindow isOpen={isOpen} onClose={handleClose}>
                <div className='flex flex-col gap-4 bg-white p-8'>
                    <div>
                        <h2>Soumettez votre avis</h2>
                        <p>Partagez votre expérience avec la communauté.</p>
                    </div>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className='flex flex-col gap-8'
                    >
                        <input
                            type='hidden'
                            {...register('coworkingId')}
                            value={coworkingId}
                        />

                        <textarea
                            placeholder='Donne ton impression sur ce cowork'
                            className='my-4 h-[100px] w-full border-[1px] placeholder:p-2'
                            {...register('content')}
                        />
                        {errors.content && <p>salut la famille</p>}

                        <div className='flex flex-col gap-3'>
                            <span className='text-xs italic text-black/50'>
                                Aide-nous à affiner à l aide de quelques notes
                            </span>
                            <div>
                                <StarRatingCalmEquipFood
                                    control={control}
                                    errors={errors}
                                />
                                {errors.content && (
                                    <p>{errors.content.message}</p>
                                )}
                                {errors.root && <p>{errors.root.message}</p>}
                                {errors.calmRating && (
                                    <p>{errors.calmRating.message}</p>
                                )}
                                {errors.equipRating && (
                                    <p>{errors.equipRating.message}</p>
                                )}
                                {errors.foodRating && (
                                    <p>{errors.foodRating.message}</p>
                                )}
                                {errors.feelingRating && (
                                    <p>{errors.feelingRating.message}</p>
                                )}
                            </div>
                        </div>
                        <Button type='submit'>Soumettre</Button>
                    </form>
                </div>
            </ModalWindow>
        </div>
    );
};

export default CreateReview;
