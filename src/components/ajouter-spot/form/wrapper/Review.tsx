import React from 'react';
import TextAreaField from '../inputs/TextAreaField';
import { StarRatingCalmEquipFood } from '../inputs/StarRatingCalmEquipFood';

const Review = ({
    errors,
}: {
    errors: any;
}) => {
    return (
        <>
            <TextAreaField
                label='Ecris ton avis sur ce lieu de cowork'
                name='reviewContent'
                error={errors.reviewContent}
                isMandatory={true}
            />
            <StarRatingCalmEquipFood errors={errors} />
        </>
    );
};

export default Review;
