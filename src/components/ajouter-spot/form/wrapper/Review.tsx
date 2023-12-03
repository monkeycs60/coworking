import React from 'react';
import TextAreaField from '../inputs/TextAreaField';
import { StarRatingCalmEquipFood } from '../inputs/StarRatingCalmEquipFood';
import { FieldErrors, Control } from 'react-hook-form';
import { AddPlaceSchemaType } from '@/types/addPlace';

const Review = ({
    control,
    errors,
}: {
    control: Control<AddPlaceSchemaType, object>;
    errors: FieldErrors<AddPlaceSchemaType>;
}) => {
    return (
        <>
            <TextAreaField
                label='Ecris ton avis sur ce lieu de cowork'
                name='reviewContent'
                error={errors.reviewContent}
                isMandatory={true}
            />
            <StarRatingCalmEquipFood control={control} errors={errors} />
        </>
    );
};

export default Review;
