'use client';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ReviewSchema, CreateReviewType } from '@/types/createReview';
import { StarRatingCalmEquipFood } from '@/components/ajouter-spot/form/StarRatingCalmEquipFood';

const CreateReview = ({
    placeId,
    coworkingId,
}: {
    placeId: string;
    coworkingId: string;
}) => {
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
            equipRating: data.equipmentRating,
            // Remove the original equipmentRating field
            equipmentRating: undefined,
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
        console.log(errors.equipmentRating);
        console.log(errors.foodRating);
        console.log(errors.feelingRating);
        console.log(errors.content);
        console.log(errors.root);
        console.log('placeId');
    }

    return (
        <Dialog>
            <DialogTrigger>Créer une review</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Soumettez votre avis</DialogTitle>
                    <DialogDescription>
                        Partagez votre expérience avec la communauté.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input
                        type='hidden'
                        {...register('coworkingId')}
                        value={coworkingId}
                    />
                    <p>{placeId}</p>

                    <textarea
                        placeholder='Your review content'
                        {...register('content')}
                    />
                    {errors.content && <p>salut la famille</p>}

                    <StarRatingCalmEquipFood
                        control={control}
                        errors={errors}
                    />
                    {errors.content && <p>{errors.content.message}</p>}
                    {errors.root && <p>{errors.root.message}</p>}
                    {errors.calmRating && <p>{errors.calmRating.message}</p>}
                    {errors.equipmentRating && (
                        <p>{errors.equipmentRating.message}</p>
                    )}
                    {errors.foodRating && <p>{errors.foodRating.message}</p>}
                    {errors.feelingRating && (
                        <p>{errors.feelingRating.message}</p>
                    )}
                    {/* ... add other input fields similarly ... */}
                    <button
                        type='submit'
                        onClick={() => console.log('Button Clicked!')}
                    >
                        Soumettre
                    </button>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CreateReview;
