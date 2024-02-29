'use client';

import React from 'react';
import TextAreaField from '../inputs/TextAreaField';
import { StarRatingCalmEquipFood } from '../inputs/StarRatingCalmEquipFood';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider } from 'react-hook-form';
import { ReviewSchema, ReviewType } from '@/types/place/review';
import { useAddCoworkingStore } from '@/zustand/stores/coworkingStore';

const Review = () => {
    const { updateStep, incrementStep } = useAddCoworkingStore();
    const methods = useForm<ReviewType>({
        resolver: zodResolver(ReviewSchema),
    });
    const onSubmit = methods.handleSubmit((data) => {
        console.log(data);
        try {
            fetch('/api/placeReview', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log('Success:', data);
                    updateStep(4, data);
                    incrementStep();
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        } catch (error) {
            console.error('Error:', error);
        }
    });
    return (
        <FormProvider {...methods}>
            <form className='flex flex-col gap-4' onSubmit={onSubmit}>
                <TextAreaField
                    label='Ecris ton avis sur ce lieu de cowork'
                    name='reviewContent'
                    isMandatory={true}
                    defaultValue=''
                />
                <StarRatingCalmEquipFood />
                <button>Envoyer</button>
            </form>
        </FormProvider>
    );
};

export default Review;
