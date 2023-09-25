'use client';

import { useState } from 'react';
import { ModalWindow } from 'react-ts-modal-cserizay';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ReviewSchema, CreateReviewType } from '@/types/createReview';
import { StarRatingCalmEquipFood } from '@/components/ajouter-spot/form/StarRatingCalmEquipFood';
import '../../../../../styles/modalReview.css';
import { useRouter } from 'next/navigation';
import { Loader2, Rocket, PartyPopper } from 'lucide-react';

const CreateReview = ({
    placeId,
    coworkingId,
}: {
    placeId: string;
    coworkingId: string;
}) => {
    const router = useRouter();

    const [waitingToSubmit, setWaitingToSubmit] = useState(false);
    const [success, setSuccess] = useState(false);

    // Modal handler
    const [isOpen, setIsOpen] = useState(false);

    // Create a function to open the modal
    const handleOpen = () => {
        setIsOpen(true);
    };

    // Create a function to close the modal
    const handleClose = () => {
        setIsOpen(false);
        if (success) router.refresh();
    };

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<CreateReviewType>({
        resolver: zodResolver(ReviewSchema),
    });

    const onSubmit = async (data: CreateReviewType) => {
        setWaitingToSubmit(true);

        try {
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
                throw new Error(result.error); // Lever une exception pour gérer l'erreur dans le bloc catch.
            } else {
                console.log('Review submitted successfully!');
                setSuccess(true);
            }
        } catch (error: unknown) {
            // some code that handles the error
            if (error instanceof Error) {
                console.error(
                    'An error occurred while submitting the review:',
                    error.message,
                );
            } else {
                console.error('An unknown error occurred:', error);
            }
        } finally {
            setWaitingToSubmit(false); // Ceci s'exécutera toujours, indépendamment du succès ou de l'échec.
        }
    };

    return (
        <div>
            <Button onClick={handleOpen}>Donne ton avis</Button>

            <ModalWindow isOpen={isOpen} onClose={handleClose}>
                <div className='flex w-full flex-col items-center justify-center gap-4 bg-white p-8'>
                    {success ? (
                        <div className='flex flex-col gap-3'>
                            <div className='flex justify-center gap-2'>
                                <PartyPopper />
                                <PartyPopper />
                                <PartyPopper />
                            </div>
                            <h2 className='text-center'>
                                Merci d'avoir donné ton avis !
                            </h2>
                            <div className='flex gap-4'>
                                <Rocket />
                                <p>N'hésite pas à en donner d'autres </p>
                                <Rocket />
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className='flex flex-col items-center justify-center'>
                                <h2>Partage ton expérience !</h2>
                                <p className='text-sm'>
                                    Donne-nous des informations sur ta dernière
                                    visite.
                                </p>
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
                                    className='my-4 h-[100px] w-full border-[1px] p-2'
                                    {...register('content')}
                                />
                                {errors.content && <p>salut la famille</p>}

                                <div className='flex flex-col gap-3'>
                                    <span className='text-xs italic text-black/50'>
                                        Aide-nous à affiner à l'aide de quelques
                                        notes
                                    </span>
                                    <div>
                                        <StarRatingCalmEquipFood
                                            control={control}
                                            errors={errors}
                                        />
                                        {errors.content && (
                                            <p>{errors.content.message}</p>
                                        )}
                                        {errors.root && (
                                            <p>{errors.root.message}</p>
                                        )}
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
                                            <p>
                                                {errors.feelingRating.message}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <Button
                                    type='submit'
                                    disabled={waitingToSubmit}
                                >
                                    {waitingToSubmit ? (
                                        <Loader2 className='animate-spin' />
                                    ) : (
                                        <span>Envoyer</span>
                                    )}{' '}
                                </Button>
                            </form>
                        </>
                    )}
                </div>
            </ModalWindow>
        </div>
    );
};

export default CreateReview;
